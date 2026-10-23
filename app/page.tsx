import { PageRenderer } from "@/lib/core/renderer";
import { blocksConfig } from "@/lib/blocks";
import { getPageData } from "@/lib/core/page-store";
import { EclipseSun } from "@/lib/blocks/Scene/EclipseSun";

/**
 * Страница рендерится из опубликованного контента (PostgreSQL)
 * с fallback на content/page.json. force-dynamic: всегда свежие данные.
 * Мы — витрина, не оператор ПД: сбор персональных данных на сайте
 * не производится, регистрация — в iframe-виджете TimePad (см. футер).
 */
export const dynamic = "force-dynamic";

export default async function Home() {
  const pageData = await getPageData();
  return (
    <>
      <PageRenderer config={blocksConfig} data={pageData} />
      <EclipseSun />

      <footer className="px-6 py-10 border-t border-white/10 bg-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <span>
            © {new Date().getFullYear()} Дизайн-лаборатория — витрина события.
            Сбор персональных данных на сайте не производится.
          </span>
          <a
            href="https://timepad.ru/about/legal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-egyptian-gold hover:text-neon-cyan transition-colors"
          >
            Политика обработки персональных данных (TimePad)
          </a>
        </div>
      </footer>
    </>
  );
}
