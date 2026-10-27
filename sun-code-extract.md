# Sun Code Extract — 2026-10-26

## 1. JSX — .sun-body block

Verbatim JSX from `lib/blocks/Hero/index.tsx`, lines 124–147 (the "CSS Eclipse Sphere" block containing the viewport, corona, sun body, eclipse overlay, and moon):

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
        <div className="sun-body relative absolute inset-0 rounded-full" style={{ boxShadow: `0 0 ${props.sunGlowSize ?? 100}px rgba(${glowColorMap[props.sunGlowColor ?? "neon-cyan"] ?? "0, 229, 255"}, ${props.sunGlowOpacity ?? "0.75"})` }} />
        {props.eclipsePercent && props.eclipsePercent > 0 && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              backgroundColor: `rgba(${eclipseColorMap[props.eclipseColor ?? "cosmic-black"] ?? "10, 10, 15"}, ${props.eclipsePercent / 100})`,
            }}
            aria-hidden="true"
          />
        )}
        <div className="moon-body" />
      </div>
```

Exact className lists:
- `.space-viewport`: `"space-viewport absolute z-20 pointer-events-none mix-blend-mode-screen"` (line 126)
- `.corona-flares`: `"corona-flares"` (line 135)
- `.sun-body`: `"sun-body relative absolute inset-0 rounded-full"` (line 136)
- eclipse overlay div: `"absolute inset-0 rounded-full pointer-events-none"` (lines 138–139)
- `.moon-body`: `"moon-body"` (line 146)

Inline styles on `.space-viewport` (lines 127–133): `top`, `left`, `width`, `height` (from `sunTop`/`sunLeft`/`sunSize` props with defaults `"40%"`/`"50%"`/`"400px"`), `transform: "translate(-50%, -50%)"`.

Inline style on `.sun-body` (line 136): `boxShadow` template literal composing `0 0 ${size}px rgba(${colorMap[color]}, ${opacity})`.

## 2. JSX — any second-disk / eclipse element

**yes — second disk/eclipse rendered in JSX.**

- `.moon-body` is rendered at line 146 inside `.space-viewport`, after the sun body and after the Task [15] eclipse overlay.
- `.eclipse-mask` CSS class exists in `app/globals.css` (lines 121–131) but is **NOT rendered** in Hero JSX — it is defined but unused in the component.

## 3. GSAP — full timeline code

Verbatim GSAP/ScrollTrigger code from `lib/blocks/Hero/index.tsx`, lines 74–96:

```tsx
  useGSAP(() => {
    // Intro animation
    gsap.fromTo(".hero-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      }
    });

    // Fade out text and HUD; keep Zorg background fully visible
    tl.to(".hero-text, .hero-desk-ui", { opacity: 0, duration: 1 }, 0);

    // Dark overlay 80% for transition
    tl.to(".hero-dark-overlay", { opacity: 0.8, duration: 1 }, 0);

    // Brighten the Sun (fade in to full brightness)
    tl.to(".sun-body", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 1);
  }, { scope: rootRef });
