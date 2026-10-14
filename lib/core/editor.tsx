"use client";

import { useMemo } from "react";
import { Puck } from "@puckeditor/core";
import type { Config, Data } from "@puckeditor/core";
import {
  blocksPlugin,
  fieldsPlugin,
  outlinePlugin,
} from "@puckeditor/core";
import { editorViewports, editorPermissions } from "./theme";

/**
 * ДВИЖОК (ENGINE) — настройка визуального редактора Puck.
 *
 * Этот компонент client-only (интерактивный). Он не знает о конкретных
 * блоках — конфиг передаётся снаружи через props из реестра блоков.
 */

export interface DesignLabEditorProps {
  config: Config;
  initialData: Data;
  onChange?: (data: Data) => void;
  onPublish?: (data: Data) => void;
  headerTitle?: string;
}

export function DesignLabEditor({
  config,
  initialData,
  onChange,
  onPublish,
  headerTitle = "Дизайн-лаборатория",
}: DesignLabEditorProps) {
  // Плагины стабильны — создаём один раз.
  const plugins = useMemo(
    () => [blocksPlugin(), fieldsPlugin(), outlinePlugin()],
    []
  );

  return (
    <Puck
      config={config}
      data={initialData}
      onPublish={onPublish}
      onChange={onChange}
      plugins={plugins}
      permissions={editorPermissions}
      viewports={editorViewports}
      iframe={{ enabled: false }}
      headerTitle={headerTitle}
    />
  );
}
