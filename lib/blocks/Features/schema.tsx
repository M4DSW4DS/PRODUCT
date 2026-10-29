import type { ComponentConfig } from "@puckeditor/core";
import { Features } from "./index";
import type { FeaturesProps } from "./index";

export const FeaturesSchema: ComponentConfig<FeaturesProps> = {
  fields: {
    title: { type: "text", contentEditable: true, label: "Заголовок (title)" },
    speed: { type: "number", label: "Скорость (speed)", min: 0.5, max: 10 },
    items: {
      type: "array",
      label: "Элементы (items)",
      getItemSummary: (item) => item.title || "Новая карточка",
      defaultItemProps: {
        icon: "⚡",
        title: "Новое преимущество",
        description: "Короткое описание",
        modalText: "Развернутое описание для модального окна.",
      },
      arrayFields: {
        icon: { type: "text", label: "Иконка (icon)" },
        title: { type: "text", label: "Заголовок (title)" },
        description: { type: "textarea", label: "Описание (description)" },
        modalText: { type: "textarea", label: "Текст модалки (modalText)" },
      },
    },
  },
  defaultProps: {
    title: "Почему выбирают нас",
    speed: 1.5,
    items: [
      { icon: "⚡", title: "Быстрый старт", description: "Собери страницу из готовых блоков за считанные минуты.", modalText: "Начни собирать свой лендинг прямо сейчас, используя готовые пресеты." },
      { icon: "🎨", title: "Гибкий дизайн", description: "Настраивай цвета, тексты и картинки прямо в редакторе.", modalText: "Полный контроль над внешним видом: шрифты, отступы, цвета и фоны." },
      { icon: "🚀", title: "Мгновенный деплой", description: "Публикуй результат одним кликом.", modalText: "Забудь про долгие сборки и FTP. Твой сайт обновляется в реальном времени." },
      { icon: "🔒", title: "Надежность", description: "Твои данные под надежной защитой.", modalText: "Мы используем современное шифрование и регулярные бэкапы." },
    ],
  },
  render: (props) => <Features {...props} />,
};