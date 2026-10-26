"use client";

import type { JSX, ReactNode } from "react";

export type HeadingProps = {
  title: ReactNode;
  level: "h1" | "h2" | "h3";
  align: "left" | "center" | "right";
};

/**
 * БЛОК — заголовок. Самодостаточный React-компонент.
 * Пример для валидации движка (Этап 2).
 */
export function HeadingBlock({ title, level, align }: HeadingProps): JSX.Element {
  const Tag = level;

  const classes = [
    "font-bold",
    "text-egyptian-gold",
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left",
    level === "h1" ? "text-hero" : "text-section-title",
  ].join(" ");

  return <Tag className={classes}>{title}</Tag>;
}
