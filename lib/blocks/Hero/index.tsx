"use client";

export type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  align: "left" | "center";
};

/**
 * БЛОК — Hero. Первый экран промо-страницы.
 * Надзаголовок + заголовок + подзаголовок + CTA-кнопка.
 */
export function HeroBlock({
  eyebrow,
  title,
  subtitle,
  ctaText,
  ctaHref,
  align,
}: HeroProps) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <section className={`flex flex-col gap-6 px-6 py-20 md:py-32 ${alignCls}`}>
      <span className="text-neon-cyan uppercase tracking-[0.2em] text-sm font-semibold">
        {eyebrow}
      </span>
      <h1 className="text-hero font-bold text-egyptian-gold max-w-4xl">
        {title}
      </h1>
      <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
        {subtitle}
      </p>
      {ctaText ? (
        <a
          href={ctaHref || "#"}
          className="mt-2 inline-flex w-fit bg-egyptian-gold text-cosmic-black font-semibold px-6 py-3 rounded-lg transition-colors hover:bg-neon-cyan"
        >
          {ctaText}
        </a>
      ) : null}
    </section>
  );
}
