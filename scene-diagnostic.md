# Scene & Hero Sun Diagnostic — 2026-10-26

## 1. Scene Variants

| Variant key | Label | Fields rendered | String methods | Hardcoded literals | Visually distinct? |
|-------------|-------|-----------------|----------------|-------------------|-------------------|
| mystery | Mystery (тайна) | All common fields + own VariantComponent rendering | `String()` (line 116), template literal + `.trim()` (line 117) | `"SCENE "` prefix, `" // "` separator | Yes (custom variant via CUSTOM_VARIANTS) |
| truth | Truth (истина) | Common skeleton (eyebrow, heading, lead, quote, CTA) + VariantComponent | `String()` (line 116), template literal + `.trim()` (line 117) | `"SCENE "` prefix, `" // "` separator | No (uses common skeleton) |
| key | Key (ключ) | Common skeleton + VariantComponent | `String()` (line 116), template literal + `.trim()` (line 117) | `"SCENE "` prefix, `" // "` separator | No (uses common skeleton) |
| elements | Elements (стихии) | Common skeleton + VariantComponent (receives `plates` prop) | `String()` (line 116), template literal + `.trim()` (line 117) | `"SCENE "` prefix, `" // "` separator | No (uses common skeleton) |
| keepers | Keepers (хранители) | Common skeleton + VariantComponent (receives `voices` prop) | `String()` (line 116), template literal + `.trim()` (line 117) | `"SCENE "` prefix, `" // "` separator | No (uses common skeleton) |
| darkness | Darkness (тьма) | Common skeleton + VariantComponent | `String()` (line 116), template literal + `.trim()` (line 117) | `"SCENE "` prefix, `" // "` separator | No (uses common skeleton) |
| fifth | Fifth (пятый элемент) | Common skeleton + VariantComponent (receives `additional_ctas` prop) | `String()` (line 116), template literal + `.trim()` (line 117) | `"SCENE "` prefix, `" // "` separator | No (uses common skeleton) |

Notes:
- Only `mystery` is in `CUSTOM_VARIANTS` (line 77 of Scene/index.tsx); its VariantComponent renders its own content.
- All other variants (truth, key, elements, keepers, darkness, fifth) use the common skeleton rendered by Scene/index.tsx itself.
- Variant switching does NOT produce different visual output for non-mystery variants — they all share the identical common skeleton.

## 2. Slides 4–7 Inline-Edit Breakers

Variant-to-slide mapping (order in schema):
- Slide 4 → `elements` (4th variant)
- Slide 5 → `keepers` (5th variant)
- Slide 6 → `darkness` (6th variant)
- Slide 7 → `fifth` (7th variant)

| Slide | Variant | Fields that fail inline-edit | Reason |
|-------|---------|------------------------------|--------|
| 4 | elements | `plates` (name, text, color) | `contentEditable: true` in schema but passed to VariantComponent which is not yet converted to render them (D.2–D.7 pending). Not rendered as `{value}` in common skeleton. |
| 5 | keepers | `voices` (name) | `contentEditable: true` in schema but passed to VariantComponent which is not yet converted. Not rendered as `{value}` in common skeleton. |
| 6 | darkness | — | No variant-specific fields. |
| 7 | fifth | `additional_ctas` (label, href) | `contentEditable: true` in schema but passed to VariantComponent which is not yet converted. Not rendered as `{value}` in common skeleton. |

Root cause: Scene/index.tsx comment at lines 72–77 states "остальные варианты пока используют общий каркас и будут переведены на свою вёрстку в D.2–D.7" — variant-specific array fields exist in the schema and are passed to VariantComponent props, but the variant component implementations do not render them as editable values.

## 3. Scene Structure for Outline

- Flat or nested? **flat** — Scene is a single `"use client"` component. It does not use Puck slot fields or nested `<Render>` components. VariantComponent is a plain React component, not a Puck-aware slot.
- Outline tree depth for Scene: **1** — Scene appears as a single node in the Puck Outline tree.
- Can inner texts appear in Outline? **no** — Scene does not use Puck slot fields, so Puck's Outline cannot traverse into its children. The variant-specific content (headingLines, textBlocks, artifacts, plates, voices, additional_ctas) is invisible to the Outline panel.

## 4. Eclipse / Sun in Scene

- Present? **no** — Scene schema has no fields matching sun/eclipse/orb/sphere. Scene/index.tsx common skeleton renders no sun element.
- Configurable via admin? **no** — no admin fields exist for sun/eclipse in Scene.

## 5. Hero Sun Controls

- Fields present: `sunTop`, `sunLeft`, `sunSize`, `sunGlow` — all exist in Hero schema with `contentEditable: true`.
- Used in render: **yes** — schema `render()` passes all four to `<Hero>` component (lines 58–61 of Hero/schema.tsx).
- Applied how: **inline styles** — Hero/index.tsx lines 110–116 apply `top`, `left`, `width`, `height` as inline styles; line 119 applies `boxShadow` for glow via inline style.
- Functional? **yes** — all four controls are actively applied as inline styles on the `.sun-body` element. No silent no-ops.

## 6. Recommendation (short)

- variant: **keep & fix** — only `mystery` is visually distinct; the other 6 variants share an identical common skeleton and need variant-specific rendering (tasks D.2–D.7).
- slides 4–7 fix: **update variant components** (Elements, Keepers, Darkness, Fifth) to render their respective array fields (`plates`, `voices`, `additional_ctas`) as editable content so inline editing works.
- outline: **feasible via slot refactor** — converting Scene to use Puck slot fields would require significant refactor; currently depth is 1 and inner texts are invisible to Outline.
- eclipse control: **add fields** — Scene has no sun/eclipse controls; if an eclipse visual is rendered by any variant component, add corresponding admin fields.
