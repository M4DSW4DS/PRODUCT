"use client";

/** Props круглого окна (HUD-прицел). */
export type CircularWindowProps = {
  /** Ref на корневой узел — родитель анимирует масштаб. */
  ref?: React.Ref<HTMLDivElement>;
  /** Источник изображения (путь из public/). */
  imageSrc?: string;
};

/**
 * Круглое окно с HUD-прицелом: пунктирная окружность, перекрестия,
 * голубая рамка со свечением. Декоративно — без текста.
 */
export function CircularWindow({ ref, imageSrc }: CircularWindowProps) {
  return (
    <div
      ref={ref}
      className="hero-circular-window relative w-[80vw] h-[80vw] md:w-[80vh] md:h-[80vh] max-w-[80vh] max-h-[80vh] rounded-full overflow-hidden backdrop-blur-sm border border-[#0055ff]/60 shadow-[0_0_30px_#0055ff] shrink-0"
      aria-hidden="true"
    >
      {/* Неоновая рамка */}
      <div className="absolute inset-0 rounded-full border-[3px] border-[#0055ff] shadow-[0_0_30px_#0055ff] pointer-events-none z-20 window-border" />
    </div>
  );
}
