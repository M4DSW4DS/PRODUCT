import type { ComponentConfig } from "@puckeditor/core";
import { GalleryBlock } from "./index";
import type { GalleryProps } from "./index";

/**
 * Схема блока Gallery для Puck. Массив изображений.
 */
export const GallerySchema: ComponentConfig<GalleryProps> = {
  fields: {
    title: { type: "text", label: "Заголовок секции" },
    columns: {
      type: "radio",
      label: "Колонок",
      options: [
        { label: "2", value: "2" },
        { label: "3", value: "3" },
      ],
    },
    images: {
      type: "array",
      label: "Изображения",
      arrayFields: {
        mode: {
          type: "radio",
          label: "Источник",
          options: [
            { label: "Своя ссылка", value: "url" },
            { label: "AI (Pollinations)", value: "ai" },
          ],
        },
        src: { type: "text", label: "URL изображения" },
        prompt: { type: "textarea", label: "Промпт для AI" },
        seed: { type: "number", label: "Seed" },
        alt: { type: "text", label: "Alt-текст" },
      },
      getItemSummary: (item, index) =>
        item.alt || item.prompt || `Изображение ${(index ?? 0) + 1}`,
      defaultItemProps: () => ({
        mode: "url" as const,
        src: "",
        prompt: "",
        seed: 42,
        alt: "",
      }),
    },
  },
  defaultProps: {
    title: "Галерея",
    columns: "3",
    images: [
      { mode: "url", src: "", prompt: "", seed: 42, alt: "Пример 1" },
      {
        mode: "ai",
        src: "",
        prompt: "египетская пирамида на закате, золотой свет, кинематографично",
        seed: 42,
        alt: "AI-пример",
      },
      { mode: "url", src: "", prompt: "", seed: 42, alt: "Пример 3" },
    ],
  },
  render: (props) => (
    <GalleryBlock title={props.title} columns={props.columns} images={props.images} />
  ),
};
