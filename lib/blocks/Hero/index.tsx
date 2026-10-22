"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircularWindow } from "./internal/CircularWindow";
import { ZorgCabinet } from "./internal/ZorgCabinet";
import { HeroHUD } from "./internal/HeroHUD";
import { fadeUp } from "@/lib/anim/primitives";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // gsap.context гарантирует cleanup всех твинов и ScrollTrigger при unmount.
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { reduce, mobile } = context.conditions as {
            reduce: boolean;
            mobile: boolean;
          };

          // Уважаем системную настройку — никаких анимаций.
          if (reduce) return;

          fadeUp(".hero-title, .hero-subtitle, .hero-cta");

          const windowEl = windowRef.current;
          const cabinetEl = cabinetRef.current;
          const timerEl = timerRef.current;

          // Смещения таймера: фиксированные пиксели вместо vw/vh,
          // чтобы не ломать мобильную вёрстку.
          const timerX = mobile ? 0 : -72;
          const timerY = mobile ? 56 : -140;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          if (cabinetEl) {
            tl.to(cabinetEl, { opacity: 0, scale: 1.6, ease: "power1.inOut" }, 0);
          }

          if (windowEl) {
            tl.to(windowEl, { scale: 14, transformOrigin: "center center", ease: "power2.in" }, 0);
            tl.to(".hero-circular-window img", { opacity: 0, ease: "power1.in" }, 0.35);
          }

          // Handoff: reveal global eclipse sun at end of pin
          tl.to(".eclipse-anchor", { opacity: 1, duration: 0.1 }, "+=1.8");
          tl.set(".hero-circular-window", { visibility: "hidden" }, "+=1.9");

          if (timerEl) {
            tl.fromTo(
              timerEl,
              { scale: 1.25, x: timerX, y: timerY },
              { scale: 1, x: 0, y: 0, ease: "none", duration: 0.6 },
              0.25
            );
          }
        }
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden bg-cosmic-black px-6 py-24 md:flex-row md:gap-12 md:py-32"
    >
      {/* Фоновый слой — шкаф Зорга */}
      <ZorgCabinet ref={cabinetRef} />

      {/* Круглое окно-прицел */}
      <div className="relative z-10 flex w-full justify-center md:absolute md:left-8 md:top-1/2 md:w-auto md:-translate-y-1/2 md:justify-start lg:left-16">
        <CircularWindow ref={windowRef} imageSrc="/hero/zorg-window.webp" />
      </div>

      {/* Левый столбец: заголовок, подзаголовок, CTA */}
      <div className="relative z-20 flex w-full flex-col items-center gap-5 text-center md:absolute md:left-8 md:top-1/2 md:w-[24rem] md:-translate-y-1/2 md:items-start md:text-left lg:left-16 lg:w-[30rem]">
        {title ? (
          <h1 className="hero-title font-display text-hero font-bold text-egyptian-gold">
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <p className="hero-subtitle max-w-xl text-[length:var(--font-size-body)] leading-relaxed text-zinc-300">
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

      {/* Декоративная подсказка прокрутки */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[length:var(--font-size-hud)] uppercase tracking-[0.4em] text-zinc-600">
        Scroll
      </div>
    </section>
  );
}
