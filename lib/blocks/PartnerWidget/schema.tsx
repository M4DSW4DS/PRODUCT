import type { ComponentConfig } from "@puckeditor/core";
import { PartnerWidgetBlock } from "./index";
import type { PartnerWidgetProps } from "./index";

/**
 * Схема блока PartnerWidget для Puck.
 * Контейнер iframe-виджета TimePad (мы — витрина, не оператор ПД).
 */
export const PartnerWidgetSchema: ComponentConfig<PartnerWidgetProps> = {
  fields: {
    title: { type: "text", label: "Заголовок" },
    subtitle: { type: "textarea", label: "Подзаголовок" },
    src: { type: "text", label: "URL виджета (iframe)" },
    height: { type: "text", label: "Высота iframe (px)" },
    fallbackUrl: { type: "text", label: "Резервная ссылка" },
    fallbackText: { type: "text", label: "Текст резервной ссылки" },
  },
  defaultProps: {
    title: "Регистрация на событие",
    subtitle:
      "Билеты, оплата и согласие на обработку персональных данных — внутри виджета TimePad.",
    src: "",
    height: "620",
    fallbackUrl: "https://timepad.ru/",
    fallbackText: "Открыть на TimePad",
  },
  render: (props) => (
    <PartnerWidgetBlock
      title={props.title}
      subtitle={props.subtitle}
      src={props.src}
      height={props.height}
      fallbackUrl={props.fallbackUrl}
      fallbackText={props.fallbackText}
    />
  ),
};