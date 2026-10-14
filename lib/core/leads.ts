/**
 * Хранилище лидов (заявок).
 * Пишет в Vercel KV / Upstash через REST API по переменным
 * KV_REST_API_URL + KV_REST_API_TOKEN (пакет @vercel/kv устарел).
 * Без переменных окружения используется резервное хранилище в памяти
 * процесса — только для разработки, в проде заявки потеряются при рестарте.
 */

export type Lead = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type SaveLeadInput = {
  name: string;
  email: string;
  message?: string;
};

/** Ключ списка лидов в KV. */
const LEADS_KEY = "design-lab:leads";

/** Резервное хранилище в памяти (dev fallback). */
const memoryLeads: Lead[] = [];

/** Минимальная проверка email. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Выполняет команду Upstash-совместимого REST API.
 * Возвращает result или null, если KV не настроен.
 * Бросает исключение при HTTP-ошибке.
 */
async function kvCommand(
  command: string,
  ...args: (string | number)[]
): Promise<unknown> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command, ...args]),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`KV REST error: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { result?: unknown };
  return data.result ?? null;
}

/**
 * Сохраняет заявку: сначала пытается записать в KV (RPUSH в список),
 * при отсутствии настройки или ошибке — в память процесса.
 */
export async function saveLead(input: SaveLeadInput): Promise<Lead> {
  const lead: Lead = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    message: (input.message ?? "").trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    const stored = await kvCommand("RPUSH", LEADS_KEY, JSON.stringify(lead));
    if (stored !== null) return lead; // записано в KV
    console.warn("[leads] KV не настроен, заявка сохранена в память процесса");
  } catch (err) {
    console.error("[leads] ошибка записи в KV, фолбэк в память:", err);
  }

  memoryLeads.push(lead);
  if (memoryLeads.length > 500) memoryLeads.shift();
  return lead;
}
