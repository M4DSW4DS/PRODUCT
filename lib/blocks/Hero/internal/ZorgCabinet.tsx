"use client";

import Image from "next/image";

/** Props шкафа Зорга. */
export type ZorgCabinetProps = {
  /** Ref на корневой узел — родитель анимирует пролёт кабины. */
  ref?: React.Ref<HTMLDivElement>;
};

/**
 * Шкаф Зорга — фоновый слой кабины. Два декоративных голубых свечения
 * (луна и намёк на трубу), смешивание lighten. Без текста.
 */
export function ZorgCabinet({ ref }: ZorgCabinetProps) {
  return (
    <div
      ref={ref}
      className="zorg-cabinet pointer-events-none absolute inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      <Image
        src="/hero/zorg-cabinet.png"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 50vw"
        className="object-contain object-center"
        priority
      />

      {/* Свечение луны */}
      <div className="absolute left-[12%] top-[8%] h-[26vw] max-h-[18rem] w-[26vw] max-w-[18rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.45),transparent_68%)] blur-2xl" />

      {/* Намёк на трубу */}
      <div className="absolute -left-[10%] bottom-[6%] h-[14vw] max-h-[9rem] w-[58vw] max-w-[40rem] rotate-[-12deg] rounded-full bg-[linear-gradient(90deg,rgba(0,229,255,0.32),transparent_72%)] blur-xl" />
    </div>
  );
}
