"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircularWindow } from "./internal/CircularWindow";
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
  const windowRef = useRef<HTMLDivElement>(null);
  const cabinetRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Intro animation
    gsap.fromTo(".hero-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      }
    });

    // 1. Fade out text and timer
    tl.to(".hero-text, .hero-desk-ui", { opacity: 0, y: -20, duration: 1 }, 0);
    
    // 2. Expand the sphere (window) to cover the screen
    tl.to(".hero-circular-window", {
      scale: 25, // Massive scale to fill the screen
      duration: 2,
      ease: "power2.in"
    }, 0);

    // 3. Fade out the neon border as it fills the screen
    tl.to(".window-border", { opacity: 0, duration: 0.5 }, 1.5);
  }, { scope: rootRef });

  return (
    <section
      ref={rootRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-cosmic-black"
    >
      {/* Фоновый слой — шкаф Зорга */}
      <ZorgCabinet ref={cabinetRef} />

      {/* Круглое окно-прицел */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <CircularWindow ref={windowRef} imageSrc="/hero/egypt-orbit.jpg" />
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
        {ctaLabel ? (
          <a
            href={ctaHref || "#"}
            className="hero-cta inline-flex w-fit items-center border border-[var(--color-neon-cyan)]/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-neon-cyan)] transition-colors hover:bg-[var(--color-neon-cyan)]/10"
          >
            {ctaLabel}
          </a>
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
