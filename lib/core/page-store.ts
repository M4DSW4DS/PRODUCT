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

/** Ленивый singleton-клиент (переживает HMR в dev). Бросает без DATABASE_URL. */
function getSql(): SqlClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL не задан: подключи PostgreSQL (ONREZA → Project → Environment Variables)"
    );
  }
  if (!globalThis.__designLabPg) {
    globalThis.__designLabPg = postgres(url, { max: 5 });
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
