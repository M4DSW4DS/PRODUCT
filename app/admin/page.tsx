import type { Metadata } from "next";
import "@puckeditor/core/puck.css";
import EditorClient from "./EditorClient";

// Всегда грузим свежие данные в редактор.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Редактор — Дизайн-лаборатория",
};

export default function AdminPage() {
  return <EditorClient />;
}
