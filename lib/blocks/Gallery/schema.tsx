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
        src: { type: "text", label: "URL изображения" },
        alt: { type: "text", label: "Alt-текст" },
      },
      getItemSummary: (item, index) => item.alt || `Изображение ${(index ?? 0) + 1}`,
      defaultItemProps: () => ({ src: "", alt: "" }),
    },
  },
  defaultProps: {
    title: "Галерея",
    columns: "3",
    images: [
      { src: "", alt: "Пример 1" },
      { src: "", alt: "Пример 2" },
      { src: "", alt: "Пример 3" },
    ],
  },
  render: (props) => (
    <GalleryBlock title={props.title} columns={props.columns} images={props.images} />
  ),
};
