import type { ComponentConfig } from "@puckeditor/core";
import { GridBlock } from "./index";
import type { GridBlockProps } from "./index";

export const GridBlockSchema: ComponentConfig<GridBlockProps> = {
  fields: {
    columns: { type: "radio", label: "Колонки", options: [ { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" } ] },
    items: {
      type: "array",
      label: "Элементы сетки",
      getItemSummary: (item) => (typeof item.title === "string" ? item.title : "Элемент"),
      defaultItemProps: { id: "item-1", image: "", title: "Заголовок", description: "Описание элемента" },
      arrayFields: {
        id: { type: "text", label: "ID" },
        image: { type: "text", label: "Картинка (URL)" },
        title: { type: "text", contentEditable: true, label: "Заголовок" },
        description: { type: "textarea", contentEditable: true, label: "Описание" },
      },
    },
  },
  defaultProps: {
    columns: "3",
    items: [
      { id: "item-1", image: "/hero/zorg-cabinet.png", title: "Элемент 1", description: "Описание первого элемента" },
      { id: "item-2", image: "/hero/zorg-cabinet.png", title: "Элемент 2", description: "Описание второго элемента" },
      { id: "item-3", image: "/hero/zorg-cabinet.png", title: "Элемент 3", description: "Описание третьего элемента" },
    ],
  },
  render: (props) => <GridBlock {...props} />,
};