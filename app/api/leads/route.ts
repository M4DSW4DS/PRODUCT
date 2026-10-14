import { NextResponse } from "next/server";
import { isValidEmail, saveLead } from "@/lib/core/leads";

/**
 * POST /api/leads — приём заявки (лида) с формы блока Form.
 * Валидация → сохранение (KV / память) → JSON-ответ.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный JSON" },
      { status: 400 }
    );
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  const errors: string[] = [];
  if (cleanName.length < 2 || cleanName.length > 100) {
    errors.push("Имя: от 2 до 100 символов");
  }
  if (!isValidEmail(cleanEmail) || cleanEmail.length > 200) {
    errors.push("Некорректный email");
  }
  if (cleanMessage.length > 2000) {
    errors.push("Сообщение: не более 2000 символов");
  }
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  try {
    const lead = await saveLead({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });
    console.info(`[leads] saved ${lead.id} <${lead.email}>`);
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[leads] save failed:", err);
    return NextResponse.json(
      { ok: false, error: "Не удалось сохранить заявку" },
      { status: 500 }
    );
  }
}

/** Список заявок не публикуется через API — доступ будет в админке (Этап 5). */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
