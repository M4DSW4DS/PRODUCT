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
  showTimer = true,
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

    // Полное затемнение фона (100% чёрный) для перехода в Scene 1
    tl.to(".hero-blackout", { opacity: 1, duration: 1 }, 0);

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

      {/* Полное затемнение фона для перехода в Scene 1 */}
      <div className="absolute inset-0 z-20 bg-cosmic-black opacity-0 pointer-events-none hero-blackout" />

      {/* CSS Eclipse Sphere */}
      <div className="space-viewport">
        <div className="corona-flares" />
        <div className="sun-body" />
        <div className="moon-body" />
      </div>

      {/* HUD-панель */}
      <div className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-6 hero-desk-ui">
        <HeroHUD
          timerRef={timerRef}
          showTimer={showTimer}
        />
      </div>
    </section>
  );
}
