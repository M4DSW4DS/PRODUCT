import type { ComponentConfig } from "@puckeditor/core";
import { Scene } from "./index";
import type { SceneProps } from "./index";

/**
 * Схема блока Scene для Puck.
 * 7 вариантов: mystery, truth, key, elements, keepers, darkness, fifth.
 */
export const SceneSchema: ComponentConfig<SceneProps> = {
  fields: {
    variant: {
      type: "radio",
      label: "Вариант сцены",
      options: [
        { label: "Mystery (тайна)", value: "mystery" },
        { label: "Truth (истина)", value: "truth" },
        { label: "Key (ключ)", value: "key" },
        { label: "Elements (стихии)", value: "elements" },
        { label: "Keepers (хранители)", value: "keepers" },
        { label: "Darkness (тьма)", value: "darkness" },
        { label: "Fifth (пятый элемент)", value: "fifth" },
      ],
    },
    overlay: {
      type: "radio",
      label: "Наложение фона",
      options: [
        { label: "Без наложения", value: "none" },
        { label: "Сумерки (dusk)", value: "dusk" },
        { label: "Ночь (night)", value: "night" },
      ],
    },
    eyebrow: { type: "text", label: "Надзаголовок" },
    heading: { type: "text", label: "Заголовок" },
    lead: { type: "textarea", label: "Ведущий текст" },
    accent: {
      type: "radio",
      label: "Акцентный цвет",
      options: [
        { label: "Золото (gold)", value: "gold" },
        { label: "Неон (cyan)", value: "cyan" },
        { label: "Оранжевый (orange)", value: "orange" },
        { label: "Белый (white)", value: "white" },
      ],
    },
    backgroundImage: { type: "text", label: "Фоновая картинка (путь из public/)" },
    quote: { type: "textarea", label: "Цитата (опционально)" },
    ctaLabel: { type: "text", label: "Текст кнопки CTA" },
    ctaHref: { type: "text", label: "Ссылка CTA" },
  },
  defaultProps: {
    variant: "mystery",
    overlay: "none",
    eyebrow: "",
    heading: "",
    lead: "",
    accent: "gold",
    backgroundImage: "",
    quote: "",
    ctaLabel: "",
    ctaHref: "",
  },
  render: (props) => (
    <Scene
      variant={props.variant}
      overlay={props.overlay}
      eyebrow={props.eyebrow}
      heading={props.heading}
      lead={props.lead}
      accent={props.accent}
      backgroundImage={props.backgroundImage}
      quote={props.quote}
      ctaLabel={props.ctaLabel}
      ctaHref={props.ctaHref}
    />
  ),
};
