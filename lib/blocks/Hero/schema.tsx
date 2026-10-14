import type { ComponentConfig } from "@puckeditor/core";
import { HeroBlock } from "./index";
import type { HeroProps } from "./index";

/**
 * Схема блока Hero для Puck (поля и значения по умолчанию).
 */
export const HeroSchema: ComponentConfig<HeroProps> = {
  fields: {
    eyebrow: { type: "text", label: "Надзаголовок" },
    title: { type: "text", label: "Заголовок" },
    subtitle: { type: "textarea", label: "Подзаголовок" },
    ctaText: { type: "text", label: "Текст кнопки" },
    ctaHref: { type: "text", label: "Ссылка кнопки" },
    align: {
      type: "radio",
      label: "Выравнивание",
      options: [
        { label: "Слева", value: "left" },
        { label: "Центр", value: "center" },
      ],
    },
  },
  defaultProps: {
    eyebrow: "Дизайн-лаборатория",
    title: "Создай промо-страницу мечты",
    subtitle: "Визуальный редактор, Pollinations-картинки и готовая посадочная за минуты.",
    ctaText: "Начать бесплатно",
    ctaHref: "#lead-form",
    align: "center",
  },
  render: (props) => (
    <HeroBlock
      eyebrow={props.eyebrow}
      title={props.title}
      subtitle={props.subtitle}
      ctaText={props.ctaText}
      ctaHref={props.ctaHref}
      align={props.align}
    />
  ),
};
