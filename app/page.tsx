import { PageRenderer } from "@/lib/core/renderer";
import { blocksConfig } from "@/lib/blocks";
import pageData from "@/content/page.json";

/**
 * Страница рендерится из JSON (КОНТЕНТ) через ДВИЖОК.
 * Это Server Component — данные пока берутся из content/page.json.
 * На следующих этапах здесь будет чтение из KV с fallback на этот файл.
 */
export default function Home() {
  return <PageRenderer config={blocksConfig} data={pageData as never} />;
}
