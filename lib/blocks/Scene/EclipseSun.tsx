"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EclipseSun() {
  const rootRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchor = rootRef.current;
    const mask = maskRef.current;
    const sun = sunRef.current;

    const ctx = gsap.context(() => {
      if (!anchor || !mask || !sun) return;

      // 1. Fade in the sun when Hero pin ends
      gsap.fromTo(anchor,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: "#scene-hero",
            start: "bottom bottom", // Hero pin ends
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Master progress for eclipse mask
      gsap.to(mask, {
        "--eclipse": "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 3. Flash on Scene 7
      const sceneFifth = document.querySelector("#scene-fifth");
      if (sceneFifth) {
        gsap.to(sun, {
          scrollTrigger: {
            trigger: sceneFifth,
            start: "top center",
            onEnter: () => {
              gsap.to(sun, {
                filter: "drop-shadow(0 0 40px rgba(0,229,255,1))",
                duration: 0.3,
                yoyo: true,
                repeat: 1,
              });
            },
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="eclipse-anchor fixed top-[8vh] right-[6vw] z-30 pointer-events-none"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <div
        ref={sunRef}
        className="sun-core relative w-[140px] h-[140px] rounded-full overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#fff4c8,#c9a96e_60%,#7a5a2a)] shadow-[0_0_60px_rgba(201,169,110,0.6)]"
      >
        <div ref={maskRef} className="eclipse-mask absolute inset-0 rounded-full" />
      </div>
      <div className="font-mono text-[9px] tracking-[0.3em] text-neon-cyan/60 mt-2 text-right">
        OBSCURATION <span className="text-neon-cyan" id="eclipse-readout">0%</span>
      </div>
    </div>
  );
}