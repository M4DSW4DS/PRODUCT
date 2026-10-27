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
    sunTop: { type: "text", contentEditable: true, label: "Позиция солнца сверху (sunTop)" },
    sunLeft: { type: "text", contentEditable: true, label: "Позиция солнца слева (sunLeft)" },
    sunSize: { type: "text", contentEditable: true, label: "Размер солнца (sunSize)" },
    sunGlowColor: {
      type: "radio",
      label: "Цвет свечения (sunGlowColor)",
      options: [
        { label: "Голубой", value: "neon-cyan" },
        { label: "Золотой", value: "egyptian-gold" },
        { label: "Оранжевый", value: "eclipse-orange" },
        { label: "Белый", value: "white" },
      ],
    },
    sunGlowSize: { type: "number", label: "Размер свечения (sunGlowSize)", min: 0, max: 300 },
    sunGlowOpacity: {
      type: "radio",
      label: "Яркость свечения (sunGlowOpacity)",
      options: [
        { label: "Слабая (25%)", value: "0.25" },
        { label: "Средняя (50%)", value: "0.5" },
        { label: "Сильная (75%)", value: "0.75" },
        { label: "Максимум (100%)", value: "1" },
      ],
    },
    eclipsePercent: { type: "number", label: "Затмение % (eclipsePercent)", min: 0, max: 100 },
    eclipseColor: {
      type: "radio",
      label: "Цвет затмения (eclipseColor)",
      options: [
        { label: "Чёрный", value: "cosmic-black" },
        { label: "Тёмно-золотой", value: "egyptian-gold" },
        { label: "Тёмно-оранжевый", value: "eclipse-orange" },
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
    sunTop: "40%",
    sunLeft: "50%",
    sunSize: "400px",
    sunGlowColor: "neon-cyan",
    sunGlowSize: 100,
    sunGlowOpacity: "0.75",
    eclipsePercent: 0,
    eclipseColor: "cosmic-black",
  },
  render: (props) => <Hero {...props} />,
};