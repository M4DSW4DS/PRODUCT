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
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-section-title font-bold text-egyptian-gold mb-10 text-center">
          {title}
        </h2>
        <div className="flex flex-col gap-3">
          {(items ?? []).map((item, i) => (
            <details
              key={i}
              className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <summary className="cursor-pointer list-none px-6 py-4 font-medium text-egyptian-gold flex justify-between items-center">
                <span>{item.question}</span>
                <span className="text-neon-cyan transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="px-6 pb-5 text-zinc-400 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
