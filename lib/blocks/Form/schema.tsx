import type { ComponentConfig } from "@puckeditor/core";
import { FormBlock } from "./index";
import type { FormProps } from "./index";

/**
 * Схема блока Form для Puck.
 */
export const FormSchema: ComponentConfig<FormProps> = {
  fields: {
    title: { type: "text", label: "Заголовок" },
    subtitle: { type: "textarea", label: "Подзаголовок" },
    submitText: { type: "text", label: "Текст кнопки" },
    successMessage: { type: "text", label: "Сообщение об успехе" },
    endpoint: { type: "text", label: "Endpoint отправки" },
  },
  defaultProps: {
    title: "Оставь заявку",
    subtitle: "Заполните форму и мы свяжемся с вами в ближайшее время.",
    submitText: "Отправить",
    successMessage: "Спасибо! Ваша заявка отправлена.",
    endpoint: "/api/leads",
  },
  render: (props) => (
    <FormBlock
      title={props.title}
      subtitle={props.subtitle}
      submitText={props.submitText}
      successMessage={props.successMessage}
      endpoint={props.endpoint}
    />
  ),
};
