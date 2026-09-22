# Theme

Brand layer for Shopify's free **Dawn** theme. Dawn is well-built, fast and free — restyling it beats paying $300+ for a premium theme you'd then have to customise anyway.

## Install

1. **Online Store → Themes → Add theme → Dawn** (if not already installed)
2. **⋯ → Edit code → Assets → Add a new asset** → upload `assets/my-safe-place.css`
3. Open `layout/theme.liquid`, and immediately before `</head>` add:

   ```liquid
   {{ 'my-safe-place.css' | asset_url | stylesheet_tag }}
   ```

4. Also before `</head>`, add the fonts:

   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
   ```

5. **Theme settings → Colors:** set the background to `#FAF8F5` so the theme editor preview matches

## What it does

Elegant, minimal, light — see `../brand/brand-guide.md` for the reasoning.

- Warm off-white palette; no pure black or white anywhere
- Cormorant Garamond display against Jost body
- **Strips Dawn's chrome**: card backgrounds, borders, shadows and rounded corners all removed. Hairlines do the separating
- Generous section padding — the whitespace is the luxury signal
- Spec lists render as hairline-separated rows rather than bullets
- The header renders the `by Reiko Gray` byline automatically beneath the store name, and drops it on narrow screens
- Styles the medical disclaimer as a quiet footnote
- Warm dark mode via `prefers-color-scheme`, overridable with `data-msp-theme`
- Respects `prefers-reduced-motion`
- Contrast verified: ink 16.5:1, stone 5.3:1 — both WCAG AA body

## Preview it first

```bash
node build-preview.mjs && open preview.html
```

Renders the full system with no Shopify install. Re-run after any CSS change.

## Homepage section order

In the theme editor, arrange sections in this order:

1. **Image banner** — dark product shot, headline *"Wind down properly."*, CTA → The Ritual
2. **Featured collection** → `Start Here`
3. **Rich text** — the positioning line from the brand guide
4. **Featured product** → The Ritual (the bundle is the conversion target)
5. **Multicolumn** — three points: made in NZ, ships in days, four products not forty
6. **Email signup** — offer the first chapter of the Protocol free

> Product photography: see the shot list in `../brand/brand-guide.md`. Avoid the category's visual cliché (a smiling woman in white sheets at sunrise) — it reads as dropshipper instantly.
