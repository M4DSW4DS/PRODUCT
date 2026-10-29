"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { ZorgCabinet } from "./internal/ZorgCabinet";

export type HeroProps = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  quote?: { text?: ReactNode; author?: ReactNode } | string;
  cta?: { label?: ReactNode; href?: string } | string;
  accentWord?: ReactNode;
  accentColor?: string;
  showTimer?: boolean;
  titleSize?: "sm" | "md" | "lg" | "xl";
  subtitleSize?: "sm" | "md" | "lg";
};

const TITLE_SIZE: Record<string, string> = {
  sm: "text-3xl md:text-4xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-7xl",
  xl: "text-6xl md:text-8xl",
};

const SUBTITLE_SIZE: Record<string, string> = {
  sm: "text-base md:text-lg",
  md: "text-lg md:text-xl",
  lg: "text-xl md:text-2xl",
};

export function Hero(props: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const scrollRef = useRef<number | null>(null);

  // prefers-reduced-motion check
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // IntersectionObserver for entry animation
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Parallax on scroll using requestAnimationFrame
  useEffect(() => {
    if (reduced) return;

    const el = rootRef.current;
    if (!el) return;

    const onScroll = () => {
      if (reduced) return;
      cancelAnimationFrame(scrollRef.current!);
      scrollRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / viewportH));
        // Parallax: translate Y by scrollProgress * -20%
        const parallaxY = scrollProgress * -20;
        // Apply to sun/corona elements
        const sun = document.querySelector(".sun-body");
        const corona = document.querySelector(".corona-flares");
        if (sun) {
          sun.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
        }
        if (corona) {
          corona.style.transform = `translate3d(0, ${parallaxY * 0.5}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollRef.current!);
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-cosmic-black"
      style={{
        transition: reduced ? "none" : "",
      }}
    >
      <ZorgCabinet />

      {/* Сфера солнца — фиксированные дефолты, без админки */}
      <div
        className="space-viewport absolute z-20 pointer-events-none mix-blend-mode-screen"
        style={{
          top: "40%",
          left: "50%",
          width: "400px",
          height: "400px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="corona-flares" />
        <div
          className="sun-body relative absolute inset-0 rounded-full"
          style={{
            boxShadow: "0 0 100px rgba(0, 229, 255, 0.75)",
            transition: reduced ? "transform 0s" : "transform 600ms ease-out",
          }}
        />
        <div className="moon-body" />
      </div>

      <div className="hero-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full max-w-4xl px-6 pointer-events-auto">
        {props.eyebrow && (
          <p
            className={`
              font-mono text-sm tracking-widest text-egyptian-gold mb-4
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              transition-all duration-800 ease-out
            `}
          >
            {props.eyebrow}
          </p>
        )}
        {props.title && (
          <h1
            className={`
              ${TITLE_SIZE[props.titleSize || "lg"]}
              mb-6 leading-tight
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
              transition-all duration-800 ease-out
            `}
          >
            {props.title}
            {props.accentWord && (
              <span
                className={props.accentColor ? ACCENT_MAP[props.accentColor] : ""}
              >
                {props.accentWord}
              </span>
            )}
          </h1>
        )}
        {props.subtitle && (
          <p
            className={`
              ${SUBTITLE_SIZE[props.subtitleSize || "md"]}
              text-white/80 mb-8 max-w-2xl mx-auto
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              transition-all duration-800 ease-out delay-200
            `}
          >
            {props.subtitle}
          </p>
        )}
        {props.quoteText && (
          <div className="mb-8">
            <p className="font-display italic text-xl text-neon-cyan">
              {props.quoteText}
            </p>
            {props.quoteAuthor && (
              <p className="font-mono text-xs text-white/50 mt-2">
                {props.quoteAuthor}
              </p>
            )}
          </div>
        )}
        {props.ctaLabel && props.ctaHref && (
          <a
            href={props.ctaHref || "#"}
            className="inline-block border-2 border-egyptian-gold text-egyptian-gold px-8 py-3 font-mono uppercase tracking-widest hover:bg-egyptian-gold hover:text-black transition-colors pointer-events-auto"
          >
            {props.ctaLabel}
          </a>
        )}
      </div>

      <div className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-6 hero-desk-ui">
        <div>{props.showTimer !== false && <div>Timer</div>}</div>
      </div>

      <div className="hero-dark-overlay absolute inset-0 z-20 bg-cosmic-black opacity-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent z-20 pointer-events-none" />
    </section>
  );
}