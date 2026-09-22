# Theme

Brand layer for Shopify's free **Dawn** theme. Dawn is well-built, fast and free — restyling it beats paying $300+ for a premium theme you'd then have to customise anyway.

## Install

1. **Online Store → Themes → Add theme → Dawn** (if not already installed)
2. **⋯ → Edit code → Assets → Add a new asset** → upload `assets/my-safe-place.css`
3. Open `layout/theme.liquid`, and immediately before `</head>` add:

   ```liquid
   {{ 'my-safe-place.css' | asset_url | stylesheet_tag }}
   ```

4. **Theme settings → Typography:** Headings `Fraunces`, Body `Inter`
5. **Theme settings → Colors:** set the background to `#0F1420` so the theme editor preview matches

## What it does

- Dark-first palette from `../brand/brand-guide.md`
- Serif headings (Fraunces) against neutral body text (Inter)
- Styles the mandated medical disclaimer as a quiet footnote rather than body copy
- Constrains long-form text to a readable measure
- Respects `prefers-reduced-motion` and `prefers-color-scheme: light`
- Focus rings meet WCAG AA — `--bone` on `--ink` is ~15.8:1

## Homepage section order

In the theme editor, arrange sections in this order:

1. **Image banner** — dark product shot, headline *"Wind down properly."*, CTA → The Ritual
2. **Featured collection** → `Start Here`
3. **Rich text** — the positioning line from the brand guide
4. **Featured product** → The Ritual (the bundle is the conversion target)
5. **Multicolumn** — three points: made in NZ, ships in days, four products not forty
6. **Email signup** — offer the first chapter of the Protocol free

> Product photography: see the shot list in `../brand/brand-guide.md`. Avoid the category's visual cliché (a smiling woman in white sheets at sunrise) — it reads as dropshipper instantly.
