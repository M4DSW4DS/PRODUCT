import { NextResponse } from "next/server";
import type { Data } from "@puckeditor/core";
import { getPageData, savePageData } from "@/lib/core/page-store";
import { revalidatePath } from "next/cache";

/** GET /api/page — текущие опубликованные данные страницы (PostgreSQL, иначе page.json). */
export async function GET() {
  try {
    const data = await getPageData();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("[page] GET failed:", err);
    return NextResponse.json(
      { ok: false, error: "Не удалось прочитать страницу" },
      { status: 500 }
    );
  }
}

/**
 * Проверка пароля публикации для PUT /api/page.
 * Пароль берётся из env ADMIN_TOKEN; принимается в заголовке
 * x-admin-token (админка) или Authorization: Bearer (API/скрипты).
 * Если ADMIN_TOKEN не задан — публикация открыта (режим MVP).
 */
function isPublishAllowed(request: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return true;
  if (request.headers.get("x-admin-token") === token) return true;
  if (request.headers.get("authorization") === `Bearer ${token}`) return true;
  return false;
}

/**
 * PUT /api/page — публикация страницы из редактора (onPublish).
 * Защита: при заданном ADMIN_TOKEN требуется пароль (см. isPublishAllowed).
 * Тело запроса — объект Data Puck ({ root, content, zones }).
 */
export async function PUT(request: Request) {
  if (!process.env.ADMIN_TOKEN) {
    console.warn(
      "[page] ADMIN_TOKEN не задан — PUT /api/page открыт (MVP-режим, задай пароль для продакшена)"
    );
  }
  if (!isPublishAllowed(request)) {
    return NextResponse.json(
      { ok: false, error: "Неверный пароль публикации" },
      { status: 401 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный JSON" },
      { status: 400 }
    );
  }

  const page = body as Partial<Data> | null;
  if (!page || typeof page !== "object" || !Array.isArray(page.content)) {
    return NextResponse.json(
      { ok: false, error: "Неверный формат данных страницы" },
      { status: 400 }
    );
  }

  try {
    await savePageData(page as Data);
    revalidatePath("/");
    console.info(`[page] published (${page.content.length} blocks)`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[page] PUT failed:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Не удалось опубликовать" },
      { status: 503 }
    );
  }
}
