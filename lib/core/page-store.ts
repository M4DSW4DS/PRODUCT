import type { Data } from "@puckeditor/core";
import pageFallback from "@/content/page.json";
import { kvCommand } from "./kv";

/** Ключ опубликованной страницы в KV. */
const PAGE_KEY = "design-lab:page";

/**
 * Читает опубликованные данные страницы из KV.
 * Fallback — content/page.json (KV не настроен или ещё ничего не публиковали).
 */
export async function getPageData(): Promise<Data> {
  try {
    const raw = await kvCommand("GET", PAGE_KEY);
    if (typeof raw === "string" && raw) {
      return JSON.parse(raw) as Data;
    }
  } catch (err) {
    console.error("[page-store] чтение из KV не удалось, берём page.json:", err);
  }
  return pageFallback as unknown as Data;
}

/**
 * Публикует данные страницы в KV (перезаписывает).
 * Бросает исключение, если KV не настроен или недоступен.
 */
export async function savePageData(data: Data): Promise<void> {
  const stored = await kvCommand("SET", PAGE_KEY, JSON.stringify(data));
  if (stored === null) {
    throw new Error(
      "KV не настроен: задай KV_REST_API_URL и KV_REST_API_TOKEN"
    );
  }
}
