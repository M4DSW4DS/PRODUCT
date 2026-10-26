import type { ComponentConfig } from "@puckeditor/core";
import { ConversionBlock } from "./index";
import type { ConversionProps } from "./index";

export const ConversionSchema: ComponentConfig<ConversionProps> = {
  label: "Блок конверсии (Цены и Программа)",
  fields: {
    title: { type: "text", contentEditable: true, label: "Заголовок блока" },
    tabs: {
      type: "array",
      label: "Вкладки",
      arrayFields: {
        label: { type: "text", contentEditable: true, label: "Название вкладки" },
        title: { type: "text", contentEditable: true, label: "Заголовок" },
        body: { type: "textarea", contentEditable: true, label: "Текст" },
      },
      defaultItemProps: {
        label: "Новая вкладка",
        title: "Заголовок",
        body: "Описание.",
      },
      getItemSummary: (item) => item.label || "Вкладка",
    },
  },
  defaultProps: {
    title: "Цены и программа",
    tabs: [
      {
        label: "Программа",
        title: "Программа мероприятия",
        body: "Описание программы.",
      },
      {
        label: "Цены",
        title: "Стоимость участия",
        body: "Описание цен.",
      },
    ],
  },
  render: (props) => <ConversionBlock title={props.title} tabs={props.tabs} />,
};