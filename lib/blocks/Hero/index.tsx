"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ZorgCabinet } from "./internal/ZorgCabinet";
import { HeroHUD } from "./internal/HeroHUD";

gsap.registerPlugin(ScrollTrigger);

// Local shim for @gsap/react useGSAP (keeps dependency footprint empty)
function useGSAP(callback: () => void, config?: { scope?: any }) {
  useLayoutEffect(() => {
    const ctx = gsap.context(callback, config?.scope?.current ?? undefined);
    return () => ctx.revert();
  }, []);
}

/** Пропсы блока Hero (кинематографичная версия). */
export type HeroProps = {
  /** Надзаголовок. */
  eyebrow: string;
  /** Главный заголовок. */
  title: string;
  /** Подзаголовок. */
  subtitle: string;
  /** Цитата Зорга. */
  quote: string;
  /** Автор цитаты. */
  quoteAttribution: string;
  /** Текст CTA-кнопки. */
  ctaLabel: string;
  /** Ссылка CTA. */
  ctaHref: string;
  /** Подпись HUD-строки состояния. */
  hudLabel: string;
  /** Подпись HUD-подвала. */
  hudFooter: string;
  /** Показывать обратный отсчёт. */
  showTimer: boolean;
  /** Показывать календарный блок. */
  showCalendar: boolean;
};

/**
 * БЛОК — Hero (кинематографичная версия).
 *
 * Структура: круглое окно-прицел + фоновый шкаф Зорга + HUD-панель.
 * Пиннится на 150% высоты вьюпорта; окно «отъезжает» с zoom 14 → 1.
 */
export function Hero({
  eyebrow = "",
  title = "",
  subtitle = "",
  quote = "",
  quoteAttribution = "MISTER ZORG",
  ctaLabel = "",
  ctaHref = "",
  hudLabel = "System Ready // Countdown",
  hudFooter = "ORBIT · EARTH · EGYPT",
  showTimer = true,
  showCalendar = true,
}: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const cabinetRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Intro animation
    gsap.fromTo(".hero-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      }
    });

    // Fade out text, HUD, and Zorg background
    tl.to(".hero-text, .hero-desk-ui, .zorg-cabinet", { opacity: 0, duration: 1 }, 0);

    // Brighten the Sun (fade in to full opacity)
    tl.to(".sun-body", { opacity: 1, duration: 2, ease: "power2.inOut" }, 0);
  }, { scope: rootRef });

  return (
    <section
      ref={rootRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-cosmic-black"
    >
      {/* Фоновый слой — шкаф Зорга */}
      <ZorgCabinet ref={cabinetRef} />

      {/* CSS Eclipse Sphere */}
      <div className="space-viewport">
        <div className="corona-flares" />
        <div className="sun-body" />
        <div className="moon-body" />
      </div>

      {/* Левый столбец: заголовок, подзаголовок, CTA */}
      <div className="relative z-20 flex w-full flex-col items-center gap-5 text-center md:absolute md:left-8 md:top-1/2 md:w-[24rem] md:-translate-y-1/2 md:items-start md:text-left lg:left-16 lg:w-[30rem]">
        {title ? (
          <h1 className="hero-title hero-text font-display text-hero font-bold text-egyptian-gold">
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <p className="hero-subtitle hero-text max-w-xl text-[length:var(--font-size-body)] leading-relaxed text-zinc-300">
            {subtitle}
          </p>
        ) : null}
      </div>

      {/* HUD-панель */}
      <div className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-6 hero-desk-ui">
        <HeroHUD
          timerRef={timerRef}
          eyebrow={eyebrow}
          quote={quote}
          quoteAttribution={quoteAttribution}
          hudLabel={hudLabel}
          hudFooter={hudFooter}
          showTimer={showTimer}
          showCalendar={showCalendar}
        />
      </div>

      {/* Декоративная подсказка прокрутки */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[length:var(--font-size-hud)] uppercase tracking-[0.4em] text-zinc-600">
        Scroll
      </div>
    </section>
  );
}
