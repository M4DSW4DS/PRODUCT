"use client";
import type { ReactNode } from "react";

export type SceneProps = {
  backgroundImage: string;
  overlay: "none" | "dusk" | "night";
  content: ReactNode;
};

const OVERLAY_BG: Record<string, string> = {
  none: "transparent",
  dusk: "rgba(10, 10, 15, 0.4)",
  night: "rgba(10, 10, 15, 0.8)",
};

export function Scene({ backgroundImage, overlay, content }: SceneProps) {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-[#0a0a0f]">

      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt="Scene background" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundColor: OVERLAY_BG[overlay] }} />

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center">
        {content}
      </div>

    </section>
  );
}
