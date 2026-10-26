"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, staggerWords, reveal } from "@/lib/anim/primitives";
import type { SceneProps } from "../index";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Fifth(props: SceneProps) {
  const {
    index = 0,
    eyebrowPrefix,
    eyebrowSuffix,
    headingLine1,
    headingLead,
    headingAccent,
    lead,
    ctaLabel,
    ctaHref,
    microcopy,
    accent = "white",
  } = props;

  const prefix = eyebrowPrefix || `SCENE ${String(index + 1).padStart(2, "0")}`;
  const eyebrow = `${prefix} // ${eyebrowSuffix ?? ""}`.trim();

  const hasHeadingPart2 = Boolean(headingLead || headingAccent);

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headingEl = headingRef.current;
    const leadEl = leadRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // prefers-reduced-motion: reduce — content visible immediately, no tweens.
      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)" },
        () => {
          const targets: HTMLElement[] = [];
          if (headingEl) targets.push(headingEl);
          if (leadEl) targets.push(leadEl);
          gsap.set([...targets], {
            opacity: 1,
            y: 0,
            filter: "none",
          });
        }
      );

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)" },
        () => {
          const targets: HTMLElement[] = [];
          if (headingEl) targets.push(headingEl);
          if (leadEl) targets.push(leadEl);

          gsap.set([...targets], { opacity: 0, y: 20 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
            },
          });

          // 1. Heading staggerWords
          if (headingEl) {
            tl.add(() => staggerWords(headingEl), 0);
          }

          // 2. Lead reveal
          if (leadEl) {
            tl.add(() => reveal(leadEl), "+=0.2");
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

  return (
    <div
      id="scene-fifth"
      ref={rootRef}
      data-anim="fifth"
      className="relative w-full min-h-screen flex flex-col justify-center py-24 px-6 overflow-hidden bg-cosmic-black"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">

      {/* Eyebrow */}
      {eyebrow ? (
        <div className="font-mono text-xs uppercase tracking-[0.28em] text-white mb-8">
          {eyebrow}
        </div>
      ) : null}

      {/* Heading */}
      <h2
        ref={headingRef}
        data-anim="fifth"
        className="scene-text font-display font-bold text-white break-words leading-tight text-3xl md:text-5xl max-w-2xl"
      >
        {headingLine1}
        {hasHeadingPart2 ? <br /> : null}
        {headingLead} {headingAccent ? (
          <span className="text-white">{headingAccent}</span>
        ) : null}
      </h2>

      {/* Lead */}
      {lead ? (
        <p
          ref={leadRef}
          data-anim="fifth"
          className="scene-text mt-6 text-base leading-relaxed text-zinc-300 md:text-lg max-w-xl"
        >
          {lead}
        </p>
      ) : null}

      {/* CTA Button */}
      {ctaLabel && ctaHref ? (
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white text-[#0a0a0f] font-mono font-semibold uppercase tracking-widest px-8 py-4 text-sm md:text-base hover:bg-white/90 transition-colors"
        >
          {ctaLabel}
        </a>
      ) : null}

      {/* Microcopy */}
      {microcopy ? (
        <p className="mt-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500">
          {microcopy}
        </p>
      ) : null}
      </div>
    </div>
  );
}
