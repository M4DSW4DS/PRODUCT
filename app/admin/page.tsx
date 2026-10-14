import type { Metadata } from "next";
import "@puckeditor/core/puck.css";
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
