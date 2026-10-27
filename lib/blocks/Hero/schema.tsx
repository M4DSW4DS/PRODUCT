import type { ComponentConfig } from "@puckeditor/core";
import { Hero } from "./index";
import type { HeroProps } from "./index";

export const HeroSchema: ComponentConfig<HeroProps> = {
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
  },
  render: (props) => <Hero {...props} />,
};