import type { ComponentConfig } from "@puckeditor/core";
import { Timer2 } from "./index";
import type { Timer2Props } from "./index";

export const Timer2Schema: ComponentConfig<Timer2Props> = {
  fields: {
    targetDate: { type: "text", label: "Целевая дата (ISO)" },
    size: {
      type: "radio",
      label: "Размер цифр",
      options: [
        { label: "Мелкий", value: "sm" },
        { label: "Средний", value: "md" },
        { label: "Крупный", value: "lg" },
      ],
    },
    glow: { type: "radio", label: "Свечение (Glow)", options: [{ label: "Вкл", value: true }, { label: "Выкл", value: false }] },
    cardBg: { type: "radio", label: "Фон-карточка", options: [{ label: "Вкл", value: true }, { label: "Выкл", value: false }] },
    labelDays: { type: "text", label: "Подпись: Дни" },
    labelHours: { type: "text", label: "Подпись: Часы" },
    labelMinutes: { type: "text", label: "Подпись: Минуты" },
    labelSeconds: { type: "text", label: "Подпись: Секунды" },
  },
  defaultProps: {
    targetDate: "2027-08-02T13:02:00+03:00",
    size: "lg",
    glow: true,
    cardBg: true,
    labelDays: "Дней",
    labelHours: "Часов",
    labelMinutes: "Минут",
    labelSeconds: "Секунд",
  },
  render: (props) => <Timer2 {...props} />,
};