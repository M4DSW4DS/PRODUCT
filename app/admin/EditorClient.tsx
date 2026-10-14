"use client";

import { useState } from "react";
import type { Data } from "@puckeditor/core";
import { DesignLabEditor } from "@/lib/core/editor";
import { blocksConfig } from "@/lib/blocks";
import initialPageData from "@/content/page.json";

export default function EditorClient() {
  const [data, setData] = useState<Data>(initialPageData as Data);

  return (
    <DesignLabEditor
      config={blocksConfig}
      initialData={data}
      onChange={(next) => setData(next)}
      onPublish={(next) => {
        // Этап 2: лог в консоль. Сохранение в KV — на следующих этапах.
        // eslint-disable-next-line no-console
        console.log("[DesignLab] publish:", JSON.stringify(next));
      }}
    />
  );
}
