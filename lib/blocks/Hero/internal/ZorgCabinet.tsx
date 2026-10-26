"use client";
import Image from "next/image";

export type ZorgCabinetProps = {
  ref?: React.Ref<HTMLDivElement>;
};

export function ZorgCabinet({ ref }: ZorgCabinetProps) {
  return (
    <div ref={ref} className="zorg-cabinet absolute inset-0 z-0 overflow-hidden bg-cosmic-black">
      {/* Blurred Background (Visible only on Desktop where object-contain leaves empty space) */}
      <div 
        className="absolute inset-0 bg-[url('/hero/zorg-cabinet.png')] bg-cover bg-center opacity-40 blur-2xl scale-110"
        aria-hidden="true"
      />
      
      {/* Main Image Layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/hero/zorg-cabinet.png"
          alt="Zorg Cabinet"
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover md:object-contain object-center relative z-10"
        />
      </div>
    </div>
  );
}
