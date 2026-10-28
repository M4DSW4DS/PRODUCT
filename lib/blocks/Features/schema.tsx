import type { ComponentConfig } from "@puckeditor/core";
import { Features } from "./index";
import type { FeaturesProps } from "./index";

export const FeaturesSchema: ComponentConfig<FeaturesProps> = {
  fields: {
    title: { type: "text", contentEditable: true, label: "Заголовок блока" },
    speed: { type: "number", label: "Скорость прокрутки (пиксели/кадр)", min: 0.5, max: 10 },
    items: {
      type: "array",
      label: "Карточки (преимущества)",
      getItemSummary: (item) => item.title || "Новая карточка",
      defaultItemProps: {
        icon: "⚡",
        title: "Новое преимущество",
        description: "Короткое описание",
        modalText: "Развернутое описание для модального окна.",
      },
      arrayFields: {
        icon: { type: "text", label: "Иконка (эмодзи)" },
        title: { type: "text", label: "Заголовок" },
        description: { type: "textarea", label: "Краткое описание (на карточке)" },
        modalText: { type: "textarea", label: "Развернутый текст (в модальном окне)" },
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