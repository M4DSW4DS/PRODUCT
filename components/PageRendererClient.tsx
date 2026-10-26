"use client";

import { Render } from "@puckeditor/core/rsc";
import type { Data } from "@puckeditor/core";
import { blocksConfig } from "@/lib/blocks";

export function PageRendererClient({ data }: { data: Data }) {
  return <Render config={blocksConfig} data={data} />;
}