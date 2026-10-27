# Hero Sun Diagnostic — 2026-10-26

## 1. Schema fields

All four sun fields are top-level (not nested in a `group`) and `contentEditable: true`.

| Field key | Label | Type | Default | Nested |
|---|---|---|---|---|
| sunTop | Положение Солнца по вертикали (напр. 40%, 75%) | text | "40%" | top-level |
| sunLeft | Положение Солнца по горизонтали (напр. 50%) | text | "50%" | top-level |
| sunSize | Размер Солнца (напр. 400px, 300px) | text | "400px" | top-level |
| sunGlow | Свечение Солнца (напр. rgba(255,120,20,0.8)) | text | "0 0 100px rgba(255,180,50,0.9)" | top-level |

`sunGlow`, `sunTop`, `sunLeft`, `sunSize` all exist with these exact key names, all top-level in `HeroSchema.fields`.

## 2. Render mapping

Relevant JSX from `lib/blocks/Hero/index.tsx` (lines 107–121):

```jsx
{/* CSS Eclipse Sphere */}
<div
  className="space-viewport absolute z-20 pointer-events-none mix-blend-mode-screen"
  style={{
    top: props.sunTop ?? "40%",
    left: props.sunLeft ?? "50%",
    width: props.sunSize ?? "400px",
    height: props.sunSize ?? "400px",
    transform: "translate(-50%, -50%)",
  }}
>
  <div className="corona-flares" />
  <div className="sun-body absolute inset-0 rounded-full" style={{ boxShadow: props.sunGlow ?? "0 0 100px rgba(255,180,50,0.9)" }} />
  <div className="moon-body" />
</div>
```

| Schema field | CSS style applied | Hardcoded fallback |
|---|---|---|
| sunTop | `top` on `.space-viewport` | "40%" |
| sunLeft | `left` on `.space-viewport` | "50%" |
| sunSize | `width` + `height` on `.space-viewport` | "400px" |
| sunGlow | `boxShadow` on `.sun-body` | "0 0 100px rgba(255,180,50,0.9)" |

`sunGlow` maps to CSS property **`boxShadow`** (on `.sun-body`). It is NOT mapped to `filter: drop-shadow`, `text-shadow`, or any custom property.

Hardcoded values in `.sun-body` / `.space-viewport`:
- `boxShadow` fallback `"0 0 100px rgba(255,180,50,0.9)"` (when `sunGlow` is unset)
- `transform: "translate(-50%, -50%)"` on `.space-viewport` (hardcoded, not from props)

## 3. GSAP / CSS overrides

Findings:

- GSAP (`lib/blocks/Hero/index.tsx:78`): `tl.to(".sun-body", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 1)` — targets `.sun-body` but animates only **`opacity`**, NOT `boxShadow`/glow. Does not override `sunGlow`.
- No CSS `@keyframes` in `index.tsx` targeting `.sun-body` glow.
- `app/globals.css` defines `.eclipse-mask` (line 121) using `var(--eclipse, 0%)` and a radial-gradient, plus `eclipse-grow`-related keyframes — but these target `.eclipse-mask`, not `.sun-body`, and `.eclipse-mask` is **not rendered** in Hero. No override of `sunGlow`.

Conclusion: no GSAP/CSS animation overrides the `boxShadow` inline style coming from `sunGlow`.

## 4. Persisted values (content/page.json)

Hero block props (type `Hero`, id `Hero-97f575b7-4c0f-441e-af33-145e6bfe96f2`):

| Field | Saved value |
|---|---|
| sunTop | not saved (default "40%" applies) |
| sunLeft | not saved (default "50%" applies) |
| sunSize | not saved (default "400px" applies) |
| sunGlow | `"0, 229, 255, 1"` |

The user typed `rgba(0, 229, 255, 1)` but the persisted value is `0, 229, 255, 1` — the `rgba()` wrapper was stripped, and the value lacks the `0 0 100px` shadow geometry required by `box-shadow`.

## 5. Root cause for "no visible change"

The saved `sunGlow` value `0, 229, 255, 1` is an invalid `box-shadow` value (no `rgba()` wrapper, no offset/blur geometry `0 0 100px`), so the browser ignores the inline `box-shadow` style and the glow appears unchanged. `sunTop`/`sunLeft`/`sunSize` were not persisted (using defaults), but those affect position/size only, not glow visibility. No GSAP/CSS animation overrides `boxShadow`. The value-not-saved-in-a-valid-box-shadow-format is the root cause.

## 6. Eclipse mechanism

no — Hero schema has no eclipse/phase/shadow-percent field; `Hero/index.tsx` renders no `.eclipse-mask` element and applies no `--eclipse` variable; no eclipse "stage" exists in admin. Although `app/globals.css` defines `.eclipse-mask` and `var(--eclipse, 0%)`/keyframes, none are wired into Hero's sun or exposed in admin. No eclipse mechanism exists for Hero.

## 7. Recommended fix

- Make `sunGlow` produce a valid `box-shadow`: either require the full string `0 0 100px rgba(0,229,255,1)` in the field, or store just the color `rgba(0,229,255,1)` and compose `boxShadow = "0 0 100px " + sunGlow` in the render. The current saved value `0, 229, 255, 1` is invalid because `rgba()` was stripped.
- Investigate why `rgba(0, 229, 255, 1)` was persisted as `0, 229, 255, 1` (input sanitization stripping `rgba(`/`)`).
- Add an eclipse mechanism: expose a `sunEclipse`/`phase` (0–100) field, map it to the `--eclipse` CSS variable on the sun container, and render/apply `.eclipse-mask` so an "eclipse stage" exists in admin.

---

## Report summary

1. Files read: lib/blocks/Hero/schema.tsx, lib/blocks/Hero/index.tsx, content/page.json (one grep over lib/blocks/Hero/ and app/globals.css)
2. sunGlow CSS mapping: boxShadow (on .sun-body)
3. Hardcoded values found in .sun-body: boxShadow fallback "0 0 100px rgba(255,180,50,0.9)"; parent .space-viewport transform "translate(-50%, -50%)"
4. GSAP/CSS override found: no — GSAP animates only opacity on .sun-body (index.tsx:78); globals.css .eclipse-mask targets a different element not rendered in Hero
5. Persisted sunGlow value: "0, 229, 255, 1" (user typed rgba(0, 229, 255, 1); rgba() wrapper stripped, missing 0 0 100px geometry → invalid box-shadow)
6. Eclipse mechanism present: no
7. Root cause: saved sunGlow "0, 229, 255, 1" is an invalid box-shadow value (no rgba() wrapper, no shadow geometry), so browser ignores the inline box-shadow style → no visible change
8. Git push: [to be completed below]
