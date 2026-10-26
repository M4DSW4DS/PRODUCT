"use client";
import Image from "next/image";

export type ZorgCabinetProps = {
  ref?: React.Ref<HTMLDivElement>;
};

export function ZorgCabinet({ ref }: ZorgCabinetProps) {
  return (
    <div ref={ref} className="zorg-cabinet absolute inset-0 z-0 overflow-hidden bg-cosmic-black">
      <div className="absolute inset-0 bg-[url('/hero/zorg-cabinet.png')] bg-cover bg-center opacity-40 blur-3xl scale-110" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Image src="/hero/zorg-cabinet.png" alt="Zorg" width={1920} height={1080} className="w-auto h-auto max-w-full max-h-[100dvh] object-contain object-center relative z-10" />
      </div>
    </div>
  );
}
