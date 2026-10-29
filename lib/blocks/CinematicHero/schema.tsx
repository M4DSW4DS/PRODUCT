import type { ComponentConfig } from "@puckeditor/core";
import { CinematicHero, type CinematicHeroProps } from "./index";

export const CinematicHeroSchema: ComponentConfig<CinematicHeroProps> = {
  fields: {
    videoSrc: { type: "text", label: "Видео фон (videoSrc)" },
    posterSrc: { type: "text", label: "Постер фон (posterSrc)" },
    eyebrow: { type: "text", label: "Надзаголовок (eyebrow)" },
    title: { type: "text", label: "Заголовок (title)" },
    accentWord: { type: "text", label: "Акцентное слово (accentWord)" },
    subtitle: { type: "textarea", label: "Подзаголовок (subtitle)" },
    ctaLabel: { type: "text", label: "Текст кнопки (ctaLabel)" },
    ctaHref: { type: "text", label: "Ссылка кнопки (ctaHref)" },
    overlayOpacity: { type: "number", label: "Затемнение (overlayOpacity)", min: 0, max: 1, step: 0.05 },
    height: { type: "number", label: "Высота (height)", min: 400, max: 1200 },
    autoplay: {
      type: "radio",
      label: "Автовоспроизведение (autoplay)",
      options: [
        { label: "Вкл", value: "true" },
        { label: "Выкл", value: "false" },
      ],
    },
    loop: {
      type: "radio",
      label: "Зациклить (loop)",
      options: [
        { label: "Вкл", value: "true" },
        { label: "Выкл", value: "false" },
      ],
    },
    parallaxStrength: { type: "number", label: "Сила параллакса (parallaxStrength)", min: 0, max: 50 },
  },
  defaultProps: {
    posterSrc: "/hero/luxor-eclipse.png",
    title: "Полное солнечное затмение",
    accentWord: "затмение",
    eyebrow: "Египет · Луксор · 2027",
    subtitle: "Экспедиция в сердце древнего Египта",
    ctaLabel: "Забронировать место",
    ctaHref: "",
    overlayOpacity: 0.6,
    height: 720,
    autoplay: "true",
    loop: "true",
    parallaxStrength: 20,
  },
  render: CinematicHero,
};