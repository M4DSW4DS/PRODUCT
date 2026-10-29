# CLINE WORKFLOW CONTRACT
# RoadMap Section 11 — Operational Source of Truth
# Version: 2026-10-29 / fact-checked + project incidents 11.9

> При конфликте с другим разделом RoadMap — приоритет у этого документа.
> Ссылки [8.N] — на принципы раздела 8 RoadMap.
> Маркировка: 🟢 DOC — официальная документация; 🟠 INCIDENT — подтверждено инцидентом; 🟡 PRACTICE — инженерная практика.

## 11.1. Структура каждого Cline Task

Каждый таск — в шаблоне `=== BEGIN TASK [N] === ... === END TASK [N] ===` и содержит:

- [ ] **Whitelist файлов** — точный список, что разрешено менять.
- [ ] **STRICTLY FORBIDDEN** — блок запретов (см. 11.2).
- [ ] **Definition of Done** — чеклист (см. 11.3).
- [ ] **STEP-инструкции** — с точным кодом: полная замена, если файл < 400 строк; точечный PATCH, если > 400.
- [ ] **REPORT-формат** — что именно Cline присылает обратно (см. 11.4).

Cline не начинает Task N+1, пока пользователь не написал `ACCEPT` по Task N. Никакого самоподтверждения Cline.

## 11.2. Запреты Cline

### Технические запреты — подтверждены официально

- 🟢 **NO новый `forwardRef`** в коде. В React 19 `ref` передаётся как обычный пропс. Legacy `forwardRef` не удалять, если задача этого не требует: `forwardRef` пока работает (deprecated, но не removed).
- 🟢 **NO строковые методы на Puck `ReactNode`.** В editable-полях (`.trim()`, `.toString()`, `.length`) — Puck конвертирует значение из `string` в `ReactNode` при включении inline-редактирования. Рендер только как `{value}`.
- 🟢 **Puck editable-поля в схеме — только `{ type: 'text' | 'textarea' }`.** `contentEditable: true` ставится не в схеме, а в рендере компонента.
- 🟢 **NO динамический Tailwind** (`text-${color}`, `w-${size}`). Tailwind сканирует исходники как plain text и не видит интерполяцию — классы не генерируются. Только static mapping objects.
- 🟢 **NO Chrome/Puppeteer/Playwright с `--remote-debugging-port=9222`** на дефолтном профиле. Chrome с версии 136 официально ограничивает этот флаг как security risk.

### Запреты — подтверждены инцидентом

- 🟠 **NO destructive git:** `push --force`, `reset --hard`, `clean -fd`, удаление файлов без прямой команды. Инцидент #7682: Cline выполнил `git push origin main --force` без разрешения, перезаписал remote и удалил файлы шаблона. Мейнтейнеры подтвердили: «no hardcoded blocklist for dangerous commands», «`.clinerules` — prompt instructions, not enforced».
- 🟠 **NO опора на `.clinerules` / `AGENTS.md` как на гарантию.** Тот же инцидент: правила не enforced. Внешний контроль (Red Agent Protocol, whitelist, DoD) — обязателен.
- 🟠 **NO writes через `run_commands`** для `.tsx`/`.ts`/`.json`/`.md` — только `editor` tool. PR #12906: shell-редактирование (`sed -i`, `echo >`, heredoc) — известный обходной путь, Cline блокирует его в plan mode жёстким blocklist[reference:8]. В act mode `run_commands` разрешён для git/npm/npx, но **не для записи исходников**.
- 🟠 **NO `editor` fallback на shell.** Если `editor` tool недоступен (ошибка `Model tried to call unavailable tool`) — STOP с `EDITOR_TOOL_UNAVAILABLE`, не пытаться писать через `run_commands`. Issue #11913 подтверждает: Cline может запрашивать недоступный `replace_in_file` и получать отказ[reference:9].

### Запреты — инженерная практика

- 🟡 **NO `any` в TypeScript.**
- 🟡 **NO плейсхолдеры** `// ... rest of code` в файлах < 400 строк.
- 🟡 **NO выдуманный DOM-анализ.** Visual check — зона пользователя, Cline пишет `N/A (user verifies)`.
- 🟡 **NO mojibake в кириллических labels** — STOP и рапорт [8.3]. Проверка: см. 11.9.4.
- 🟡 **NO scroll-jacking.** Анимации скролла — только `requestAnimationFrame` + `getBoundingClientRect`. GSAP разрешён, плагин ScrollTrigger — нет [8.5].
- 🟡 **NO анимации без `prefers-reduced-motion: reduce`** [8.4].
- 🟡 **NO изменение `content/*.json`** без явного whitelist в таске [8.6]. Вне таска — `ROLLBACK` + разбор в VS Code (см. 11.9.5).
- 🟡 **NO изменения файлов вне whitelist.**

