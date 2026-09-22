# Market Brief — AU/NZ Dropshipping, September 2026

Everything below is sourced. Where sources disagree, I've said so rather than picking the flattering number.

---

## 1. The rule change that reshaped this business

**The US $800 de minimis exemption is gone.** Suspended for China/Hong Kong on 2 May 2025, then for **all countries** on 29 August 2025. Low-value parcels into the US now carry duty (roughly 30% via commercial carriers, or a flat per-item fee on postal parcels). By Q2 2026, sub-$800 parcel volume into the US had fallen ~54% — about 740 million parcels a year gone.

**Why this matters to you even though you're selling AU/NZ:**

1. It kills the "AliExpress → US customer" model that every dropshipping guru on YouTube still teaches. Most content you'll find online is now describing a business that no longer works. Discount it accordingly.
2. It pushed a wave of sellers *out* of the US market and into ours. Expect competition in AU/NZ to rise through 2026–27. Moving now is an advantage.
3. AU and NZ still have functioning low-value thresholds (below), so the AU/NZ-domestic model still works. That's the gap you're stepping into.

Sources: [Practical Ecommerce](https://www.practicalecommerce.com/ecommerce-after-de-minimis-tariff-exemption) · [Tariffs Tool: de minimis ended](https://www.tariffstool.com/guides/de-minimis-exemption-ended-2026) · [Northstar 2026 Tariff Guide](https://nstarfinance.com/resources/ecommerce-tariff-guide-2026)

---

## 2. Your thresholds (NZ and AU)

| | New Zealand | Australia |
|---|---|---|
| GST rate | 15% | 10% |
| GST registration threshold | NZ$60,000 turnover in any 12 months | A$75,000 turnover |
| "Low value goods" import threshold | NZ$1,000 (ex-GST) | A$1,000 |
| Who collects GST on imports under that | Overseas supplier at point of sale (if over the $60k threshold) | Overseas supplier at point of sale |
| Regulator | IRD (tax), Commerce Commission (trading) | ATO (tax), ACCC (trading) |

**The threshold is forward-looking in NZ.** IRD requires registration when taxable supplies exceed *or are likely to exceed* NZ$60,000 in any 12-month period — you can't wait until you've banked it.

**Flagged for verification before you scale:** one source indicates that from **1 April 2026** a low-value goods levy applies to all freight imports ≤NZ$1,000. Confirm the current position directly with NZ Customs before you build landed-cost assumptions on imported stock — this is exactly the kind of detail that turns a 35% margin into a 20% one.

Sources: [IRD — low value imported goods](https://www.ird.govt.nz/gst/gst-for-overseas-businesses/gst-on-low-value-imported-goods) · [Zonos NZ guide](https://zonos.com/docs/guides/country-guides/new-zealand) · [calculate.co.nz GST on imports](https://www.calculate.co.nz/gst-on-imports.php)

---

## 3. What traffic actually costs here

This is the best news in the brief. AU/NZ is one of the cheapest developed-market ad environments.

| Metric | NZ | AU | US (comparison) |
|---|---|---|---|
| Meta CPM, all advertisers | ~US$9.01 | ~US$11.04 | ~US$16 |
| Meta CPM, ecommerce median (Emplifi, Q2 2026) | $2.00–2.60 | $2.00–2.60 | — |
| Meta CPC, ecommerce (Emplifi, Q2 2026) | ~$0.13 | ~$0.13 | — |
| Ecommerce CTR (Q2 2026) | ~1.58% | ~1.58% | — |
| Instagram median post engagement | ~1.9% | ~1.9% | — |
| Facebook median post engagement | ~0.5% | ~0.5% | — |

**NZ impressions are roughly 44% cheaper than US and ~23% cheaper than AU.**

**Honest caveat on the discrepancy:** the two CPM figures differ by 4–5x because they measure different populations (Lebesgue's is an all-advertiser average including high-CPM verticals like finance; Emplifi's is a median across ecommerce brand profiles and may exclude some placements). **Plan on the higher number.** If you budget at US$9–11 CPM and reality comes in at $3, you're pleasantly surprised. Budget at $2.50 and you run out of money in week two. `tools/unit_economics.py` defaults to the conservative figure.

**Implication for your plan:** Instagram engagement is ~4x Facebook's here. Organic effort goes to Instagram Reels and TikTok, not Facebook posts. Facebook is a *paid* channel in this market, not an organic one.

Sources: [Emplifi AU/NZ Ecommerce Benchmarks Q2 2026](https://emplifi.io/resources/q2-2026-ecommerce-australia-and-new-zealand-benchmarks/) · [Lebesgue: Facebook CPM by country](https://lebesgue.io/facebook-ads/facebook-cpm-by-country) · [Adamigo: Meta CPM/CPC by country 2026](https://www.adamigo.ai/blog/meta-ads-cpm-cpc-benchmarks-by-country-2026)

---

## 4. What's working in 2026 (and what isn't)

**Working:**
- **Hyper-specialisation.** The consensus across 2026 supplier and tooling sources: general stores are dead, micro-niches serving a specific community win. Product selection is repeatedly cited as ~80% of the outcome.
- **Domestic fulfilment.** Local warehousing is now the default expectation, not a premium feature. Global platforms (CJ, Zendrop) have added AU warehouses specifically because of this.
- **Organic-first validation.** Short-form video proves demand at zero media cost before ad spend. This matches the traffic mix you picked.

**Not working:**
- China-direct to US (see §1).
- Oversaturated categories: phone cases, generic jewellery, generic fitness gear.
- "One-product store, $50/day on ads, see what happens." At NZ CPMs that's ~5,500 impressions/day at US$9 CPM. You need creative volume, not budget volume.

**Named as growing with less competition in 2026:** biohacking & recovery, pet, home decor, baby, outdoor, car accessories, and functional beauty (serums with documented actives — hyaluronic acid, retinol, vitamin C, kojic acid).

Sources: [CJ — 2026 niches for Shopify & TikTok](https://cjdropshipping.com/blogs/dropshipping-niches/Dropshipping-Niches-for-Shopify-TikTok) · [Trendtrack: top niches 2026](https://www.trendtrack.io/blog-post/top-10-dropshipping-niches-for-2026) · [EarnifyHub: is dropshipping still worth it 2026](https://earnifyhub.com/blog/dropshipping/is-dropshipping-still-worth-it-2026)

---

## 5. Platform costs

| Item | Cost |
|---|---|
| Shopify Basic | US$39/mo, or US$29/mo billed annually |
| Shopify Payments (AU, Basic) | ~1.75% + A$0.30 domestic cards |
| Shopify Payments (NZ, Basic) | **Verify on Shopify's NZ page — I could not confirm the current rate** |
| Third-party gateway surcharge (Basic) | +2% on top of the gateway's own fee |
| Domain | ~NZ$20–40/yr |
| Theme | $0 (Dawn is free and converts fine) — do not buy a theme in month one |

Use Shopify Payments, not a third-party gateway. The 2% surcharge on Basic is pure loss.

Sources: [Shopify pricing 2026](https://commerce-ui.com/insights/shopify-pricing) · [Shopify pricing AU](https://www.whitepeakdigital.com/blog/how-much-does-shopify-cost-in-australia/) · [Shopify Payments NZ (official)](https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/new-zealand)
