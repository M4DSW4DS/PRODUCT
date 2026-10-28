import type { ComponentConfig } from "@puckeditor/core";
import { Timer1 } from "./index";
import type { Timer1Props } from "./index";

export const Timer1Schema: ComponentConfig<Timer1Props> = {
  fields: {
    title: { type: "text", contentEditable: true, label: "Заголовок над таймером" },
    targetDate: { type: "text", label: "Целевая дата (ISO, напр. 2027-08-02T13:02:00+03:00)" },
    accentColor: {
      type: "radio",
      label: "Акцентный цвет",
      options: [
        { label: "Золотой", value: "egyptian-gold" },
        { label: "Голубой", value: "neon-cyan" },
        { label: "Оранжевый", value: "eclipse-orange" },
        { label: "Белый", value: "white" },
      ],
    },
    showLabels: { type: "radio", label: "Показывать подписи", options: [{ label: "Да", value: true }, { label: "Нет", value: false }] },
  },
  defaultProps: {
    title: "До затмения осталось",
    targetDate: "2027-08-02T13:02:00+03:00",
    accentColor: "egyptian-gold",
    showLabels: true,
  },
  render: (props) => <Timer1 {...props} />,
};