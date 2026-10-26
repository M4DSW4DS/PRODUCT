"use client";
import Image from "next/image";

export type ZorgCabinetProps = {
  ref?: React.Ref<HTMLDivElement>;
};

export function ZorgCabinet({ ref }: ZorgCabinetProps) {
  return (
    <div ref={ref} className="zorg-cabinet absolute inset-0 z-0 flex items-center justify-center bg-cosmic-black overflow-hidden">
      <Image
        src="/hero/zorg-cabinet.png"
        alt="Zorg Cabinet"
        width={1920}
        height={1080}
        priority
        className="w-auto h-auto max-w-full max-h-[100dvh] object-contain"
      />
    </div>
  );
}
