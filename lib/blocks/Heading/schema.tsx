import type { ComponentConfig } from "@puckeditor/core";
import { HeadingBlock } from "./index";
import type { HeadingProps } from "./index";

/**
 * Схема блока Heading для Puck (поля и значения по умолчанию).
 * render вызывает компонент (не передаёт его ссылкой) — требование RSC.
 */
export const HeadingSchema: ComponentConfig<HeadingProps> = {
  fields: {
    title: { type: "text", contentEditable: true, label: "Заголовок (основной текст блока)" },
    level: {
      type: "radio",
      label: "Уровень заголовка (H1–H6)",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
      ],
    },
    align: {
      type: "radio",
      label: "Выравнивание (слева / по центру / справа)",
      options: [
        { label: "Слева", value: "left" },
        { label: "Центр", value: "center" },
        { label: "Справа", value: "right" },
      ],
    },
  },
  defaultProps: {
    title: "Заголовок",
    level: "h1",
    align: "center",
  },
  render: (props) => (
    <HeadingBlock title={props.title} level={props.level} align={props.align} />
  ),
};
