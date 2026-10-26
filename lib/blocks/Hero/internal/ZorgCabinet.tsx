"use client";
import Image from "next/image";

export type ZorgCabinetProps = {
  ref?: React.Ref<HTMLDivElement>;
};

export function ZorgCabinet({ ref }: ZorgCabinetProps) {
  return (
    <div ref={ref} className="absolute inset-0 z-0 flex items-center justify-center bg-cosmic-black overflow-hidden">
      <Image
        src="/hero/zorg-bg.jpg"
        alt="Zorg Cabinet"
        width={1920}
        height={1080}
        priority
        className="w-full h-auto max-h-[100dvh] object-contain object-center"
      />
    </div>
  );
}
