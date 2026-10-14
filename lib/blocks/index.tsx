import type { ReactNode } from "react";
import type { Config } from "@puckeditor/core";
import { HeadingSchema } from "./Heading/schema";

/**
 * РЕЕСТР БЛОКОВ.
 * Единая точка регистрации всех блоков.
 * При добавлении нового блока добавь его сюда и в categories.
 * ДВИЖОК при этом не меняется.
 */
export const blocksConfig: Config = {
  components: {
    Heading: HeadingSchema,
  },
  categories: {
    "Основные": {
      components: ["Heading"],
    },
  },
  root: {
    render: ({ children }: { children: ReactNode }) => <>{children}</>,
  },
};
