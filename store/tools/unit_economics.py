#!/usr/bin/env python3
"""
AU/NZ dropshipping unit economics calculator.

Answers the only question that matters before you spend money:
at realistic AU/NZ traffic costs, can this product make a profit?

Defaults are the CONSERVATIVE end of the Sep-2026 AU/NZ benchmarks in
../01-market-brief-au-nz.md. If it works on these numbers, it works.

Usage:
    python3 unit_economics.py --price 79 --cogs 22 --ship 8
    python3 unit_economics.py --price 79 --cogs 22 --ship 8 --cvr 2.5 --cpm 9
    python3 unit_economics.py --help

No dependencies. Python 3.8+.
"""

import argparse

# Sep-2026 AU/NZ benchmarks (see 01-market-brief-au-nz.md for sources)
DEFAULT_CPM = 9.01        # NZ Meta CPM, all-advertiser average (USD). AU ~11.04.
DEFAULT_CTR = 1.58        # AU/NZ ecommerce CTR, Q2 2026 (%)
DEFAULT_CVR = 2.0         # Store conversion rate (%). New stores commonly do 1-2%.
DEFAULT_GST = 15.0        # NZ. Use 10 for AU.
DEFAULT_FEE_PCT = 2.9     # Shopify Payments % (NZ rate UNVERIFIED - AU Basic is ~1.75%)
DEFAULT_FEE_FIXED = 0.30
DEFAULT_FIXED_MONTHLY = 39.0   # Shopify Basic
DEFAULT_REFUND_RATE = 3.0      # % of orders refunded/lost


def money(x):
    return f"{x:>9,.2f}"


def pct(x):
    return f"{x:>8.2f}%"


