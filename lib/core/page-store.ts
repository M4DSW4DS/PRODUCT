import type { Data } from "@puckeditor/core";
import pageFallback from "@/content/page.json";
import postgres from "postgres";

/** Ключ (id строки) опубликованной страницы в PostgreSQL. */
const PAGE_KEY = "main";

/**
 * Хранилище опубликованной страницы: PostgreSQL (ONREZA Managed PostgreSQL).
 * Драйвер — postgres.js (чистый JS, без нативных зависимостей).
 * Строка подключения — DATABASE_URL; если managed PG требует SSL,
 * он включается через `?sslmode=require` в самой строке.
 */
type SqlClient = ReturnType<typeof postgres>;

declare global {
  // eslint-disable-next-line no-var
  var __designLabPg: SqlClient | undefined;
  // eslint-disable-next-line no-var
  var __designLabPgSchemaReady: boolean | undefined;
}

/**
 * Нормализует DATABASE_URL: кодирует «сырой» пароль через encodeURIComponent.
 * Спецсимволы в пароле (`#`, `/`, `?`, пробел, `%` и т.п.) ломают парсер URL
 * внутри postgres.js → ошибка «Invalid URL». Разбираем строку вручную (не через
 * new URL — битая строка как раз через него и не проходит). Уже percent-encoded
 * пароль раскодируется и кодируется заново — двойного кодирования нет.
 * postgres.js после парсинга делает decodeURIComponent(password), т.е.
 * аутентификация получает исходный пароль.
 */
function encodeDatabasePassword(raw: string): string {
  const schemeEnd = raw.indexOf("://");
  if (schemeEnd === -1) return raw;
  const scheme = raw.slice(0, schemeEnd + 3);
  const rest = raw.slice(schemeEnd + 3);

  const firstAt = rest.indexOf("@");
  if (firstAt === -1) return raw; // нет userinfo — пароля нет

  // Конец authority — первый «/?#» после первого «@». Разделители ДО первого «@»
  // могут быть частью сырого пароля и не должны резать строку.
  const delim = rest.slice(firstAt + 1).search(/[/?#]/);
  const tailStart = delim === -1 ? rest.length : firstAt + 1 + delim;

  const authority = rest.slice(0, tailStart);
  const tail = rest.slice(tailStart);
  const sep = authority.lastIndexOf("@"); // «@» в пароле допустим — хост его не содержит
  const userInfo = authority.slice(0, sep);
  const host = authority.slice(sep + 1);

  const colon = userInfo.indexOf(":");
  if (colon === -1) return raw; // только пользователь, без пароля
  const user = userInfo.slice(0, colon);
  const password = userInfo.slice(colon + 1);
  if (!password) return raw;

  let plain: string;
  try {
    plain = decodeURIComponent(password);
  } catch {
    plain = password; // «сырой» % без валидной escape-последовательности
  }
  return `${scheme}${user}:${encodeURIComponent(plain)}@${host}${tail}`;
}

/** Ленивый singleton-клиент (переживает HMR в dev). Бросает без DATABASE_URL. */
function getSql(): SqlClient {
  // TODO(debug): временный лог для отладки подключения — удалить после проверки.
  console.log(
    "DATABASE_URL prefix:",
    process.env.DATABASE_URL?.substring(0, 30)
  );
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL не задан: подключи PostgreSQL (ONREZA → Project → Environment Variables)"
    );
  }
  if (!globalThis.__designLabPg) {
    globalThis.__designLabPg = postgres(encodeDatabasePassword(url), {
      max: 5,
    });
  }
  return globalThis.__designLabPg;
}

/** Создаёт таблицу один раз на процесс (CREATE TABLE IF_NOT EXISTS идемпотентен). */
async function ensureSchema(sql: SqlClient): Promise<void> {
  if (globalThis.__designLabPgSchemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS page_content (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  // Совместимость: прошлая версия хранила JSON в колонке `content` —
  // переименовываем её в `data`, если таблица уже создана со старой схемой.
  const cols = await sql<{ column_name: string }[]>`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'page_content' AND column_name IN ('content', 'data')
  `;
  const names = cols.map((c) => c.column_name);
  if (names.includes("content") && !names.includes("data")) {
    await sql`ALTER TABLE page_content RENAME COLUMN content TO data`;
  }
  globalThis.__designLabPgSchemaReady = true;
}

/**
 * Читает опубликованные данные страницы из PostgreSQL.
 * Fallback — content/page.json (DATABASE_URL не задан, БД недоступна
 * или ещё ничего не публиковали).
 */
export async function getPageData(): Promise<Data> {
  try {
    const sql = getSql();
    await ensureSchema(sql);
    const rows = await sql<{ data: Data }[]>`
      SELECT data FROM page_content WHERE id = ${PAGE_KEY}
    `;
    if (rows.length > 0 && rows[0].data) {
      return rows[0].data;
    }
  } catch (err) {
    console.error(
      "[page-store] чтение из PostgreSQL не удалось, берём page.json:",
      err
    );
  }
  return pageFallback as unknown as Data;
}

/**
 * Публикует данные страницы в PostgreSQL (UPSERT по ключу PAGE_KEY).
 * Бросает исключение, если DATABASE_URL не задан или БД недоступна.
 */
export async function savePageData(data: Data): Promise<void> {
  const sql = getSql();
  await ensureSchema(sql);
  await sql`
    INSERT INTO page_content (id, data)
    VALUES (${PAGE_KEY}, ${JSON.stringify(data)}::jsonb)
    ON CONFLICT (id)
    DO UPDATE SET data = EXCLUDED.data, updated_at = now()
  `;
}
