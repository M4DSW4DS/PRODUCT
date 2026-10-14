"use client";

import { useState } from "react";
import type { Data } from "@puckeditor/core";
import { DesignLabEditor } from "@/lib/core/editor";
import { blocksConfig } from "@/lib/blocks";
export default function EditorClient({ initialData }: { initialData: Data }) {
  const [data, setData] = useState<Data>(initialData);

  async function putPage(next: Data, token: string | null): Promise<Response> {
    return fetch("/api/page", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "x-admin-token": token } : {}),
      },
      body: JSON.stringify(next),
    });
  }

  async function handlePublish(next: Data) {
    try {
      let token: string | null = null;
      try {
        token = sessionStorage.getItem("design-lab-admin-token");
      } catch {
        token = null;
      }

      let res = await putPage(next, token);

      // 401 — пароль публикации не совпал или не задан: спросим (MVP-flow).
      if (res.status === 401) {
        const entered = window.prompt("Пароль публикации (ADMIN_TOKEN):");
        if (!entered) throw new Error("Публикация отменена: пароль не введён");
        res = await putPage(next, entered);
        if (res.status === 401) throw new Error("Неверный пароль публикации");
        if (res.ok) {
          try {
            sessionStorage.setItem("design-lab-admin-token", entered);
          } catch {
            /* приватный режим — кэш не сохранится, не критично */
          }
        }
      }

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error || `HTTP ${res.status}`);
      }
      // eslint-disable-next-line no-console
      console.info("[DesignLab] опубликовано в KV");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // eslint-disable-next-line no-console
      console.error("[DesignLab] публикация не удалась:", msg);
      window.alert(`Не удалось опубликовать: ${msg}`);
    }
  }

  return (
    <DesignLabEditor
      config={blocksConfig}
      initialData={data}
      onChange={(next) => setData(next)}
      onPublish={handlePublish}
    />
  );
}
