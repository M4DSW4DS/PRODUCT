"use client";

import { useRef, useEffect, useState } from "react";
import { EclipseScene } from "../EclipseScene";

export type Hero4Props = {
  imageProfile: string;
  imageFace: string;
  quoteText: string;
  sunSize: number;
  sunTop: number;
  sunLeft: number;
};

export function Hero4(props: Hero4Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    const tick = () => {
      const rect = section.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const p = totalScroll > 0 ? Math.max(0, Math.min(1, -rect.top / totalScroll)) : 0;
      
      setProgress(p);

      // Text: fade in 0-0.3, hold 0.3-0.6, fade out 0.6-0.8
      if (textRef.current) {
        let textOp = 0;
        if (p < 0.3) textOp = p / 0.3;
        else if (p < 0.6) textOp = 1;
        else if (p < 0.8) textOp = 1 - (p - 0.6) / 0.2;
        textRef.current.style.opacity = String(textOp);
      }

      // Image 1: Zoom in and fade out (0.0 to 0.6)
      if (img1Ref.current) {
        const scale = 1 + (p * 0.5); // Zoom up to 1.5x
        const opacity = p > 0.6 ? 0 : 1 - (p / 0.6);
        img1Ref.current.style.transform = `scale(${scale})`;
        img1Ref.current.style.opacity = String(opacity);
      }

      // Image 2: Fade in (0.2 to 0.6)
      if (img2Ref.current) {
        const opacity = p > 0.2 ? (p - 0.2) / 0.4 : 0;
        img2Ref.current.style.opacity = String(Math.min(1, opacity));
      }

      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        {/* Image 2 (Face) - Base layer */}
        <img 
          ref={img2Ref}
          src={props.imageFace} 
          alt="Face" 
          className="absolute inset-0 w-full h-full object-cover opacity-0"
        />

        {/* Image 1 (Profile) - Zooms and fades out */}
        <img 
          ref={img1Ref}
          src={props.imageProfile} 
          alt="Profile" 
          className="absolute inset-0 w-full h-full object-cover origin-center"
        />

        {/* EclipseScene - Centered */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <EclipseScene
            size={props.sunSize}
            height={props.sunSize}
            top={props.sunTop}
            left={props.sunLeft}
            progress={progress * 100}
            autoPlay={false}
            playDuration={1}
            showCorona={true}
            darkenScene={false}
          />
        </div>

        {/* Text */}
        <div 
          ref={textRef}
          className="absolute z-20 opacity-0 text-center pointer-events-none w-full px-4"
          style={{ bottom: "20%" }}
        >
          <h2 className="font-display text-4xl md:text-6xl text-white tracking-widest uppercase drop-shadow-[0_0_20px_rgba(0,229,255,0.8)]">
            {props.quoteText}
          </h2>
        </div>

      </div>
    </section>
  );
}