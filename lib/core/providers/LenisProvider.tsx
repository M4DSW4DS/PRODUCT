"use client";

import { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    return () => {
      // ScrollTrigger cleanup is handled by ReactLenis unmount
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.09, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
