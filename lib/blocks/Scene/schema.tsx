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
    backgroundImage: { type: "custom", label: "Фоновое изображение (загрузить или выбрать из галереи)", render: ({ value, onChange }) => <MediaPicker value={value} onChange={onChange} /> },
    headingLine1: { type: "text", contentEditable: true, label: "Заголовок" },
    headingAccent: { type: "text", contentEditable: true, label: "Акцентное слово в заголовке" },
    accent: {
      type: "radio",
      label: "Акцентный цвет",
      options: [
        { label: "Золото", value: "egyptian-gold" },
        { label: "Голубой", value: "neon-cyan" },
        { label: "Оранжевый", value: "eclipse-orange" },
        { label: "Белый", value: "white" },
      ],
    },
    lead: { type: "text", contentEditable: true, label: "Основной текст" },
    quote: {
      type: "object",
      label: "Цитата",
      objectFields: {
        text: { type: "textarea", contentEditable: true, label: "Текст цитаты" },
        author: { type: "text", contentEditable: true, label: "Автор цитаты" },
      },
    },
    ctaLabel: { type: "text", contentEditable: true, label: "Текст кнопки CTA" },
    ctaHref: { type: "text", contentEditable: true, label: "Ссылка кнопки CTA" },
    overlay: {
      type: "radio",
      label: "Затемнение фона (Vignette)",
      options: [
        { label: "Без наложения", value: "none" },
        { label: "Сумерки (dusk)", value: "dusk" },
        { label: "Ночь (night)", value: "night" },
      ],
    },
  },
  defaultProps: {
    overlay: "none",
    backgroundImage: "",
    headingLine1: "",
    headingAccent: "",
    lead: "",
    quote: { text: "", author: "" },
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
