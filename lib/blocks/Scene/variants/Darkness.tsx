"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, staggerWords, reveal } from "@/lib/anim/primitives";
import type { SceneProps } from "../index";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Darkness(props: SceneProps) {
  const {
    index = 0,
    eyebrowPrefix,
    eyebrowSuffix,
    headingLine1,
    headingLead,
    headingAccent,
    quote,
    quoteAttribution,
    accent = "orange",
  } = props;

  const prefix = eyebrowPrefix || `SCENE ${String(index + 1).padStart(2, "0")}`;
  const eyebrow = `${prefix} // ${eyebrowSuffix ?? ""}`.trim();

  const hasHeadingPart2 = Boolean(headingLead || headingAccent);

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headingEl = headingRef.current;
    const quoteEl = quoteRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // prefers-reduced-motion: reduce — content visible immediately, no tweens.
      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)" },
        () => {
          const targets: HTMLElement[] = [];
          if (headingEl) targets.push(headingEl);
          if (quoteEl) targets.push(quoteEl);
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
          if (quoteEl) targets.push(quoteEl);

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

          // 2. Quote reveal
          if (quoteEl) {
            tl.add(() => reveal(quoteEl), "+=0.3");
          }
        }
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-anim="darkness"
      className="relative w-full flex flex-col items-center justify-center py-24 md:py-32 px-6 md:px-16 overflow-x-hidden"
    >
      {/* Eyebrow */}
      {eyebrow ? (
        <div className="font-mono text-xs uppercase tracking-[0.28em] text-eclipse-orange mb-8">
          {eyebrow}
        </div>
      ) : null}

      {/* Heading */}
      <h2
        ref={headingRef}
        data-anim="darkness"
        className="font-display font-bold text-white break-words leading-tight text-3xl md:text-5xl text-center max-w-2xl"
      >
        {headingLine1}
        {hasHeadingPart2 ? <br /> : null}
        {headingLead} {headingAccent ? (
          <span className="text-eclipse-orange">{headingAccent}</span>
        ) : null}
      </h2>

      {/* Quote */}
      {quote ? (
        <blockquote
          ref={quoteRef}
          data-anim="darkness"
          className="mt-10 border-l-4 border-eclipse-orange pl-6 italic text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl text-center"
        >
          {quote}
          {quoteAttribution ? (
            <footer className="mt-6 font-mono text-xs not-italic uppercase tracking-[0.2em] text-eclipse-orange/80">
              {quoteAttribution}
            </footer>
          ) : null}
        </blockquote>
      ) : null}
    </div>
  );
}
