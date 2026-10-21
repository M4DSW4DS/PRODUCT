import type { ComponentConfig } from "@puckeditor/core";
import { Hero } from "./index";
import type { HeroProps } from "./index";

/**
 * Схема блока Hero для Puck (кинематографичная версия).
 */
export const HeroSchema: ComponentConfig<HeroProps> = {
  fields: {
    eyebrow: { type: "text", label: "Надзаголовок" },
    title: { type: "text", label: "Заголовок" },
    subtitle: { type: "textarea", label: "Подзаголовок" },
    quote: { type: "textarea", label: "Цитата (подпись Зорга)" },
    quoteAttribution: { type: "text", label: "Автор цитаты" },
    ctaLabel: { type: "text", label: "Текст кнопки CTA" },
    ctaHref: { type: "text", label: "Ссылка CTA" },
    hudLabel: { type: "text", label: "Подпись HUD (строка состояния)" },
    hudFooter: { type: "text", label: "Подпись HUD (подвал)" },
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
  },
  render: (props) => (
    <Hero
      eyebrow={props.eyebrow}
      title={props.title}
      subtitle={props.subtitle}
      quote={props.quote}
      quoteAttribution={props.quoteAttribution}
      ctaLabel={props.ctaLabel}
      ctaHref={props.ctaHref}
      hudLabel={props.hudLabel}
      hudFooter={props.hudFooter}
      showTimer={props.showTimer}
      showCalendar={props.showCalendar}
    />
  ),
};

