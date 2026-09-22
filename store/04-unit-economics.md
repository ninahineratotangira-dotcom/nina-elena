# Unit Economics — The Gate Every Product Must Pass

Most stores fail on arithmetic that was knowable on day one. Run every product idea through `tools/unit_economics.py` before you list it.

```bash
python3 store/tools/unit_economics.py --price 79 --cogs 22 --ship 8
```

---

## The four numbers that decide everything

### 1. Markup — must be **3x or better** on landed cost
Below 2.5x, paid traffic cannot be made to work at any CPM. This is not a preference, it's the arithmetic. If a supplier charges you $22, your price floor is $66.

Note the tension with `02-suppliers.md`: local AU/NZ supply runs **30–40% margins** (Spocket's own figure) versus 60%+ on China-direct. A local supplier at 35% margin means you need a *higher price point* to clear 3x. Which leads to:

### 2. Price point — target **NZ$60+**
At NZ$30 AOV, a $28 CPA is a loss. At NZ$79 AOV with 57% margin, the same $28 CPA leaves $17 profit. **Higher AOV is the single easiest lever in this business** and costs nothing to pull. Cheap products need volume you can't buy on a $2,000 budget.

### 3. Break-even ROAS = 1 ÷ gross margin
At 57% margin you need **1.74x ROAS** to break even. At 35% margin you need **2.9x**. Know your number before you launch, and put it on a sticky note on the monitor — it's the only ad metric that matters in week one.

### 4. CPA ceiling = contribution per order
Your max CPA *is* your contribution margin. Spend more than that per order and you're buying customers at a loss. The calculator prints this.

---

## Worked example (the shape you're aiming for)

Price NZ$79 · supplier cost $22 · shipping you pay $8 · not yet GST-registered:

| | |
|---|---|
| Contribution per order | **$45.50** (57.6% margin, 3.59x markup) |
| CPA at NZ benchmarks (CPM $9.01, CTR 1.58%, CVR 2%) | $28.51 |
| Profit per order | **$16.99** |
| Break-even ROAS | 1.74x |
| Orders/month to cover Shopify | 2.3 |

That's a viable product. Now the same maths on a cheap one — price $35, cost $18, ship $7, GST-registered:

| | |
|---|---|
| Contribution per order | **$3.36** |
| CPA | $28.51 |
| Profit per order | **–$25.15** |
| CVR needed to break even | 16.97% (nobody converts at 17%) |

Identical effort, identical ad spend, guaranteed loss. The difference was decided at product selection, not at ad optimisation.

---

## The GST cliff

Once you register for GST, **15% of revenue stops being yours.** In the example above, registering turns $45.50 contribution into roughly $35.20 — a 23% cut to profit overnight.

**Price GST-inclusive from day one.** If you price as if unregistered and then have to raise prices 15% at NZ$60k turnover, you'll lose conversion rate at exactly the moment you're scaling. Build it into the price now and bank the extra margin until you register.

---

## Two traffic economies, two thresholds

You picked both organic and paid. They have different bars:

| | Organic short-form | Paid Meta/TikTok |
|---|---|---|
| CPA | ~$0 (your time) | ~$28 at NZ benchmarks |
| Minimum viable margin | Anything positive | 3x markup, $60+ AOV |
| Speed to signal | 2–6 weeks | 3–7 days |
| Scales? | Unreliably — depends on the algorithm | Yes, with budget |

**Sequence them, don't run them together.** Organic first to prove people want the thing and to generate creative that already has view-count evidence. Then put paid money behind the videos that already worked organically. That's how a $500–2,000 budget survives contact with reality — you're not paying to discover which creative works, you're paying to amplify one that already did.

This is also why the hook research in `../elena-content-playbook.md` (Parts 2–4) is still useful: the finding that *the caption/offer stays constant while the visual is the variable*, tested across cheap reposts, is exactly the creative-testing method that makes a small ad budget go further.
