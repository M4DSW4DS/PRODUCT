export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqProps = {
  title: string;
  items: FaqItem[];
};

/**
 * БЛОК — FAQ. Аккордеон на нативных details/summary (без JS).
 */
export function FaqBlock({ title, items }: FaqProps) {
  return (
    <section className="relative w-full py-24 px-6 md:py-32 bg-cosmic-black border-t border-white/10">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl text-egyptian-gold mb-12 text-center">
          {title}
        </h2>
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {(items ?? []).map((item, i) => (
            <details
              key={i}
              className="group bg-white/5 border border-white/10 p-6 text-white font-body hover:border-egyptian-gold/50 transition-colors"
            >
              <summary className="cursor-pointer list-none font-medium text-egyptian-gold flex justify-between items-center">
                <span>{item.question}</span>
                <span className="text-neon-cyan transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-white/80 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
