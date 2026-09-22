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

## Palette

Dark-first — a sleep brand that blinds you with a white screen has failed at the first hurdle.

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0F1420` | Background (primary) |
| `--ink-soft` | `#1A2030` | Cards, raised surfaces |
| `--bone` | `#F4F1EA` | Primary text on dark |
| `--dusk` | `#5B6B9E` | Accent, links |
| `--ember` | `#C9A227` | CTA, price, sparingly |
| `--mute` | `#8A93A8` | Secondary text |

Contrast: `--bone` on `--ink` ≈ 15.8:1, `--mute` on `--ink` ≈ 6.4:1, both clearing WCAG AA.

## Type

- Headings: **Fraunces** or **Instrument Serif** — warmth, editorial, not corporate
- Body: **Inter** — neutral, highly legible at small sizes
- Both free on Google Fonts, both load fast

## Photography direction

Low light, deep shadow, single warm source. Rumpled, lived-in, never styled-flat. Never a stock-photo woman smiling in white sheets at sunrise &mdash; that is the visual cliché of the entire category and reads as dropshipper instantly.

**You cannot sell a $549 duvet on supplier stock photos.** Get a sample, shoot it yourself. This is the highest-leverage $295 in the whole plan.

Shot list:
1. **The hero** &mdash; duvet thrown back, unmade, morning light from one side. It should look slept in, not staged
2. **The weight** &mdash; someone pulling it up under their chin, face mostly out of frame
3. **Baffle box detail** &mdash; raking light across the chambers so the construction reads
4. **The fill** &mdash; macro of down against the cotton casing
5. **The label** &mdash; the fill composition tag, shot close. Nobody else photographs this, and it is a trust signal precisely because it is checkable
6. **The set** &mdash; duvet, two pillows, mask laid out on a dark bed, overhead

Higgsfield can generate the atmospheric shots (rooms, light, mood) for the homepage. The **product itself must be the real sample** &mdash; generated duvet photography that doesn't match what arrives is a Fair Trading Act problem, not just a taste one.
