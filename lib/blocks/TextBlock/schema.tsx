import type { ComponentConfig } from "@puckeditor/core";
import { TextBlock } from "./index";
import type { TextBlockProps } from "./index";

export const TextBlockSchema: ComponentConfig<TextBlockProps> = {
  fields: {
    text: { type: "textarea", contentEditable: true, label: "Текст (text)" },
    size: { type: "radio", label: "Размер (size)", options: [ { label: "Мелкий", value: "sm" }, { label: "Базовый", value: "md" }, { label: "Крупный", value: "lg" }, { label: "Очень крупный", value: "xl" }, { label: "Заголовок", value: "2xl" } ] },
    color: { type: "radio", label: "Цвет (color)", options: [ { label: "Белый", value: "white" }, { label: "Золотой", value: "egyptian-gold" }, { label: "Неон", value: "neon-cyan" }, { label: "Оранжевый", value: "eclipse-orange" }, { label: "Серый", value: "zinc-400" } ] },
    align: { type: "radio", label: "Выравнивание (align)", options: [ { label: "Слева", value: "left" }, { label: "По центру", value: "center" }, { label: "Справа", value: "right" } ] },
    weight: { type: "radio", label: "Насыщенность (weight)", options: [ { label: "Обычный", value: "normal" }, { label: "Полужирный", value: "semibold" }, { label: "Жирный", value: "bold" } ] },
  },
  defaultProps: { text: "Новый текст", size: "md", color: "white", align: "left", weight: "normal" },
  render: (props) => <TextBlock {...props} />,
};