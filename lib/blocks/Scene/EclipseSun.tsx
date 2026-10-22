"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Глобальноеoverlay «Затмённое Солнце».
 * Фиксировано в правом верхнем углу, появляется после хенд-off из Hero.
 * Маска затмения растёт по мере скролла через все сцены (0% → 100% --eclipse).
 * На Сцене 7 (#scene-fifth) случается вспышка солнца.
 */
export function EclipseSun() {
  const maskRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maskEl = maskRef.current;
    const ctx = gsap.context(() => {
      if (!maskEl) return;

      // Мастер ScrollTrigger на всё тело документа:
      // CSS-var --eclipse тянется от скролл-прогресса (0% → 100%).
      gsap.to(maskEl, {
        "--eclipse": "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Вспышка солнца на Сцене 7 (Fifth).
      const flashTarget = rootRef.current?.querySelector(".sun-core");
      if (flashTarget) {
        gsap.to(flashTarget, {
          scrollTrigger: {
            trigger: document.querySelector("#scene-fifth"),
            start: "top center",
            onEnter: () => {
              gsap.to(flashTarget, {
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

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="eclipse-anchor fixed top-[8vh] right-[6vw] z-30 pointer-events-none opacity-0"
      aria-hidden="true"
    >
      <div
        className="sun-core relative w-[140px] h-[140px] rounded-full overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#fff4c8,#c9a96e_60%,#7a5a2a)] shadow-[0_0_60px_rgba(201,169,110,0.6)]"
      >
        <div ref={maskRef} className="eclipse-mask absolute inset-0 rounded-full" />
      </div>
      <div className="font-mono text-[9px] tracking-[0.3em] text-neon-cyan/60 mt-2 text-right">
        OBSCURATION <span className="text-neon-cyan" id="eclipse-readout">
          0%
        </span>
      </div>
    </div>
  );
}