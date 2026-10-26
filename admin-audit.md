# Admin Audit — 2026-10-26

## 1. Blocks & Fields

| Block | Field | Type | contentEditable | Used in render | Advanced candidate |
|-------|-------|------|-----------------|----------------|--------------------|
| Heading | title | text | no | yes | no |
| Heading | level | radio | no | yes | no |
| Heading | align | radio | no | yes | no |
| Hero | eyebrow | text | yes | yes | no |
| Hero | title | text | yes | yes | no |
| Hero | subtitle | textarea | yes | yes | no |
| Hero | quote | textarea | yes | yes | no |
| Hero | quoteAttribution | text | yes | yes | no |
| Hero | ctaLabel | text | yes | yes | no |
| Hero | ctaHref | text | yes | yes | no |
| Hero | showTimer | radio | no | yes | yes |
| Hero | showCalendar | radio | no | yes | yes |
| Hero | sunTop | text | yes | yes | yes |
| Hero | sunLeft | text | yes | yes | yes |
| Hero | sunSize | text | yes | yes | yes |
| Hero | sunGlow | text | yes | yes | yes |
| Timer | title | text | no | yes | no |
| Timer | targetDate | text | no | yes | no |
| Timer | endMessage | text | no | yes | no |
| Timer | hint_text | text | no | yes | no |
| Timer | accent_color | text | no | yes | yes |
| Timer | post_countdown_text | text | no | yes | no |
| Features | title | text | yes | yes | no |
| Features | items.icon | text | yes | yes | no |
| Features | items.title | text | yes | yes | no |
| Features | items.description | textarea | yes | yes | no |
| PartnerWidget | title | text | no | yes | no |
| PartnerWidget | subtitle | textarea | no | yes | no |
| PartnerWidget | src | text | no | yes | yes |
| PartnerWidget | height | text | no | yes | yes |
| PartnerWidget | fallbackUrl | text | no | yes | no |
| PartnerWidget | fallbackText | text | no | yes | no |
| Faq | title | text | yes | yes | no |
| Faq | items.question | text | yes | yes | no |
| Faq | items.answer | textarea | yes | yes | no |
| Cta | title | text | no | yes | no |
| Cta | subtitle | textarea | no | yes | no |
| Cta | buttonText | text | no | yes | no |
| Cta | buttonHref | text | no | yes | no |
| Scene | variant | radio | no | yes | yes |
| Scene | overlay | radio | no | yes | yes |
| Scene | eyebrowPrefix | text | yes | yes | no |
| Scene | eyebrowSuffix | text | yes | yes | no |
| Scene | headingLines.text | text | yes | yes | no |
| Scene | headingLines.color | radio | no | yes | yes |
| Scene | textBlocks.text | textarea | yes | yes | no |
| Scene | accent | radio | no | yes | yes |
| Scene | backgroundImage | custom | no | yes | yes |
| Scene | quote | textarea | yes | yes | no |
| Scene | quoteAttribution | text | yes | yes | no |
| Scene | ctaLabel | text | yes | yes | no |
| Scene | ctaHref | text | yes | yes | no |
| Scene | svg_caption | text | yes | yes | no |
| Scene | microcopy | text | yes | yes | no |
| Scene | anchor | text | yes | yes | yes |
| Scene | artifacts.title | text | yes | yes | no |
## 2. Storage Backend

- Where Puck data is persisted: PostgreSQL (ONREZA Managed PostgreSQL), driver `postgres.js` (`postgres` package ^3.4.9). Connection string via `DATABASE_URL` (with optional `?sslmode=require`). Storage file: `lib/core/page-store.ts`.
- Is there a database? yes — PostgreSQL
- If JSON files: fallback only — `content/page.json` used as local fallback when `DATABASE_URL` is unset or DB is unreachable. Writes fall back to `content/page.json` via `fs.writeFile` when no SQL client is available.
- API route: `app/api/page/route.ts` (GET returns published page data; POST/PUT publishes to PostgreSQL).

## 3. Fonts

| Name | Source file | CSS variable |
|------|-------------|--------------|
| system sans-serif | (system fonts, no file) | `--font-sans` |
| Unbounded | not found (no @font-face, no fonts dir) | `--font-display: var(--font-unbounded)` |
| Grotesk | not found (no @font-face, no fonts dir) | `--font-body: var(--font-grotesk)` |
| Orbitron | not found (no @font-face, no fonts dir) | `--font-mono: var(--font-orbitron)` |

