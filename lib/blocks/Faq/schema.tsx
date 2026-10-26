import type { ComponentConfig } from "@puckeditor/core";
import { FaqBlock } from "./index";
import type { FaqProps } from "./index";

/**
 * Схема блока FAQ для Puck. Массив вопросов-ответов.
 */
export const FaqSchema: ComponentConfig<FaqProps> = {
  fields: {
    title: { type: "text", contentEditable: true, label: "Заголовок секции" },
    items: {
      type: "array",
      label: "Вопросы",
      arrayFields: {
        question: { type: "text", contentEditable: true, label: "Вопрос" },
        answer: { type: "textarea", contentEditable: true, label: "Ответ" },
      },
      getItemSummary: (item, index) => item.question || `Вопрос ${(index ?? 0) + 1}`,
      defaultItemProps: () => ({ question: "Новый вопрос", answer: "Ответ на вопрос." }),
    },
  },
  defaultProps: {
    title: "Частые вопросы",
    items: [
      {
        question: "Сколько стоит?",
        answer: "Базовый функционал бесплатный. Тарифы уточняй у команды.",
      },
      {
        question: "Нужно ли программировать?",
        answer: "Нет, всё собирается визуально из готовых блоков.",
      },
    ],
  },
  render: (props) => <FaqBlock title={props.title} items={props.items} />,
};
