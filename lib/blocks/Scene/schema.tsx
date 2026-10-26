import type { ComponentConfig } from "@puckeditor/core";
import { Scene } from "./index";
import type { SceneProps } from "./index";
import { MediaPicker } from "@/lib/core/fields/MediaPicker";

/**
 * Схема блока Scene для Puck.
 * 7 вариантов: mystery, truth, key, elements, keepers, darkness, fifth.
 */
export const SceneSchema: ComponentConfig<SceneProps> = {
  fields: {
    variant: {
      type: "radio",
      label: "Тип сцены (Вариант)",
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
      label: "Затемнение фона (Vignette)",
      options: [
        { label: "Без наложения", value: "none" },
        { label: "Сумерки (dusk)", value: "dusk" },
        { label: "Ночь (night)", value: "night" },
      ],
    },
    eyebrowPrefix: { type: "text", label: "Префикс сцены (напр. SCENE 01 //)" },
    eyebrowSuffix: { type: "text", label: "Текст после префикса" },
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
    backgroundImage: { type: "custom", render: ({ value, onChange }) => <MediaPicker value={value} onChange={onChange} /> },
    quote: { type: "textarea", contentEditable: true, label: "Цитата (если есть)" },
    quoteAttribution: { type: "text", label: "Автор цитаты" },
    ctaLabel: { type: "text", label: "Текст кнопки CTA" },
    ctaHref: { type: "text", label: "Ссылка CTA" },
    svg_caption: { type: "text", label: "Подпись к SVG (Scene 2)" },
    microcopy: { type: "text", label: "Микрокопия (Scene 7)" },
    anchor: {
      type: "text",
      label: "ID-якорь для ссылок (напр. register)",
    },
    artifacts: {
      type: "array",
      label: "Карточки-числа (Scene 3)",
      arrayFields: {
        title: { type: "text", label: "Заголовок" },
        sub: { type: "text", label: "Подпись" },
      },
      defaultItemProps: { title: "", sub: "" },
      getItemSummary: (item) => item.title || "Карточка",
    },
    plates: {
      type: "array",
      label: "Плиты стихий (Scene 4)",
      arrayFields: {
        name: { type: "text", label: "Название" },
        text: { type: "textarea", label: "Текст" },
        color: {
          type: "radio",
          label: "Цвет",
          options: [
            { label: "Gold", value: "gold" },
            { label: "Cyan", value: "cyan" },
            { label: "Orange", value: "orange" },
            { label: "White", value: "white" },
          ],
        },
      },
      defaultItemProps: { name: "", text: "", color: "gold" },
      getItemSummary: (item) => item.name || "Плита",
    },
    voices: {
      type: "array",
      label: "Голоса (Scene 5)",
      arrayFields: {
        name: { type: "text", label: "Имя голоса" },
      },
      defaultItemProps: { name: "" },
      getItemSummary: (item) => item.name || "Голос",
    },
    additional_ctas: {
      type: "array",
      label: "Доп. ссылки (Scene 7)",
      arrayFields: {
        label: { type: "text", label: "Текст ссылки" },
        href: { type: "text", label: "URL / якорь" },
      },
      defaultItemProps: { label: "", href: "" },
      getItemSummary: (item) => item.label || "Ссылка",
    },
  },
  defaultProps: {
    variant: "mystery",
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
    svg_caption: "",
    microcopy: "",
    anchor: "",
    artifacts: [],
    plates: [],
    voices: [],
    additional_ctas: [],
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
