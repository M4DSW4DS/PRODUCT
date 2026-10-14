import { Render } from "@puckeditor/core/rsc";
import type { Config, Data } from "@puckeditor/core";

/**
 * ДВИЖОК (ENGINE) — рендерер JSON → React-компоненты.
 *
 * Принимает конфиг блоков и данные страницы (content/page.json),
 * возвращает готовую разметку. Не зависит от конкретных блоков.
 */
export interface PageRendererProps {
  config: Config;
  data: Data;
}

export function PageRenderer({ config, data }: PageRendererProps) {
  return <Render config={config} data={data} />;
}
