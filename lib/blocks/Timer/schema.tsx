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
    endMessage: { type: "text", label: "Сообщение после завершения (что показать, когда таймер дойдёт до нуля)" },
    hint_text: { type: "text", label: "Подсказка для UTC+3" },
    accent_color: { type: "text", label: "Акцентный цвет (#00e5ff)" },
    post_countdown_text: { type: "text", label: "Текст после отсчёта" },
  },
  defaultProps: {
    title: "До запуска осталось",
    targetDate: "2030-01-01T00:00",
    endMessage: "Время вышло!",
    hint_text: "Ты в UTC+3 — та же зона, что Луксор.",
    accent_color: "#00e5ff",
    post_countdown_text: "Отсчёт завершён",
  },
  render: (props) => (
    <TimerBlock
      title={props.title}
      targetDate={props.targetDate}
      endMessage={props.endMessage}
      hint_text={props.hint_text}
      accent_color={props.accent_color}
      post_countdown_text={props.post_countdown_text}
    />
  ),
};
