import type { ComponentConfig } from "@puckeditor/core";
import { CtaBlock } from "./index";
import type { CtaProps } from "./index";

/**
 * Схема блока CTA для Puck.
 */
export const CtaSchema: ComponentConfig<CtaProps> = {
  fields: {
    title: { type: "text", contentEditable: true, label: "Заголовок (title)" },
    subtitle: { type: "textarea", contentEditable: true, label: "Подзаголовок (subtitle)" },
    buttonText: { type: "text", contentEditable: true, label: "Текст кнопки (buttonText)" },
    buttonHref: { type: "text", label: "Ссылка кнопки (buttonHref)" },
  },
  defaultProps: {
    title: "Готов зарегистрироваться?",
    subtitle: "Кнопка ведёт к виджету TimePad прямо на странице.",
    buttonText: "Зарегистрироваться",
    buttonHref: "#register",
  },
  render: (props) => (
    <CtaBlock
      title={props.title}
      subtitle={props.subtitle}
      buttonText={props.buttonText}
      buttonHref={props.buttonHref}
    />
  ),
};
