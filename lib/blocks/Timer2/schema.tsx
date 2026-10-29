import type { ComponentConfig } from "@puckeditor/core";
import { Timer2 } from "./index";
import type { Timer2Props } from "./index";

export const Timer2Schema: ComponentConfig<Timer2Props> = {
  fields: {
    targetDate: { type: "text", label: "Дата цели (targetDate)" },
    size: {
      type: "radio",
      label: "Размер (size)",
      options: [
        { label: "Мелкий", value: "sm" },
        { label: "Средний", value: "md" },
        { label: "Крупный", value: "lg" },
      ],
    },
    glow: { type: "radio", label: "Свечение (glow)", options: [{ label: "Вкл", value: true }, { label: "Выкл", value: false }] },
    cardBg: { type: "radio", label: "Фон карточки (cardBg)", options: [{ label: "Вкл", value: true }, { label: "Выкл", value: false }] },
    labelDays: { type: "text", label: "Подпись: Дни" },
    labelHours: { type: "text", label: "Подпись часов (labelHours)" },
    labelMinutes: { type: "text", label: "Подпись минут (labelMinutes)" },
    labelSeconds: { type: "text", label: "Подпись секунд (labelSeconds)" },
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