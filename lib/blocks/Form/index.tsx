"use client";

import { useState } from "react";

export type FormProps = {
  title: string;
  subtitle: string;
  submitText: string;
  successMessage: string;
  /** Endpoint, на который уходит заявка. Задаётся в редакторе. */
  endpoint: string;
};

type Status = "idle" | "loading" | "success" | "error";

/**
 * БЛОК — Form. Сбор заявки (лида): имя, email, сообщение.
 * Отправляет JSON на указанный endpoint (Этап 4/5 — /api/leads + KV).
 */
export function FormBlock({
  title,
  subtitle,
  submitText,
  successMessage,
  endpoint,
}: FormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };

    setStatus("loading");
    setError("");
    try {
      const res = await fetch(endpoint || "/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    }
  }

  return (
    <section id="lead-form" className="px-6 py-16 md:py-24">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-section-title font-bold text-egyptian-gold">{title}</h2>
          <p className="text-zinc-400 mt-3">{subtitle}</p>
        </div>

        {status === "success" ? (
          <div className="rounded-xl border border-neon-cyan/40 bg-white/5 px-6 py-8 text-center text-neon-cyan">
            {successMessage}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <input
              name="name"
              required
              placeholder="Ваше имя"
              className="bg-cosmic-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-egyptian-gold"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="bg-cosmic-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-egyptian-gold"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Сообщение (необязательно)"
              className="bg-cosmic-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-egyptian-gold resize-none"
            />
            {status === "error" ? (
              <p className="text-red-400 text-sm">Ошибка: {error}</p>
            ) : null}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-1 bg-egyptian-gold text-cosmic-black font-semibold px-6 py-3 rounded-lg transition-colors hover:bg-neon-cyan disabled:opacity-60"
            >
              {status === "loading" ? "Отправляем…" : submitText}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
