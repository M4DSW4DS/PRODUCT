import type { ReactNode } from "react";

export type CtaProps = {
  title: ReactNode;
  subtitle: ReactNode;
  buttonText: ReactNode;
  buttonHref: string;
};

/**
 * БЛОК — CTA. Финальный призыв к действию на акцентной плашке.
 */
export function CtaBlock({ title, subtitle, buttonText, buttonHref }: CtaProps) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-5 rounded-2xl border border-neon-cyan/30 bg-gradient-to-b from-white/5 to-transparent px-8 py-14">
        <h2 className="text-section-title font-bold text-egyptian-gold">{title}</h2>
        <p className="text-zinc-400 max-w-2xl leading-relaxed">{subtitle}</p>
        {buttonText ? (
          <a
            href={buttonHref || "#"}
            className="mt-1 inline-flex bg-neon-cyan text-cosmic-black font-semibold px-7 py-3 rounded-lg transition-colors hover:bg-egyptian-gold"
          >
            {buttonText}
          </a>
        ) : null}
      </div>
    </section>
  );
}
