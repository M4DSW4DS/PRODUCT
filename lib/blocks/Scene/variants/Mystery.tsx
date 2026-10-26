"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE } from "@/lib/anim/primitives";
import type { SceneProps } from "../index";

gsap.registerPlugin(ScrollTrigger);

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

          gsap.from(".scene-text", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            scrollTrigger: { trigger: root, start: "top 80%" },
          });
        }
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  const hasHeadingPart2 = Boolean(headingLead || headingAccent);

  return (
    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto scene-text px-6">
      {props.eyebrowSuffix && <p className="font-mono text-sm tracking-widest text-egyptian-gold mb-4">{props.eyebrowPrefix || "SCENE 01"} {props.eyebrowSuffix}</p>}
      <h2 className="font-display text-4xl md:text-6xl text-white mb-6">
        {props.headingLine1} <br />
        <span className="text-egyptian-gold">{props.headingLead} {props.headingAccent}</span>
      </h2>
      {props.lead && <p className="text-lg text-white/80 mb-8">{props.lead}</p>}
      {props.quote && (
        <div className="border-l-2 border-egyptian-gold pl-4 text-left">
          <p className="font-display italic text-xl text-neon-cyan">«{props.quote}»</p>
          {props.quoteAttribution && <p className="font-mono text-xs text-white/50 mt-2">— {props.quoteAttribution}</p>}
        </div>
      )}
    </div>
  );
}
