"use client";
import Image from "next/image";

export type CircularWindowProps = {
  ref?: React.Ref<HTMLDivElement>;
};

export function CircularWindow({ ref }: CircularWindowProps) {
  return (
    <div
      ref={ref}
      className="hero-circular-window absolute inset-0 z-10 pointer-events-none overflow-hidden"
      style={{
        clipPath: "circle(15% at 50% 50%)",
      }}
    >
      <div className="relative w-full h-full">
        {/* EXACT same image as background */}
        <Image
          src="/hero/zorg-cabinet.png"
          alt=""
          fill
          className="object-cover object-center"
        />
        {/* Neon border ring that matches the clip-path hole */}
        <div className="window-border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full border-[3px] border-[#0055ff] shadow-[0_0_30px_#0055ff]" />
      </div>
    </div>
  );
}
