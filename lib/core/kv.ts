/**
 * Доступ к Vercel KV / Upstash через REST API.
 * Используются переменные KV_REST_API_URL + KV_REST_API_TOKEN,
 * т.к. пакет @vercel/kv устарел.
 * Без этих переменных команды возвращают null (KV считается не настроенным).
 */

/**
 * Выполняет команду Upstash-совместимого REST API.
 * Возвращает result или null, если KV не настроен.
 * Бросает исключение при HTTP-ошибке.
 */
export async function kvCommand(
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
