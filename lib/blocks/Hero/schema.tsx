import type { ComponentConfig } from "@puckeditor/core";
import { Hero } from "./index";
import type { HeroProps } from "./index";

/**
 * Схема блока Hero для Puck (кинематографичная версия).
 */
export const HeroSchema: ComponentConfig<HeroProps> = {
  fields: {
    eyebrow: { type: "text", contentEditable: true, label: "Надзаголовок (маленький текст сверху)" },
    title: { type: "text", contentEditable: true, label: "Главный заголовок (H1)" },
    subtitle: { type: "textarea", contentEditable: true, label: "Подзаголовок" },
    quote: { type: "textarea", contentEditable: true, label: "Цитата Зорга" },
    quoteAttribution: { type: "text", contentEditable: true, label: "Автор цитаты" },
    ctaLabel: { type: "text", contentEditable: true, label: "Текст кнопки (если нужно)" },
    ctaHref: { type: "text", contentEditable: true, label: "Ссылка кнопки" },
    showTimer: {
      type: "radio",
      label: "Показывать таймер",
      options: [
        { label: "Да", value: true },
        { label: "Нет", value: false },
      ],
    },
    showCalendar: {
      type: "radio",
      label: "Показывать календарь",
      options: [
        { label: "Да", value: true },
        { label: "Нет", value: false },
      ],
    },
    sunTop: { type: "text", contentEditable: true, label: "Положение Солнца по вертикали (напр. 40%, 75%)" },
    sunLeft: { type: "text", contentEditable: true, label: "Положение Солнца по горизонтали (напр. 50%)" },
    sunSize: { type: "text", contentEditable: true, label: "Размер Солнца (напр. 400px, 300px)" },
    sunGlowColor: {
      type: "radio",
      label: "Цвет свечения Солнца",
      options: [
        { label: "Голубой", value: "neon-cyan" },
        { label: "Золотой", value: "egyptian-gold" },
        { label: "Оранжевый", value: "eclipse-orange" },
        { label: "Белый", value: "white" },
      ],
    },
    sunGlowSize: {
      type: "number",
      label: "Размер свечения (px, размытие)",
      min: 0,
      max: 300,
    },
    sunGlowOpacity: {
      type: "radio",
      label: "Яркость свечения",
      options: [
        { label: "Слабая (25%)", value: "0.25" },
        { label: "Средняя (50%)", value: "0.5" },
        { label: "Сильная (75%)", value: "0.75" },
        { label: "Максимум (100%)", value: "1" },
      ],
    },
    eclipsePercent: {
      type: "number",
      label: "Затмение (%) — затемнение солнца",
      min: 0,
      max: 100,
    },
    eclipseColor: {
      type: "radio",
      label: "Цвет затмения",
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
    quote: "",
    quoteAttribution: "MISTER ZORG",
    ctaLabel: "",
    ctaHref: "",
    showTimer: true,
    showCalendar: true,
    sunTop: "40%",
    sunLeft: "50%",
    sunSize: "400px",
    sunGlowColor: "neon-cyan",
    sunGlowSize: 100,
    sunGlowOpacity: "0.75",
    eclipsePercent: 0,
    eclipseColor: "cosmic-black",
  },
  render: (props) => (
    <Hero
      {...props}
      showTimer={props.showTimer}
      showCalendar={props.showCalendar}
      sunTop={props.sunTop}
      sunLeft={props.sunLeft}
      sunSize={props.sunSize}
      sunGlowColor={props.sunGlowColor}
      sunGlowSize={props.sunGlowSize}
      sunGlowOpacity={props.sunGlowOpacity}
      eclipsePercent={props.eclipsePercent}
      eclipseColor={props.eclipseColor}
    />
  ),
};

