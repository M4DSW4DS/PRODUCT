import type { ComponentConfig } from "@puckeditor/core";
import { EclipseAnimation } from "./index";
import type { EclipseAnimationProps } from "./index";

export const EclipseAnimationSchema: ComponentConfig<EclipseAnimationProps> = {
  fields: {
    size: { type: "number", label: "Размер диска (px)", min: 100, max: 600 },
    autoPlay: {
      type: "radio",
      label: "Авто-проигрывание",
      options: [
        { label: "Вкл", value: true },
        { label: "Выкл", value: false },
      ],
    },
    speed: { type: "number", label: "Скорость смены фазы (мс)", min: 500, max: 5000 },
  },
  defaultProps: {
    size: 350,
    autoPlay: true,
    speed: 1500,
  },
  render: (props) => <EclipseAnimation {...props} />,
};