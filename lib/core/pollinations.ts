/**
 * Интеграция с Pollinations.ai — бесплатная генерация изображений по текстовому промпту.
 * Документация: https://raw.githubusercontent.com/pollinations/pollinations/master/APIDOCS.md
 *
 * Формат: https://image.pollinations.ai/prompt/{prompt}?width&height&seed&nofeed&safe
 * - Ключ не нужен (лимиты по IP: 1 запрос раз в ~45 сек).
 * - Одинаковый промпт + seed + параметры → одно и то же изображение (кэшируется).
 * - Сторона ≤ 768 px (free-план: максимум площадь 768×768, соотношение сохраняется).
 */

export type PollinationsImageOptions = {
  /** Ширина в px (по умолчанию 768, максимум 768 на сторону). */
  width?: number;
  /** Высота в px (по умолчанию 768, максимум 768 на сторону). */
  height?: number;
  /** seed — одинаковый seed даёт одно и то же изображение для промпта. */
  seed?: number;
  /** Не показывать промпт в публичной ленте Pollinations (по умолчанию true). */
  nofeed?: boolean;
  /** Усиленный контент-фильтр (по умолчанию false). */
  safe?: boolean;
};

const POLLINATIONS_IMAGE_BASE = "https://image.pollinations.ai/prompt/";

/**
 * Собирает URL изображения, сгенерированного Pollinations.ai по промпту.
 * Возвращает пустую строку, если промпт пустой (тогда картинка не рендерится).
 */
export function pollinationsImageUrl(
  prompt: string,
  options: PollinationsImageOptions = {}
): string {
  const trimmed = prompt.trim();
  if (!trimmed) return "";

  const {
    width = 768,
    height = 768,
    seed = 42,
    nofeed = true,
    safe = false,
  } = options;

  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    seed: String(seed),
    nofeed: nofeed ? "true" : "false",
    safe: safe ? "true" : "false",
  });

  return `${POLLINATIONS_IMAGE_BASE}${encodeURIComponent(trimmed)}?${params.toString()}`;
}
