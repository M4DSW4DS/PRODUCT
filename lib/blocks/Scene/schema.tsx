import type { ComponentConfig } from "@puckeditor/core";
import { Scene } from "./index";
import type { SceneProps } from "./index";

export const SceneSchema: ComponentConfig<SceneProps> = {
  fields: {
    backgroundImage: { type: "text", label: "Фоновое изображение (URL)" },
    overlay: {
      type: "radio",
      label: "Затемнение фона",
      options: [
        { label: "Без наложения", value: "none" },
        { label: "Сумерки", value: "dusk" },
        { label: "Ночь", value: "night" },
      ],
    },
    content: {
      type: "slot",
      label: "Элементы внутри сцены (Текст, Сетки, Анимации)",
      allow: ["TextBlock", "GridBlock", "Features"],
    },
  },
  defaultProps: {
    backgroundImage: "",
    overlay: "none",
    content: [],
  },
  render: (props) => <Scene {...props} />,
};
