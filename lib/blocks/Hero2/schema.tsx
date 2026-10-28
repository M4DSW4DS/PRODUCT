import type { ComponentConfig } from "@puckeditor/core";
import { Hero2 } from "./index";
import type { Hero2Props } from "./index";

export const Hero2Schema: ComponentConfig<Hero2Props> = {
  fields: {
    eyebrow: { type: "text", contentEditable: true, label: "Надпись над заголовком (eyebrow)" },
    title: { type: "text", contentEditable: true, label: "Заголовок (title)" },
    subtitle: { type: "textarea", contentEditable: true, label: "Подзаголовок (subtitle)" },
    quote: {
      type: "object",
      label: "Цитата (quote)",
      objectFields: {
        text: { type: "textarea", contentEditable: true, label: "Текст цитаты (text)" },
        author: { type: "text", contentEditable: true, label: "Автор цитаты (author)" },
      },
    },
    cta: {
      type: "object",
      label: "Кнопка (cta)",
      objectFields: {
        label: { type: "text", contentEditable: true, label: "Текст кнопки (label)" },
        href: { type: "text", label: "Ссылка кнопки (href)" },
      },
    },
    accentWord: { type: "text", contentEditable: true, label: "Акцентное слово (accentWord)" },
    accentColor: {
      type: "radio",
      label: "Акцентный цвет (accentColor)",
      options: [
        { label: "Золотой", value: "egyptian-gold" },
        { label: "Голубой", value: "neon-cyan" },
        { label: "Оранжевый", value: "eclipse-orange" },
        { label: "Белый", value: "white" },
      ],
    },
    showTimer: {
      type: "radio",
      label: "Таймер (showTimer)",
      options: [
        { label: "Да", value: true },
        { label: "Нет", value: false },
      ],
    },
    pinScreens: {
      type: "number",
      label: "Удержание (экранов скролла)",
      min: 1,
      max: 8,
    },
  },
  defaultProps: {
    eyebrow: "",
    title: "",
    subtitle: "",
    quote: { text: "", author: "" },
    cta: { label: "", href: "" },
    accentWord: "",
    accentColor: "egyptian-gold",
    showTimer: true,
    pinScreens: 3,
  },
  render: (props) => <Hero2 {...props} />,
};