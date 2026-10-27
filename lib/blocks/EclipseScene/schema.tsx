import type { ComponentConfig } from "@puckeditor/core";
import { EclipseScene } from "./index";
import type { EclipseSceneProps } from "./index";

export const eclipseSceneConfig: ComponentConfig<EclipseSceneProps> = {
  fields: {
    height: {
      type: "number",
      label: "Высота блока (px, занимаемое место на странице)",
      min: 200,
      max: 2000,
    },
    size: {
      type: "number",
      label: "Размер солнца (px)",
      min: 100,
      max: 1400,
    },
    top: {
      type: "number",
      label: "Позиция Y (% от верха контейнера)",
      min: 0,
      max: 100,
    },
    left: {
      type: "number",
      label: "Позиция X (% от левого края)",
      min: 0,
      max: 100,
    },
    progress: {
      type: "number",
      label: "Стадия затмения (0 — новолуние, 100 — полное затмение)",
      min: 0,
      max: 100,
    },
    autoPlay: {
      type: "radio",
      label: "Авто-проигрывание при появлении",
      options: [
        { label: "Выкл", value: "no" },
        { label: "Вкл", value: "yes" },
      ],
    },
    playDuration: {
      type: "number",
      label: "Длительность авто-проигрывания (сек)",
      min: 1,
      max: 30,
    },
    showCorona: {
      type: "radio",
      label: "Показывать корону (всполохи)",
      options: [
        { label: "Вкл", value: "yes" },
        { label: "Выкл", value: "no" },
      ],
    },
    darkenScene: {
      type: "radio",
      label: "Затемнять фон при затмении",
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
