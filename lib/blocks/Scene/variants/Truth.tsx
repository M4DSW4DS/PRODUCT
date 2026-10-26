"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import type { SceneProps } from "../index";

const Key3D = dynamic(() => import("./Key3D").then((mod) => mod.Key3D), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

// Local shim for @gsap/react useGSAP (keeps dependency footprint empty)
function useGSAP(callback: () => void, config?: { scope?: any }) {
  useLayoutEffect(() => {
    const ctx = gsap.context(callback, config?.scope?.current ?? undefined);
    return () => ctx.revert();
  }, []);
}

export function Truth(props: SceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      });
      
      tl.fromTo(".truth-heading", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(".truth-lead", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
        
      if (props.svg_caption) {
        tl.fromTo(".truth-box", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
      }
    });
  }, { scope: rootRef });

  return (
    <div ref={rootRef} data-anim="truth" className="relative w-full min-h-screen flex flex-col justify-center py-24 px-6 overflow-hidden bg-cosmic-black">
      <Key3D />
      <div className="relative z-10 max-w-7xl mx-auto w-full md:grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 flex flex-col gap-6">
          {props.eyebrowSuffix && (
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-neon-cyan/70">
              SCENE 02 {props.eyebrowSuffix}
            </div>
          )}
          
          <h2 className="truth-heading font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            {props.headingLine1}
            {(props.headingLead || props.headingAccent) && <br />}
            {props.headingLead}{" "}
            {props.headingAccent && (
              <span className="text-neon-cyan">{props.headingAccent}</span>
            )}
          </h2>

          {props.lead && (
            <p className="truth-lead font-body text-lg md:text-xl text-white/70 max-w-md mt-4">
              {props.lead}
            </p>
          )}
        </div>

        <div className="md:col-span-6 mt-12 md:mt-0 flex justify-center md:justify-end">
          {props.svg_caption && (
            <div className="truth-box border border-neon-cyan/30 bg-cosmic-black/50 p-6 md:p-8 font-mono text-sm md:text-base text-neon-cyan max-w-md w-full shadow-[0_0_30px_rgba(0,229,255,0.1)]">
              {props.svg_caption}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
