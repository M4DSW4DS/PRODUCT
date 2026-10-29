import type { ComponentConfig } from "@puckeditor/core";
import { EclipseScene } from "./index";
import type { EclipseSceneProps } from "./index";

export const eclipseSceneConfig: ComponentConfig<EclipseSceneProps> = {
  fields: {
    height: {
      type: "number",
      label: "Высота (height)",
      min: 200,
      max: 2000,
    },
    size: {
      type: "number",
      label: "Размер (size)",
      min: 100,
      max: 1400,
    },
    top: {
      type: "number",
      label: "Смещение сверху (top)",
      min: 0,
      max: 100,
    },
    left: {
      type: "number",
      label: "Смещение слева (left)",
      min: 0,
      max: 100,
    },
    progress: {
      type: "number",
      label: "Прогресс (progress)",
      min: 0,
      max: 100,
    },
    autoPlay: {
      type: "radio",
      label: "Автовоспроизведение (autoPlay)",
      options: [
        { label: "Выкл", value: "no" },
        { label: "Вкл", value: "yes" },
      ],
    },
    playDuration: {
      type: "number",
      label: "Длительность (playDuration)",
      min: 1,
      max: 30,
    },
    showCorona: {
      type: "radio",
      label: "Показывать корону (showCorona)",
      options: [
        { label: "Вкл", value: "yes" },
        { label: "Выкл", value: "no" },
      ],
    },
    darkenScene: {
      type: "radio",
      label: "Затемнять сцену (darkenScene)",
      options: [
        { label: "Выкл", value: "no" },
        { label: "Вкл", value: "yes" },
      ],
    },
  },
  defaultProps: {
    height: 600,
    size: 440,
    top: 50,
    left: 50,
    progress: 0,
    autoPlay: false,
    playDuration: 4,
    showCorona: true,
    darkenScene: false,
  },
  render: (props) => (
    <EclipseScene
      height={props.height}
      size={props.size}
      top={props.top}
      left={props.left}
      progress={props.progress}
      autoPlay={props.autoPlay}
      playDuration={props.playDuration}
      showCorona={props.showCorona}
      darkenScene={props.darkenScene}
    />
  ),
};
