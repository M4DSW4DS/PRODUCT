import type { Metadata } from "next";
// ВАЖНО: используем no-external.css, а не puck.css.
// dist/index.css начинается с `@import url("https://rsms.me/inter/inter.css")`.
// Пока этот внешний @import не загрузится, Chrome блокирует применение ВСЕГО
// stylesheet — включая `._Puck_tzaxg_19 { visibility: visible !important }`.
// В итоге .Puck остаётся с инлайновым visibility:hidden, и канвас редактора пуст.
// no-external.css идентичен index.css, но без внешнего @import.
import "@puckeditor/core/no-external.css";
import EditorClient from "./EditorClient";
import { getPageData } from "@/lib/core/page-store";

// Всегда грузим свежие данные в редактор.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Редактор — Дизайн-лаборатория",
};

export default async function AdminPage() {
  const initialData = await getPageData();
  return <EditorClient initialData={initialData} />;
}