```

GSAP calls captured:
1. `gsap.fromTo(".hero-text", ...)` — line 76 (intro fade-in, not scroll-driven)
2. `gsap.timeline({ scrollTrigger: {...} })` — lines 78–86 (the scroll timeline)
3. `tl.to(".hero-text, .hero-desk-ui", { opacity: 0, duration: 1 }, 0)` — line 89 (fade out text/HUD at scroll start)
4. `tl.to(".hero-dark-overlay", { opacity: 0.8, duration: 1 }, 0)` — line 92 (darken overlay at scroll start)
5. `tl.to(".sun-body", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 1)` — line 95 (sun brightens at scroll offset 1)

ScrollTrigger config: `trigger: rootRef.current`, `start: "top top"`, `end: "+=150%"`, `pin: true`, `scrub: 1`.

## 4. CSS — global rules and keyframes

Verbatim rules from `app/globals.css`:

**`.eclipse-mask`** (lines 121–131):
```css
.eclipse-mask {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 65% 35%,
    var(--color-cosmic-black) calc(var(--eclipse, 0%) - 10%),
    rgba(10, 10, 15, 0.9) var(--eclipse, 0%),
    transparent calc(var(--eclipse, 0%) + 15%)
  );
}
```

**`.space-viewport`** (lines 146–163):
```css
.space-viewport {
  position: absolute;
  top: 40%; /* Raised sun */
  left: 50%;
  transform: translate(-50%, -50%);
  width: 222px; /* 5% smaller */
  height: 222px;
  pointer-events: none;
  mix-blend-mode: screen;
  z-index: 20;
}
@media (min-width: 768px) {
  .space-viewport {
    top: 40%; /* Raised sun */
    width: 400px;
    height: 400px;
  }
}
```

**`.sun-body`** (line 164):
```css
.sun-body { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #ffffff 0%, #ffeebb 20%, #ff9900 50%, #a03000 85%, transparent 100%); box-shadow: 0 0 100px rgba(255,180,50,0.9), 0 0 200px rgba(255,120,0,0.5), inset -12px -12px 40px rgba(0,0,0,0.5); transition: background 0.7s ease; opacity: 0.05; }
```

**`.moon-body`** (line 165):

## 5. HeroProps — sun-related fields

Sun-related props (from `lib/blocks/Hero/schema.tsx` fields + `defaultProps`, passed through `lib/blocks/Hero/index.tsx` `HeroProps` type, lines 39–46):

| Prop | Type | Default |
|---|---|---|
| sunTop | string | "40%" |
| sunLeft | string | "50%" |
| sunSize | string | "400px" |
| sunGlowColor | string ("neon-cyan" / "egyptian-gold" / "eclipse-orange" / "white") | "neon-cyan" |
| sunGlowSize | number | 100 |
| sunGlowOpacity | string ("0.25" / "0.5" / "0.75" / "1") | "0.75" |
| eclipsePercent | number | 0 |
| eclipseColor | string ("cosmic-black" / "egyptian-gold" / "eclipse-orange") | "cosmic-black" |

These map in `index.tsx` as follows: `sunTop`/`sunLeft`/`sunSize` → `.space-viewport` inline `top`/`left`/`width`/`height`; `sunGlowColor`/`sunGlowSize`/`sunGlowOpacity` → `.sun-body` inline `boxShadow`; `eclipsePercent`/`eclipseColor` → Task [15] eclipse overlay div (rendered when `eclipsePercent > 0`).

## 6. Full scroll timeline (visual description)

- **At scroll position 0 (top):** Sun body is at `opacity: 0.05` (CSS default) — nearly invisible. Text (`.hero-text`) and HUD (`.hero-desk-ui`) are fully visible. Dark overlay (`.hero-dark-overlay`) is at `opacity: 0`. The page section is pinned (`pin: true`).
- **At mid scroll (0 → 150% of viewport):** Text and HUD fade from `opacity: 1` to `0` (line 89). Dark overlay fades from `0` to `0.8` (line 92). The sun body fades in from near-invisible to full brightness (`opacity: 1`, line 95, starting at scroll offset `1`). Everything is scrubbed 1:1 with scroll (`scrub: 1`).
- **At end scroll (+=150%):** Text/HUD fully faded out, dark overlay at 0.8, sun at full brightness `opacity: 1`. Section remains pinned for the duration of the 150vh range.
- **Total scroll range:** 150 vh (`end: "+=150%"`).

## 7. Files and lines

- `lib/blocks/Hero/index.tsx`: lines 39–46 (HeroProps sun fields), 49–60 (glow/eclipse color maps), 74–96 (GSAP timeline), 124–147 (sun JSX block)
- `app/globals.css`: lines 105–117 (@keyframes grain, hud-pulse), 121–131 (.eclipse-mask), 146–166 (.space-viewport, .sun-body, .moon-body, .corona-flares)

## 8. Notes

- Task [15] added an extra eclipse overlay (eclipsePercent/eclipseColor) rendered inside `.space-viewport` at lines 137–145 of `index.tsx`. This overlay may be redundant with the existing `.moon-body` second disk (line 146) and the `.eclipse-mask` CSS rule (lines 121–131 of globals.css), which is defined but not rendered in Hero JSX. User should decide whether to keep the Task [15] overlay, the `.moon-body` disk, or the `.eclipse-mask` approach.
- No changes were made to any source file in this task.
```css
.moon-body { position: absolute; inset: 0.25%; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #1a1a20 0%, #050508 65%, #000 100%); transform: translate(120%, -100%) scale(0.4); transition: transform 1.1s cubic-bezier(0.4, 0, 0.2, 1); }
```

**`.corona-flares`** (line 166):
```css
.corona-flares { position: absolute; inset: -55%; border-radius: 50%; opacity: 0; background: radial-gradient(circle, #fff 15%, rgba(0,245,255,0.5) 42%, transparent 78%); mix-blend-mode: screen; transition: opacity 0.7s ease; display: none; }
```

**@keyframes** (lines 105–117):
```css
@keyframes grain {
  0% { transform: translate(0, 0); }
  16.67% { transform: translate(20%, -20%); }
  33.33% { transform: translate(-20%, 20%); }
  50% { transform: translate(20%, 20%); }
  66.67% { transform: translate(-20%, -20%); }
  83.33% { transform: translate(20%, -20%); }
  100% { transform: translate(0, 0); }
}
@keyframes hud-pulse {
  0%, 100% { box-shadow: 0 0 12px rgba(0, 229, 255, 0.3); }
  50% { box-shadow: 0 0 24px rgba(0, 229, 255, 0.6); }
}
```

No `@keyframes` references sun/eclipse/disk/corona directly. `hud-pulse` references neon-cyan color but targets HUD, not sun.

CSS rules captured count: 5 (`.eclipse-mask`, `.space-viewport` + media query, `.sun-body`, `.moon-body`, `.corona-flares`) plus 2 keyframes (`grain`, `hud-pulse`).