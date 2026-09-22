# MY SAFE PLACE — Brand Guide

## The name

**My Safe Place** — a store by **Reiko Gray**.

Two things are doing work here.

*My Safe Place* is written from the customer's side, not the brand's. It isn't a name describing a product; it's the thing they already call their bed in their own head. That makes the tagline almost redundant, which is the sign of a good name.

*by Reiko Gray* is the part incumbents can't copy. A duvet from a faceless brand is a commodity; a duvet from a named person is a maker's product, and a named person can answer an email. For a new store asking $549 on pre-order, **a name attached to the promise is a trust asset**, not decoration. Use it: sign the emails, sign the About page.

**Lockup:**

```
MY SAFE PLACE
by Reiko Gray
```

Set the store name as *My Safe Place*, with *by Reiko Gray* beneath it at roughly 40% the size, in Inter, letter-spaced. On narrow screens the byline drops away and the name stands alone.

## Tagline

> **The best comfort for your safe place.**

Alternatives, if you want to hear them said aloud before committing — all the same idea, different weight:

- *Comfort made for your safe place.* — slightly tighter, less superlative
- *The most comfortable place you own.* — leans on the bed itself
- *Made for the safest place in the house.* — warmer, more specific

Any of these swaps in one pass; nothing downstream depends on the wording.

> **A note on "best":** superlatives like this read as puffery and are generally fine. What is **not** fine is a *comparative* claim of fact — "warmer than down alternatives", "lasts longer than X" — which would need substantiation under the Fair Trading Act. Keep the superlative vague and the specifics factual.

> ⚠️ **Verify before committing:** check `mysafeplace.co.nz` and `reikogray.com` availability, and search the IPONZ trade mark register (and IP Australia) for conflicts in class 24 (textiles) and class 35 (retail). "My Safe Place" is a common phrase, which cuts both ways — harder to register as a trade mark, but also harder for anyone to stop you using. The distinctive, registrable asset is the **full lockup with the byline**. Do not print packaging until this is cleared.

> ⚠️ **Trading name vs legal entity:** you can trade under any name you like, but under the Fair Trading Act customers must be able to identify and contact the actual trader. *My Safe Place by Reiko Gray* is the brand; the **Contact page must still show the registered entity name and NZBN.** Both placeholders are already in `content/pages.json`.

## Positioning

> The best comfort for your safe place.

The duvet is the product. **The safe place is what it's for.**

That distinction is the entire brand. Competitors sell fill power, thread count and GSM &mdash; a spec war you cannot win against incumbents with better buying power and a decade of reviews. Nobody lies awake wishing their duvet had more loft. They want the bed to be the one place in the house where nothing is required of them.

So the product page describes specifications honestly and briefly, and everything else &mdash; the homepage, the About page, the photography &mdash; sells the refuge.

**Three things make the claim credible rather than fluffy:**

1. **Provenance.** A named North Island duck farm, down recovered as a by-product, never live-plucked. Safety as a concept only works if the thing itself is above board.
2. **Made to order.** It's filled for you, over a fortnight. That is the opposite of a warehouse pallet, and it justifies the price without a discount war.
3. **Cancel any time before it ships.** A safe space that traps your money isn't one. This line is also the single strongest answer to the pre-order trust problem.

**Target customer:** 28&ndash;50, NZ/AU, owns or rents a place they care about, has just moved or just decided to stop putting up with the flat duvet from their twenties. Buys few things, well. Will pay $549 once rather than $180 three times.

**What we never do:** fear-sell tiredness, imply health outcomes, or run a permanent fake sale. All three are the cheap end of this category, and two of them are illegal.

## Voice

Quiet, plain, a little wry. Never clinical, never wellness-guru, never shouty.

- **Short sentences.** The brand is about slowing down — the copy should feel that way.
- **Describe the sensation,** not the science. "Cool against the skin," not "thermoregulatory."
- **Never fear-sell.** No "sleep deprivation is killing you." That is both ugly and a regulatory risk.
- **Admit what it isn't.** Honesty converts better than hype and is safer.

Taglines live in their own section above. For the bedding specifically, the supporting line is: **Filled for you, in New Zealand.**

## Design direction

**Elegant, minimal, light.** The restraint *is* the luxury signal. Competing brands in this category reach for gold foil and moody darkness; the expensive-looking ones do the opposite — warm off-white, enormous whitespace, hairlines instead of cards, and an accent used almost never.

