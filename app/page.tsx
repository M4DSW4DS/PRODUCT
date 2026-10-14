import { PageRenderer } from "@/lib/core/renderer";
import { blocksConfig } from "@/lib/blocks";
import { getPageData } from "@/lib/core/page-store";

/**
 * Страница рендерится из опубликованного контента (KV, Этап 5)
 * с fallback на content/page.json. force-dynamic: всегда свежие данные.
 */
export const dynamic = "force-dynamic";

export default async function Home() {
  const pageData = await getPageData();
  return <PageRenderer config={blocksConfig} data={pageData} />;
}
