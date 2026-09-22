# Store Strategy — Research-Backed Build Plan

**Constraints:** starting budget under NZ$500 · market New Zealand / Australia · platform Shopify · product **duck down duvets, sold as a safe space.**

Numbers labelled **[modelled]** are estimates, not quotes. Verify before committing money. Everything else traces to `sources.md`.

---

## 1. The concept

> A bed you don't want to get out of.

The duvet is the product. The safe space is what it's for. That distinction is the whole brand — competitors sell fill power and thread count, which is a spec war you cannot win against incumbents with better buying power.

The sleep category supports this: sleep-hygiene tools are up **+134% YoY**, sleep and wellness search interest is up **285%** since early 2024, and the global sleep market runs $70.0B (2026) → $115.0B (2034). But unlike the accessory end of that market, premium bedding is **not** commoditised by TikTok dropshippers, because the unit economics and shipping weight keep them out.

That barrier works in your favour. It is also the barrier you have to solve.

## 2. The three problems, and how each is solved

### Problem 1: $500 does not buy duvets
A queen down duvet costs NZ$250–350 wholesale **[modelled]**. Your entire budget buys roughly **two.**

**Solution: sell on pre-order, fill to order.** The customer pays, then you buy. This inverts working capital — instead of $500 of stock sitting unsold, each sale funds its own cost. It is how small bedding brands actually launch, and it is legitimate provided the dispatch window is disclosed honestly (see `01-compliance-nz-au.md`).

The store is configured for this: duvet, pillow and bundle variants are created with stock at zero and `inventoryPolicy: CONTINUE`, so they remain purchasable. No pre-order app required.

### Problem 2: importing down into NZ is a biosecurity process
Feather and down are animal products. MPI requires the relevant **Import Health Standard** to be met, which can mean veterinary certification that the fibre is disease-free or processed in a specified way. For a first-time importer this is cost, delay, and a real chance of a held consignment.

**Solution: buy domestically.** **Feathers & Co** (Waikato) produce the only New Zealand duck feathers on the market, as a by-product of their duck farm — they supply My Sanctuary. **Eiderdown / Z Land Bedding** manufacture down duvets in New Zealand.

Buying from a NZ filler removes the import problem completely, cuts lead time, and hands you a genuine provenance story instead of a claimed one. **This is the single most important sourcing decision in the plan.**

### Problem 3: down content claims are actively prosecuted
The ACCC has taken s.87B undertakings from **Downia, David Jones and Harris Scarfe** over "100% down" claims — testing found 50–90% actual down content. Their defence, that AS 2479 tolerances permitted it, **failed.**

**Solution:** never claim 100% down; state the ratio your supplier certifies **on the finished product**, name the feather portion, and keep the certificate. `npm run check` blocks the phrase automatically. Full rules in `01-compliance-nz-au.md`.

## 3. Unit economics [modelled — replace with supplier quotes]

Payment processing modelled at 2.9% + $0.30.

| SKU | Cost | Retail | Gross profit | Margin |
|---|---|---|---|---|
| The Wind-Down Guide (digital) | 0 | 29 | 27.86 | 96% |
| The Silk Mask | 5.50 | 49 | 42.08 | 86% |
| The Pillow | 62 | 129 | 63.16 | 49% |
| The Duvet — Queen | 295 | 549 | 238.78 | 43% |
| The Duvet — King | 350 | 649 | 280.08 | 43% |
| **The Whole Bed — Queen** | 424 | 749 | 303.02 | 40% |

Bedding margins are structurally lower than accessories — 40–50%, not 80%. That is normal for the category and it is fine, because the **absolute profit per order is 6–10× higher.** One Safe Space sale nets more than eleven silk masks.

**Break-even:** Shopify Basic is roughly NZ$44/month. That is **one duvet sale every two months**, or two mask sales. The fixed costs are not the risk here.

## 4. Budget allocation [modelled]

| Line | Amount (NZ$) |
|---|---|
| Silk masks — 40 units, in-stock trust builder | 220 |
| Domain (1 yr) | 30 |
| Shopify Basic (promo rate, first 3 mo) | 5 |
| Supplier sample — one duvet, to photograph and verify | 0* |
| Working buffer / first ad test | 245 |
| **Total** | **500** |

\* Ask the supplier for a sample at cost or on consignment. If you must buy one outright (~$295), it comes out of the buffer and you shoot the photography yourself. **You cannot sell a $549 duvet using the supplier's stock photos** — that reads as dropshipping and kills the premium position.

## 5. The real risk, stated plainly

**Nobody pre-orders a $549 duvet from a brand with no reviews.**

This is the central problem of the whole plan, and no amount of good copy fixes it directly. A pre-order asks for high trust and gives nothing back for two weeks. From an unknown store, the conversion rate on cold traffic will be close to zero.

So the store is built as a **trust ladder**, cheapest first:

| Step | Product | Price | What it buys you |
|---|---|---|---|
| 1 | The Wind-Down Guide | $29 | An email address, and a buyer who has now paid you once |
| 2 | The Silk Mask | $49 | A real delivery, a real product in hand, a review |
| 3 | The Duvet / Safe Space | $429–849 | The actual business |

The masks are in stock and ship next day precisely so that steps 1 and 2 generate **reviews and an email list before anyone is asked for $549.** They are not really products — they are the proof that you ship.

Nobody buys the duvet first. Plan for that.

## 6. Launch sequence

1. **Week 1** — Store live. Digital guide + silk masks only. Duvet listed but marked pre-order. Zero inventory risk beyond the masks.
2. **Week 2–3** — Get a supplier sample. Shoot real photography. Collect the first reviews from mask buyers.
3. **Week 4** — Confirm the down ratio in writing and get the finished-product test certificate. Push the duvet only once you have reviews on the wall.
4. **Ongoing** — Every duvet order is filled to order and funds itself.

## 7. Risk register

| Risk | Severity | Mitigation |
|---|---|---|
| Nobody pre-orders from an unknown brand | **High** — the core risk | Trust ladder: guide → mask → duvet. Reviews before the ask |
| Down content claim breaches ACL/FTA | **High** — actively enforced | Never "100% down"; test certificate on file; `npm run check` gates it |
| Supplier can't meet the 10–15 day window | **High** — pre-order slippage is a Fair Trading Act breach | Confirm lead time in writing; notify and refund before the window passes |
| Using supplier stock photos | Medium | Kills the premium position. Shoot the sample yourself |
| Origin claim wrong ("NZ made") | Medium | Confirm down origin and assembly separately, in writing |
| Shipping cost on a 1.8kg bulky item | Medium | Price shipping into the retail price; quote real courier rates |
| Returns on a used duvet | Medium | Hygiene exclusion stated up front; faulty-goods rights unaffected |
| NZ/AU market is small | Low–Med | Real constraint, offset by far lower ad costs than the US |
