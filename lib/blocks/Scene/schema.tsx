import type { ComponentConfig } from "@puckeditor/core";
import { Scene } from "./index";
import type { SceneProps } from "./index";
import { MediaPicker } from "@/lib/core/fields/MediaPicker";

/**
 * Схема блока Scene для Puck.
 * Один универсальный шаблон (Mystery).
 */
export const SceneSchema: ComponentConfig<SceneProps> = {
  fields: {
    overlay: {
      type: "radio",
      label: "Затемнение фона (Vignette)",
      options: [
        { label: "Без наложения", value: "none" },
        { label: "Сумерки (dusk)", value: "dusk" },
        { label: "Ночь (night)", value: "night" },
      ],
    },
    eyebrowPrefix: { type: "text", contentEditable: true, label: "Префикс сцены (напр. SCENE 01 //)" },
    eyebrowSuffix: { type: "text", contentEditable: true, label: "Текст после префикса" },
    headingLines: {
      type: "array",
      label: "Заголовок (Строки)",
      getItemSummary: (item) => item.text || "Новая строка",
      arrayFields: {
        text: { type: "text", contentEditable: true, label: "Текст строки" },
        color: {
          type: "radio",
          label: "Цвет",
          options: [
            { label: "Белый", value: "white" },
            { label: "Золотой", value: "gold" },
            { label: "Циан", value: "cyan" },
            { label: "Оранжевый", value: "orange" },
          ],
        },
      },
      defaultItemProps: { text: "Новая строка", color: "white" },
    },
    textBlocks: {
      type: "array",
      label: "Текстовые абзацы",
      getItemSummary: (item) => item.text || "Новый абзац",
      arrayFields: {
        text: { type: "textarea", contentEditable: true, label: "Текст" },
      },
      defaultItemProps: { text: "Новый абзац" },
    },
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
    backgroundImage: { type: "custom", label: "Фоновое изображение (загрузить или выбрать из галереи)", render: ({ value, onChange }) => <MediaPicker value={value} onChange={onChange} /> },
    quote: { type: "textarea", contentEditable: true, label: "Цитата (если есть)" },
    quoteAttribution: { type: "text", contentEditable: true, label: "Автор цитаты" },
    ctaLabel: { type: "text", contentEditable: true, label: "Текст кнопки CTA" },
    ctaHref: { type: "text", contentEditable: true, label: "Ссылка CTA" },
  },
  defaultProps: {
    overlay: "none",
    eyebrowPrefix: "",
    eyebrowSuffix: "",
    headingLine1: "",
    headingLead: "",
    headingAccent: "",
    lead: "",
    headingLines: [],
    textBlocks: [],
    accent: "gold",
    backgroundImage: "",
    quote: "",
    quoteAttribution: "",
    ctaLabel: "",
    ctaHref: "",
  },
  render: (props) => {
    const { puck, id, ...rest } = props;
    const fromId =
      typeof id === "string" ? parseInt(id.replace(/\D/g, ""), 10) - 1 : 0;
    const index =
      typeof (puck as any)?.index === "number"
        ? (puck as any).index
        : Number.isFinite(fromId) && fromId >= 0
          ? fromId
          : 0;
    return <Scene {...rest} index={index} />;
  },
};
