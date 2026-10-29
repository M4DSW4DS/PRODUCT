# Деплой сайта на ONREZA

## Переменные окружения

Скопируй `.env.example` в `.env` и заполни:

| Переменная | Обязательна | Описание |
|---|---|---|
| DATABASE_URL | Нет (MVP) | ONREZA Managed PostgreSQL URL с `?sslmode=require` в конце. Если не задана — сайт читает `content/page.json` (read-only). |
| ADMIN_TOKEN | Да (прод) | Пароль для PUT /api/page. Без него PUT открыт всем. |
| CLOUDFLARE_ACCOUNT_ID | Нет | Резерв для будущих AI-фич, сейчас не используется. |
| CLOUDFLARE_API_TOKEN | Нет | Там же. |

## Локальный запуск

Вариант 1 — dev:
npm run dev

Вариант 2 — production (standalone):
npm run build
npm run start:standalone

ВАЖНО: standalone-сборка НЕ включает public/, content/, .next/static/. Перед запуском start:standalone скопируй:
cp -r public .next/standalone/
cp -r content .next/standalone/
cp -r .next/static .next/standalone/.next/
node .next/standalone/server.js

## Деплой на ONREZA

Режим рекомендован: Node.js process (ONREZA автоопределяет standalone Next.js).

Вариант A — Node process:
1. npm run build локально или в CI
2. Скопировать на сервер: .next/standalone/, public/, content/, .env
3. Запустить node server.js под PM2 или systemd
4. Проксировать через nginx на :3000

Вариант B — Docker:
docker build -t site-builder .
docker run -p 3000:3000 --env-file .env site-builder

## Smoke-test после деплоя

- GET / — главная с контентом из page.json или БД
- GET /api/page — { ok: true, data: {...} }
- GET /admin — Puck editor открывается
- PUT /api/page без x-admin-token → 403 (если ADMIN_TOKEN задан)
- GET /hero/*.png — картинки грузятся

## Troubleshooting

| Симптом | Причина |
|---|---|
| 500 на / | DATABASE_URL недоступен И content/page.json не скопирован |
| 404 на /hero/* | public/ не скопирован |
| CSS не грузится | .next/static/ не скопирован |
| PUT /api/page работает без токена | ADMIN_TOKEN не задан в .env |