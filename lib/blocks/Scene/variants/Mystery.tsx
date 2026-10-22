"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { DUR, EASE } from "@/lib/anim/primitives";
import type { SceneProps } from "../index";

/**
 * useLayoutEffect выполняется до отрисовки — это убирает «вспышку» готового
 * контента перед стартом анимации. В SSR хук недоступен, поэтому подменяем его
 * на useEffect (на сервере эффекты не выполняются вовсе).
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Маппинг акцентного цвета сцены на Tailwind-токен (@theme в app/globals.css).
 * gold → --color-egyptian-gold, cyan → --color-neon-cyan,
 * orange → --color-eclipse-orange, white → базовый text-white.
 */
const ACCENT_CLASS: Record<NonNullable<SceneProps["accent"]>, string> = {
  gold: "text-egyptian-gold",
  cyan: "text-neon-cyan",
  orange: "text-eclipse-orange",
  white: "text-white",
};

function accentClass(accent?: SceneProps["accent"]): string {
  return ACCENT_CLASS[accent ?? "gold"];
}

/**
 * Сцена 1 — «Тайна» (Mystery).
 *
 * Вёрстка: центрированная колонка внутри <section> родителя.
 * Порядок: eyebrow → заголовок (3 части) → лид → цитата → автор → слот таймера.
 * Таймер (задача T) будет перенесён в слот позже — здесь только разметка.
 */
export function Mystery(props: SceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  const {
    index = 0,
    eyebrowPrefix,
    eyebrowSuffix,
    headingLine1,
    headingLead,
    headingAccent,
    lead,
    quote,
    quoteAttribution,
  } = props;

  const prefix = eyebrowPrefix || `SCENE ${String(index + 1).padStart(2, "0")}`;
  const eyebrow = `${prefix} // ${eyebrowSuffix ?? ""}`.trim();

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headingEl = headingRef.current;
    const leadEl = leadRef.current;
    const quoteEl = quoteRef.current;
    const animated = [headingEl, leadEl, quoteEl].filter(
      (el): el is HTMLHeadingElement | HTMLParagraphElement | HTMLQuoteElement =>
        el !== null
    );

    // gsap.context гарантирует cleanup всех твинов (и matchMedia) при unmount.
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Уважаем системную настройку: контент виден сразу, без твинов.
      // gsap.matchMedia выполняет колбэк только когда ВСЕ условия истинны,
      // поэтому «reduce» и «motion» разведены по отдельным веткам.
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
        },
        () => {
          gsap.set(animated, { opacity: 1, y: 0, filter: "none" });
        }
      );

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
        },
        () => {
          // Прячем элементы ДО первой отрисовки (useLayoutEffect), иначе виден
          // «вспышечный» кадр готового контента: gsap.from стартует с opacity 0
          // только в момент запуска твина, то есть позже отрисовки React.
          gsap.set(animated, { opacity: 0 });

          const tl = gsap.timeline();

          // Явные fromTo: конечные значения заданы явно, поэтому результат
          // не зависит от текущего состояния элемента.
          if (headingEl) {
            tl.fromTo(
              headingEl,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: DUR.base, ease: EASE.soft },
              0
            );
          }
          if (leadEl) {
            tl.fromTo(
              leadEl,
              { opacity: 0, filter: "blur(8px)" },
              {
                opacity: 1,
                filter: "blur(0px)",
                duration: DUR.reveal,
                ease: EASE.cinema,
              },
              DUR.base + 0.15
            );
          }
          if (quoteEl) {
            tl.fromTo(
              quoteEl,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: DUR.base, ease: EASE.soft },
              DUR.base + 0.15 + DUR.reveal
            );
          }
        }
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  const hasHeadingPart2 = Boolean(headingLead || headingAccent);

  return (
    <div
      ref={rootRef}
      data-variant="mystery"
      className="flex w-full flex-col items-center gap-6 px-6 py-24 text-center md:mx-auto md:max-w-3xl md:py-32"
    >
      {eyebrow ? (
        <div
          className={`font-mono text-xs uppercase tracking-[0.28em] ${accentClass(
            props.accent
          )}`}
        >
          {eyebrow}
        </div>
      ) : null}

      <h2
        ref={headingRef}
        data-anim="mystery"
        className="font-display text-[length:var(--font-size-h1)] font-bold leading-[1.1] text-white break-words"
      >
        {headingLine1}
        {hasHeadingPart2 ? <br /> : null}
        {headingLead}{" "}
        {headingAccent ? (
          <span className={accentClass(props.accent)}>{headingAccent}</span>
        ) : null}
      </h2>

      {lead ? (
        <p
          ref={leadRef}
          data-anim="mystery"
          className="w-full max-w-2xl break-words text-base leading-relaxed text-zinc-300 md:text-lg"
        >
          {lead}
        </p>
      ) : null}

      {quote ? (
        <blockquote
          ref={quoteRef}
          data-anim="mystery"
          className="w-full max-w-2xl break-words border-l-2 border-egyptian-gold pl-4 text-left italic text-zinc-300"
        >
          {quote}
          {quoteAttribution ? (
            <footer className="mt-3 font-mono text-xs not-italic uppercase tracking-[0.2em] text-egyptian-gold/70">
              {quoteAttribution}
            </footer>
          ) : null}
        </blockquote>
      ) : null}

      {/* Слот глобального таймера (задача T). Пока — визуальный плейсхолдер. */}
      <div data-timer-slot="mystery" className="w-full" aria-hidden="true" />
    </div>
  );
}
