import type { ComponentConfig } from "@puckeditor/core";
import { FeaturesBlock } from "./index";
import type { FeaturesProps } from "./index";

/**
 * Схема блока Features для Puck. Массив карточек-преимуществ.
 */
export const FeaturesSchema: ComponentConfig<FeaturesProps> = {
  fields: {
    title: { type: "text", contentEditable: true, label: "Заголовок секции" },
    items: {
      type: "array",
      label: "Преимущества",
      arrayFields: {
        icon: { type: "text", contentEditable: true, label: "Иконка (эмодзи)" },
        title: { type: "text", contentEditable: true, label: "Заголовок" },
        description: { type: "textarea", contentEditable: true, label: "Описание" },
      },
      getItemSummary: (item, index) => item.title || `Преимущество ${(index ?? 0) + 1}`,
      defaultItemProps: () => ({
        icon: "✦",
        title: "Новое преимущество",
        description: "Описание преимущества.",
      }),
    },
  },
  defaultProps: {
    title: "Почему выбирают нас",
    items: [
      {
        icon: "⚡",
        title: "Быстрый старт",
        description: "Собери страницу из готовых блоков за считанные минуты.",
      },
      {
        icon: "🎨",
        title: "Гибкий дизайн",
        description: "Настраивай цвета, тексты и картинки прямо в редакторе.",
      },
      {
        icon: "🚀",
        title: "Мгновенный деплой",
        description: "Публикуй результат одним кликом на Vercel.",
      },
    ],
  },
  render: (props) => <FeaturesBlock title={props.title} items={props.items} />,
};
