'use client';

import type { ReactNode } from "react";
import { useState } from "react";

export type ConversionTab = {
  label: ReactNode;
  title: ReactNode;
  body: ReactNode;
};

export type ConversionProps = {
  title: ReactNode;
  tabs: ConversionTab[];
};

export function ConversionBlock({ title, tabs }: ConversionProps) {
  const safeTabs = tabs ?? [];
  const [active, setActive] = useState(0);
  const current = safeTabs[active] ?? safeTabs[0];

  return (
    <section className="bg-cosmic-black text-white px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-section-title font-bold text-egyptian-gold mb-8 text-center">
          {title}
        </h2>
        {safeTabs.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {safeTabs.map((tab, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={
                    i === active
                      ? "px-4 py-2 rounded-full border border-egyptian-gold bg-egyptian-gold text-cosmic-black font-semibold"
                      : "px-4 py-2 rounded-full border border-white/20 text-white hover:border-egyptian-gold/60"
                  }
                >
                  {tab.label || `Вкладка ${i + 1}`}
                </button>
              ))}
            </div>
            {current ? (
              <div className="border border-white/10 rounded-xl p-6 md:p-10 bg-white/5">
                <h3 className="text-2xl font-bold text-neon-cyan mb-4">
                  {current.title}
                </h3>
                <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                  {current.body}
                </p>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}