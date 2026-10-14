import type { ComponentConfig } from "@puckeditor/core";
import { CtaBlock } from "./index";
import type { CtaProps } from "./index";

/**
 * Схема блока CTA для Puck.
 */
export const CtaSchema: ComponentConfig<CtaProps> = {
  fields: {
    title: { type: "text", label: "Заголовок" },
    subtitle: { type: "textarea", label: "Подзаголовок" },
    buttonText: { type: "text", label: "Текст кнопки" },
    buttonHref: { type: "text", label: "Ссылка кнопки" },
  },
  defaultProps: {
    title: "Готов запустить свою промо-страницу?",
    subtitle: "Оставь заявку и получи доступ к конструктору уже сейчас.",
    buttonText: "Оставить заявку",
    buttonHref: "#lead-form",
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
