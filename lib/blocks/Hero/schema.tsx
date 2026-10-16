import type { ComponentConfig } from "@puckeditor/core";
import { HeroBlock } from "./index";
import type { HeroProps } from "./index";
import { DEFAULT_COUNTDOWN_TIMEZONES } from "@/lib/components/CountdownTimer";

/**
 * Схема блока Hero для Puck (поля и значения по умолчанию).
 */
export const HeroSchema: ComponentConfig<HeroProps> = {
  fields: {
    eyebrow: { type: "text", label: "Надзаголовок" },
    title: { type: "text", label: "Заголовок" },
    subtitle: { type: "textarea", label: "Подзаголовок" },
    ctaText: { type: "text", label: "Текст кнопки" },
    ctaHref: { type: "text", label: "Ссылка кнопки" },
    align: {
      type: "radio",
      label: "Выравнивание",
      options: [
        { label: "Слева", value: "left" },
        { label: "Центр", value: "center" },
      ],
    },
    imageMode: {
      type: "radio",
      label: "Фон",
      options: [
        { label: "Без фона", value: "none" },
        { label: "Своя ссылка", value: "url" },
        { label: "AI (Pollinations)", value: "ai" },
      ],
    },
    imageUrl: { type: "text", label: "URL фона" },
    imagePrompt: { type: "textarea", label: "Промпт фона (AI)" },
    imageSeed: { type: "number", label: "Seed фона" },
    timer: {
      type: "object",
      label: "Таймер (CountdownTimer)",
      objectFields: {
        enabled: {
          type: "radio",
          label: "Показывать таймер",
          options: [
            { label: "Да", value: "yes" },
            { label: "Нет", value: "no" },
          ],
        },
        target_utc: { type: "text", label: "Целевая точка UTC (ISO)" },
        position: {
          type: "radio",
          label: "Позиция",
          options: [
            { label: "Под лидом", value: "below_lead" },
            { label: "Скрыт", value: "hidden" },
          ],
        },
        timezones: {
          type: "array",
          label: "Пояса (табы)",
          arrayFields: {
            label: { type: "text", label: "Подпись" },
            tz: { type: "text", label: "IANA-пояс (Europe/Moscow)" },
          },
          getItemSummary: (item, index) => item.label || `Пояс ${(index ?? 0) + 1}`,
          defaultItemProps: () => ({ label: "Москва", tz: "Europe/Moscow" }),
        },
        hint_text: { type: "text", label: "Подсказка для UTC+3" },
        accent_color: { type: "text", label: "Акцентный цвет (#00e5ff)" },
        post_countdown_text: { type: "text", label: "Текст после отсчёта" },
      },
    },
  },
  defaultProps: {
    eyebrow: "Дизайн-лаборатория",
    title: "Создай промо-страницу мечты",
    subtitle: "Визуальный редактор, Pollinations-картинки и готовая посадочная за минуты.",
    ctaText: "Начать бесплатно",
    ctaHref: "#register",
    align: "center",
    imageMode: "none",
    imageUrl: "",
    imagePrompt: "",
    imageSeed: 42,
    timer: {
      enabled: true,
      target_utc: "2027-08-02T08:40:00Z",
      position: "below_lead",
      timezones: DEFAULT_COUNTDOWN_TIMEZONES,
      hint_text: "Ты в UTC+3 — та же зона, что Луксор.",
      accent_color: "#00e5ff",
      post_countdown_text: "Затмение началось. Ты успел?",
    },
  },
  render: (props) => (
    <HeroBlock
      eyebrow={props.eyebrow}
      title={props.title}
      subtitle={props.subtitle}
      ctaText={props.ctaText}
      ctaHref={props.ctaHref}
      align={props.align}
      imageMode={props.imageMode}
      imageUrl={props.imageUrl}
      imagePrompt={props.imagePrompt}
      imageSeed={props.imageSeed}
      timer={props.timer}
    />
  ),
};
