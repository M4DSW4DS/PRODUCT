import type { ComponentConfig } from "@puckeditor/core";
import { Scene } from "./index";
import type { SceneProps } from "./index";

export const SceneSchema: ComponentConfig<SceneProps> = {
  fields: {
    backgroundImage: { type: "text", label: "Фоновое изображение (backgroundImage)" },
    overlay: {
      type: "radio",
      label: "Затемнение (overlay)",
      options: [
        { label: "Без наложения", value: "none" },
        { label: "Сумерки", value: "dusk" },
        { label: "Ночь", value: "night" },
      ],
    },
    content: {
      type: "slot",
      label: "Содержимое (content)",
      allow: ["TextBlock", "GridBlock", "Features", "CinematicHero"],
    },
  },
  defaultProps: {
    backgroundImage: "",
    overlay: "none",
    content: [],
  },
  render: (props) => <Scene {...props} />,
};
