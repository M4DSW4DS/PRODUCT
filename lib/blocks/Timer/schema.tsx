import type { ComponentConfig } from "@puckeditor/core";
import { TimerBlock } from "./index";
import type { TimerProps } from "./index";

/**
 * Схема блока Timer для Puck.
 */
export const TimerSchema: ComponentConfig<TimerProps> = {
  fields: {
    title: { type: "text", label: "Заголовок" },
    targetDate: { type: "text", label: "Целевая дата (ISO)" },
    endMessage: { type: "text", label: "Сошение по истечении" },
  },
  defaultProps: {
    title: "До запуска осталось",
    targetDate: "2030-01-01T00:00",
    endMessage: "Время вышло!",
  },
  render: (props) => (
    <TimerBlock
      title={props.title}
      targetDate={props.targetDate}
      endMessage={props.endMessage}
    />
  ),
};