Paths checked: `app/fonts/` (does not exist), `public/fonts/` (does not exist), `app/globals.css` (no `@font-face` declarations). Font variables are declared in `@theme` block of `app/globals.css` but the underlying `@font-face` sources were not located.

## 4. Colors

| Name | Hex | Source |
|------|-----|--------|
| cosmic-black | #0a0a0f | `app/globals.css` (`@theme --color-cosmic-black`) |
| egyptian-gold | #c9a96e | `app/globals.css` (`@theme --color-egyptian-gold`) |
| neon-cyan | #00e5ff | `app/globals.css` (`@theme --color-neon-cyan`) |
| eclipse-orange | #ff6b35 | `app/globals.css` (`@theme --color-eclipse-orange`) |

Paths checked: `app/globals.css` (read). No `tailwind.config.js` exists — Tailwind v4 config is inline `@theme` in `app/globals.css`.

## 5. Dependencies (relevant only)

| Package | Version |
## 6. Inline-edit Coverage

Per block (contentEditable yes / total fields):

| Block | contentEditable | Total | Coverage |
|-------|-----------------|-------|----------|
| Heading | 0 | 3 | 0% |
| Hero | 11 | 13 | 85% |
| Timer | 0 | 6 | 0% |
| Features | 4 | 4 | 100% |
| PartnerWidget | 0 | 6 | 0% |
| Faq | 3 | 3 | 100% |
| Cta | 0 | 4 | 0% |
| Scene | 18 | 24 | 75% |
| Conversion | 0 | 4 | 0% |

**Total: 36 / 67 fields with contentEditable = 53.7%**

## 7. Block Cleanup Candidates

Blocks never referenced in any page or registry: none — all 9 blocks are registered in `lib/blocks/index.tsx` (`blocksConfig.components`).

Fields with "used in render = no" across all blocks: none — all fields are passed to block components via schema `render()` functions (Hero uses `{...props}`; others pass individual props; Scene passes `{...rest}` excluding only `puck` and `id`).

*Limitation: block-level `index.tsx` files were not read per read policy; this assessment is based on schema `render()` functions only.*

## 8. Risks / Unknowns

- Puck editor client configuration file not found (no `puck.config` or `PuckConfig` match). Puck config appears to be `blocksConfig` in `lib/blocks/index.tsx`; the actual Puck `<Editor>` client setup (in `app/admin/` likely) was not read.
- No `tailwind.config.js` — Tailwind v4 `@theme` in `app/globals.css` serves as config; no separate tailwind config file exists.
- Font source files for `--font-unbounded`, `--font-grotesk`, `--font-orbitron` not located; no `@font-face` in `app/globals.css`, no `app/fonts/` or `public/fonts/` directories exist.
- `layout.tsx` imports and page-level block usage not read (outside read policy) — cannot confirm which blocks are actually rendered on public pages vs. only registered.
- `content/page.json` exists as fallback but was not read (outside read policy).
- `app/api/page/route.ts` was referenced in grep results but not read directly.
|---------|---------|
| next | 16.4.0 |
| react | 19.3.0 |
| react-dom | 19.3.0 |
| @puckeditor/core | 0.23.0 |
| postgres | ^3.4.9 |

No other database libraries (prisma, drizzle, sqlite, mysql) found.
| Scene | artifacts.sub | text | yes | yes | no |
| Scene | plates.name | text | yes | yes | no |
| Scene | plates.text | textarea | yes | yes | no |
| Scene | plates.color | radio | no | yes | yes |
| Scene | voices.name | text | yes | yes | no |
| Scene | additional_ctas.label | text | yes | yes | no |
| Scene | additional_ctas.href | text | yes | yes | no |
| Conversion | title | text | no | yes | no |
| Conversion | tabs.label | text | no | yes | no |
| Conversion | tabs.title | text | no | yes | no |
| Conversion | tabs.body | textarea | no | yes | no |

*Used in render assessed from schema `render()` functions (all fields passed to block components). Block-level `index.tsx` render output was not read per read-policy limits.*