Four rules carry the whole look:

1. **Space over ornament.** Section padding is generous to the point of feeling excessive on a laptop. Crowding is what reads as cheap.
2. **Hairlines, not boxes.** Cards, borders, shadows and rounded corners are all removed from Dawn. A 1px rule at 10% opacity does the separating.
3. **Two text tones only.** Ink and stone. A third tone is a decision you don't need to make.
4. **No pure black, no pure white.** `#000` and `#FFF` read as clinical. Everything is warmed slightly.

## Palette

Light by default, with a warm dark mode for late browsing.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--msp-linen` | `#FAF8F5` | `#151412` | Page background |
| `--msp-porcelain` | `#F3EFE9` | `#1E1C19` | Image wells, raised areas |
| `--msp-ink` | `#1B1917` | `#F2EEE8` | Headings, body, buttons |
| `--msp-stone` | `#6E675E` | `#A49B90` | Secondary text, captions, nav |
| `--msp-faint` | `#847C70` | `#7C746A` | **Large text only** — never body |
| `--msp-clay` | `#9A6F4F` | `#C08F66` | Focus ring and sale price. Nothing else |

**Contrast, measured not guessed:**

| Pair | Light | Dark | |
|---|---|---|---|
| ink on linen | **16.5:1** | **15.9:1** | AA body ✓ |
| stone on linen | **5.3:1** | **6.7:1** | AA body ✓ |
| faint on linen | 3.9:1 | 4.0:1 | AA large only — restricted in CSS |

An earlier candidate for `faint` (`#9C948A`) tested at 2.82:1 and was rejected. If you add a tone, measure it — a palette that fails AA is a legal accessibility exposure as well as an ugly one.

## Type

| Role | Face | Weight |
|---|---|---|
| Display | **Cormorant Garamond** | 300 |
| Body & UI | **Jost** | 300 / 400 / 500 |

Both free on Google Fonts. Cormorant at 300 is delicate and high-contrast — beautiful large, unreadable small, so it is used **only** for headings, prices and product names. Jost carries everything else: geometric, slightly fashion-adjacent, quiet.

**The micro-label** does more work than any other element. Small, uppercase, letter-spaced to `0.22em`, in stone — used for section eyebrows and spec headings (`.msp-label`). It is the single detail that makes a page read as considered rather than templated.

**Specification lists are hairline-separated rows, not bullets.** Bullets are a catalogue convention; rules read as a spec sheet, which is what a $549 purchase wants.

## Preview

`theme/preview.html` renders the whole system standalone — lockup, product grid, product page, palette, dark mode toggle. Rebuild it after any CSS change:

```bash
cd store/theme && node build-preview.mjs
```

## Photography direction

Light, soft, unhurried. **Daylight, not lamplight** — the old dark-brand direction (deep shadow, single warm source) would fight the theme and read as moody rather than expensive.

- **Overexposed rather than underexposed.** Soft north-facing window light, bright shadows, nothing crushed to black.
- **Linen, not satin.** Texture reads as quality; sheen reads as polyester.
- **Rumpled, not styled.** Made-but-lived-in. A perfectly smoothed bed looks like a showroom; a slightly thrown-back duvet looks like somewhere someone sleeps.
- **Negative space is the composition.** Let the duvet occupy a third of the frame. This is the single biggest difference between a $99 look and a $549 look.
- **Never** the category cliché: a smiling woman in white sheets at sunrise, arms stretched overhead. It signals dropshipper instantly.

**You cannot sell a $549 duvet on supplier stock photos.** Get a sample and shoot it. This is the highest-leverage spend in the whole plan.

Shot list:
1. **The hero** — duvet thrown back, unmade, soft side light. Slept in, not staged
2. **The weight** — pulled up under a chin, face mostly out of frame
3. **Baffle box detail** — raking light across the chambers so the construction reads
4. **The fill** — macro of down against cotton
5. **The label** — the fill composition tag, shot close. Nobody else photographs this, and it is a trust signal precisely because it is checkable
6. **The set** — duvet, two pillows, mask laid out, overhead, on linen

Higgsfield can generate the atmospheric and room shots for the homepage. The **product itself must be the real sample** — generated duvet photography that doesn't match what arrives is a Fair Trading Act problem, not just a taste one.