def main():
    p = argparse.ArgumentParser(
        description="AU/NZ dropshipping unit economics",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    p.add_argument("--price", type=float, required=True, help="Sell price shown to customer (GST-inclusive)")
    p.add_argument("--cogs", type=float, required=True, help="What the supplier charges you per unit")
    p.add_argument("--ship", type=float, default=0.0, help="Shipping cost you pay per order")
    p.add_argument("--ship-charged", type=float, default=0.0, help="Shipping you charge the customer")
    p.add_argument("--gst", type=float, default=DEFAULT_GST, help="GST %% (NZ 15, AU 10)")
    p.add_argument("--gst-registered", action="store_true",
                   help="Set if GST-registered: GST is remitted, not kept")
    p.add_argument("--fee-pct", type=float, default=DEFAULT_FEE_PCT, help="Payment processing %%")
    p.add_argument("--fee-fixed", type=float, default=DEFAULT_FEE_FIXED, help="Payment processing fixed fee")
    p.add_argument("--refund-rate", type=float, default=DEFAULT_REFUND_RATE, help="Refund/loss rate %%")
    p.add_argument("--cpm", type=float, default=DEFAULT_CPM, help="Ad CPM")
    p.add_argument("--ctr", type=float, default=DEFAULT_CTR, help="Ad CTR %%")
    p.add_argument("--cvr", type=float, default=DEFAULT_CVR, help="Store conversion rate %%")
    p.add_argument("--fixed-monthly", type=float, default=DEFAULT_FIXED_MONTHLY, help="Fixed monthly costs")
    a = p.parse_args()

    revenue = a.price + a.ship_charged

    # GST: if registered, it is collected on behalf of IRD/ATO and is not yours.
    gst_out = revenue - (revenue / (1 + a.gst / 100)) if a.gst_registered else 0.0
    net_revenue = revenue - gst_out

    payment_fee = revenue * a.fee_pct / 100 + a.fee_fixed
    variable_cost = a.cogs + a.ship + payment_fee
    contribution = net_revenue - variable_cost

    # Refund drag: refunded orders lose COGS+ship and the payment fixed fee.
    refund_drag = (a.refund_rate / 100) * (a.cogs + a.ship + a.fee_fixed)
    contribution_after_refunds = contribution - refund_drag

    margin_pct = contribution_after_refunds / revenue * 100 if revenue else 0
    markup = a.price / a.cogs if a.cogs else float("inf")

    # Traffic maths
    cpc = a.cpm / 1000 / (a.ctr / 100) if a.ctr else float("inf")
    cpa = cpc / (a.cvr / 100) if a.cvr else float("inf")
    visitors_per_order = 100 / a.cvr if a.cvr else float("inf")

    profit_per_order = contribution_after_refunds - cpa
    breakeven_roas = revenue / contribution_after_refunds if contribution_after_refunds > 0 else float("inf")
    actual_roas = revenue / cpa if cpa else 0
    max_cpa = contribution_after_refunds
    required_cvr = cpc / max_cpa * 100 if max_cpa > 0 else float("inf")
    orders_to_cover_fixed = (a.fixed_monthly / profit_per_order) if profit_per_order > 0 else float("inf")

    print()
    print("=" * 58)
    print("  PER ORDER")
    print("=" * 58)
    print(f"  Revenue (price + shipping charged) {money(revenue)}")
    if a.gst_registered:
        print(f"  Less GST remitted ({a.gst:.0f}%)          -{money(gst_out)}")
    print(f"  Less product cost                 -{money(a.cogs)}")
    print(f"  Less shipping you pay             -{money(a.ship)}")
    print(f"  Less payment fees                 -{money(payment_fee)}")
    print(f"  Less refund drag ({a.refund_rate:.1f}%)           -{money(refund_drag)}")
    print("  " + "-" * 44)
    print(f"  CONTRIBUTION per order             {money(contribution_after_refunds)}")
    print(f"  Margin on revenue                  {pct(margin_pct)}")
    print(f"  Markup on cost                     {markup:>8.2f}x")
    print()
    print("=" * 58)
    print(f"  TRAFFIC  (CPM {a.cpm:.2f} / CTR {a.ctr:.2f}% / CVR {a.cvr:.2f}%)")
    print("=" * 58)
    print(f"  Cost per click                     {money(cpc)}")
    print(f"  Visitors needed per order          {visitors_per_order:>9,.0f}")
    print(f"  Cost per acquisition (CPA)         {money(cpa)}")
    print(f"  Max CPA you can afford             {money(max_cpa)}")
    print()
    print("=" * 58)
    print("  VERDICT")
    print("=" * 58)
    print(f"  Break-even ROAS needed             {breakeven_roas:>9.2f}x")
    print(f"  ROAS at these assumptions          {actual_roas:>9.2f}x")
    print(f"  CVR needed just to break even      {pct(required_cvr)}")
    print(f"  PROFIT PER ORDER                   {money(profit_per_order)}")
    if profit_per_order > 0:
        print(f"  Orders/mo to cover fixed costs     {orders_to_cover_fixed:>9,.1f}")
    print()

    if markup < 2.5:
        print("  [X] MARKUP TOO LOW. Under 2.5x, paid traffic cannot work.")
        print("      Either find a cheaper supplier or raise the price.")
    if contribution_after_refunds <= 0:
        print("  [X] NEGATIVE CONTRIBUTION before a cent of ad spend. Dead product.")
    elif profit_per_order <= 0:
        print("  [X] LOSS PER ORDER at these traffic assumptions.")
        print(f"      You need CVR above {required_cvr:.2f}% or a higher price.")
        print("      Organic video traffic (CPA = 0) is the only way this works.")
    elif profit_per_order < 10:
        print("  [!] THIN. Profitable but fragile - one CPM rise kills it.")
        print("      Fine for organic. Risky for paid.")
    else:
        print("  [OK] Viable on paid traffic at conservative AU/NZ benchmarks.")
    print()
    print("  Reality check: these are medians. Your first campaign will be")
    print("  worse. Test with organic video before paying for traffic.")
    print()


if __name__ == "__main__":
    main()
