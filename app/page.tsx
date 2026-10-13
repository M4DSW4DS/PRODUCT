export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-hero font-bold text-egyptian-gold">
        Дизайн-лаборатория
      </h1>
      <p className="max-w-md text-neutral-300">
        Этап 0 завершён. Каркас Next.js 16.4 + React 19.3 + Tailwind CSS v4 готов.
      </p>
      <span className="rounded-full border border-neon-cyan/40 px-4 py-1 text-sm text-neon-cyan">
        Этап 0: базовая инициализация
      </span>
    </main>
  );
}