## 11.3. Git-flow и DoD

Cline обязан выполнять строго по порядку:

1. `git pull --ff-only origin feat/visual-rebuild` — при отказе (non-fast-forward) STOP и рапорт пользователю.
2. `npx tsc --noEmit` — FAIL → STOP и рапорт с хвостом лога.
3. `npm run build` — FAIL → STOP и рапорт с хвостом лога.
4. `git status --short`
5. `git diff --stat`
6. `git add -- <whitelist-файлы>` (поимённо, никогда `add .`)
7. `git commit -m "[type]: [english description]"` [8.9]
8. `git push origin feat/visual-rebuild`
9. 🟡 `git ls-remote origin feat/visual-rebuild` — сравнить с локальным HEAD. Mismatch → STOP и рапорт [8.8, practice: `push` success ≠ remote moved при hook fail / protected branch]

🟡 **Build timeout:** > 2 минут → остановить, очистить `.next`, рапорт. [practice: очистка `.next` — консенсусный фикс зависшего Next.js build, «2 минуты» — эвристика]

🟡 **Локальная визуальная проверка** (`npm run dev` + глаза) — **шаг пользователя** перед деплоем, не Cline [8.10].

## 11.4. REPORT-формат отчёта Cline

🟠 **Report discipline (из 11.9.1).** Любой REPORT — **raw output команд**. Запрещены: «task complete», «N files found», «all done», «revisions needed?». Отчёт без raw = не отчёт, переделать.

Cline присылает ровно это и останавливается:

1. Typecheck / Build Status: `OK` / `FAIL` (+ хвост лога при FAIL)
2. Modified files (по `git status --short`): raw вывод
3. `git diff --stat`: raw вывод
4. Git Push Status: `Pushed` / `Failed`
5. Remote HEAD verification: `Match` / `Mismatch`
6. UI Verification: `N/A (user verifies)`
7. Открытые вопросы: только если есть архитектурное сомнение

Отчёт не по форме = задача не принята.

## 11.5. Red Agent Protocol — проверка отчёта

На каждый присланный отчёт — вердикт:
VERDICT: [ACCEPT / FIX TASK / ROLLBACK]
REASON: [1-3 жёстких пункта]
NEXT: [новый таск / команды исправления / отката]

text

Правила вердикта:

- `Build FAIL` → `FIX TASK` с точным указанием, что чинить.
- Modified files вне whitelist → `ROLLBACK` + `git checkout HEAD -- <file>`.
- Push не выполнен или remote HEAD mismatch → `FIX TASK` только на push.
- Visual task без `N/A (user verifies)` или без скриншота от пользователя → `FIX TASK`.
- Отчёт не по форме (нет raw output) → отклоняется, требуется переделать.

**Approval = слово `ACCEPT` от пользователя в чате. Ничего больше.**

🟠 **Почему внешний контроль обязателен:** инцидент #7682 показал, что Cline не имеет hardcoded blocklist для опасных команд, а `.clinerules` не enforced. Whitelist, DoD и Red Agent Protocol — единственный барьер между моделью и продом.

## 11.6. Chat hygiene

- 🟡 Новый чат Cline — каждые 2-3 таска или при контексте > 50k токенов [8.7].
- 🟡 **Индикатор деградации — серия single `read_file`.** Современный Cline использует batch `read_files`; цепочка > 3 single `read_file` подряд за таск — маркер переполнения скрытого контекста (tool_call начинают игнорироваться). STOP, новый чат.
- Признак деградации контекста: Cline повторяет запреты, читает файлы, которые уже даны, забывает whitelist → STOP, новый чат.
- Новый чат не открывается молча — сначала `ACCEPT` по текущему таску, потом новый чат.

## 11.7. Phase DoD ≠ Task DoD

Раздел 7 (DoD Phase 1) — стратегический чеклист фазы. DoD каждого отдельного таска внутри фазы — по 11.3. Не смешивать: закрытие таска не равно закрытию фазы.

## 11.8. Источники (базовые)

Официальная документация:

- React 19, `forwardRef` → https://uk.react.dev/reference/react/forwardRef
- Puck 0.20 (ReactNode в editable, строковые методы) → https://puckeditor.com/blog/puck-020
- Tailwind, detecting classes → https://tailwindcss.com/docs/detecting-classes-in-source-files
- Chrome, remote-debugging-port security → https://developer.chrome.com/blog/remote-debugging-port

Инцидент Cline (force-push, `.clinerules` не enforced):

- https://github.com/cline/cline/issues/7682

Архитектура инструментов Cline:

- File Operations (DeepWiki) → https://deepwiki.com/cline/cline/8.1-checkpoints-and-version-control
- File Editing Tools (DeepWiki) → https://deepwiki.com/cline/cline/8.1-file-editing-tools
- PR #12906 (blocklist shell-редактирования) → https://github.com/cline/cline/pull/12906
- Issue #11913 (unavailable tool) → https://github.com/cline/cline/issues/11913

Практика сообщества (build timeout, `.next`, `git ls-remote`, read_files batching, mojibake grep):

- Fast.io, Cline file size limits → https://www.fast.io/resources/cline-file-size-limit
- Stack Overflow / DEV Community — консенсусная практика, не документированный стандарт.

## 11.9. Дополнения (2026-10-29, из практики проекта)

### 11.9.1. Report discipline
- 🟠 INCIDENT: [READ-SCHEMAS] ×2 — Cline возвращал «N fields» вместо `name | type | label`. [APPLY-LABELS] — «task complete» вместо 10 секций.
- Правило: любой REPORT — raw output команд. Запрещены: «task complete», «N files found», «all done», «revisions needed?». Отчёт без raw = не отчёт, переделать.

### 11.9.2. Editor tool
- 🟠 POSITIVE RULE: все записи файлов — только `editor` tool. Если недоступен — STOP, `EDITOR_TOOL_UNAVAILABLE`, не падать в shell.
- 🟠 INCIDENT: `lib/Timer1/schema.tsx` (untracked, 1 строка) вместо 28 — обрубок от промаха editor. Удалён коммитом `7077ca7`.
- 🟠 Подтверждение: PR #12906 — shell-редактирование блокируется в plan mode как обходной путь[reference:11]; Issue #11913 — Cline может запрашивать недоступный инструмент[reference:12].

### 11.9.3. read_files plural
- 🟡 `read_files` (batch) — предпочтительный инструмент. `read_file` (single) — legacy.
- 🟡 Серия > 3 single `read_file` подряд за один таск — маркер деградации контекста (не сам инструмент, а количество вызовов). STOP, новый чат.
- 🟡 НЕ утверждать, что single `read_file` «всегда плохо» — это legacy, а не признак сбоя. Плохо — последовательная серия.

### 11.9.4. Mojibake check
- 🟡 После записи любого файла с кириллицей: `file <path>` → `UTF-8 Unicode text`; `grep -n -P 'Ð|Ñ|â€|Ã' <path>` → 0 совпадений. >0 → STOP, `MOJIBAKE_IN: <file>`, перезапись через `editor` tool.
- 🟠 INCIDENT: `.env.example` в cp1251 (комментарии mojibake), `report_*.txt` в mojibake. Оба исправлены.

### 11.9.5. content/*.json protocol
- 🟠 INCIDENT (2026-10-29): `M content/page.json` появился вне whitelist (не Cline — IDE/автоформат).
- Правило: `content/*.json` меняется только в таске, где они в whitelist. Вне таска — `ROLLBACK` + разбор в VS Code.

### 11.9.6. Handshake при новом чате
- 🟡 4 команды: `git pull --ff-only origin feat/visual-rebuild && git status --short && git log --oneline -3 && git branch --show-current`.
- Ожидание: log-3 начинается с ACCEPT-HEAD, status пуст (или известные untracked), branch правильный. Иначе STOP.
### 11.9.7. Build Status ��� raw tail � �� ��������������
- ?? INCIDENT (2026-10-29): LANDING-ASSEMBLY REPORT ������ �build OK�. ����: `node JSON.parse` �� HEAD `3b834d6` � JSON syntax error. Cline shell ��� ������, build �� ����������.
- �������: Build Status: OK � REPORT ����������� � `npm run build 2>&1 | tail -20` � `node -e "JSON.parse(...)"` ��� ���������� `.json`. ��� ����� � �� ��������������.

### 11.9.10. CONTENT LOCK
- ?? INCIDENT (2026-10-29): Cline ��� editor write � `content/page.json` ������ ������� ����� �� English (`��������`>`westward`, `����������`>`expedition`), ������ �������, ������� �����>�����. ������ `3b834d6` ���� � ����� page.json.
- �������: `content/*.json` � Cline ������ READ. ����� ������ � ������������ ����� �������� (PowerShell here-string, `node fs.writeFileSync`, `git checkout`). Cline �� �������� `content/*.json` � whitelist.

### 11.9.11. PowerShell here-string ��� ������ >8k
- ?? INCIDENT (2026-10-29): `node -e '...'` � ������� JSON (8k+ ��������) � PowerShell �������, `SyntaxError: Unexpected end of input`.
- �������: ��� ������ ������ >8k �������� � PowerShell here-string (`@'...'@` + `[System.IO.File]::WriteAllText`). ��� JSON >16k � base64 � `node -e`.
