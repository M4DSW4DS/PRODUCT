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
    hudLabel: { type: "text", contentEditable: true, label: "Подпись HUD (строка состояния)" },
    hudFooter: { type: "text", contentEditable: true, label: "Подпись HUD (подвал)" },
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
    sunGlow: { type: "text", contentEditable: true, label: "Свечение Солнца (напр. rgba(255,120,20,0.8))" },
  },
  defaultProps: {
    eyebrow: "",
    title: "",
    subtitle: "",
    quote: "",
    quoteAttribution: "MISTER ZORG",
    ctaLabel: "",
    ctaHref: "",
    hudLabel: "System Ready // Countdown",
    hudFooter: "ORBIT · EARTH · EGYPT",
    showTimer: true,
    showCalendar: true,
    sunTop: "40%",
    sunLeft: "50%",
    sunSize: "400px",
    sunGlow: "0 0 100px rgba(255,180,50,0.9)",
  },
  render: (props) => (
    <Hero
      {...props}
      showTimer={props.showTimer}
      showCalendar={props.showCalendar}
      sunTop={props.sunTop}
      sunLeft={props.sunLeft}
      sunSize={props.sunSize}
      sunGlow={props.sunGlow}
    />
  ),
};

