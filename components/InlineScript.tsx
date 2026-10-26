"use client";

import { useServerInsertedHTML } from "next/navigation";

type InlineScriptProps = {
  id?: string;
  children: string;
};

export function InlineScript({ id, children }: InlineScriptProps) {
  useServerInsertedHTML(() => (
    <script
      id={id}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  ));
  return null;
}