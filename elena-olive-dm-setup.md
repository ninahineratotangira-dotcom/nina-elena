# Setting up automated DMs for the OLIVE keyword
Written 21 Sep 2026. Follows on from the page audit (section 7, item 3: "Build the DM funnel").

---

## 1. How it actually works

There is no "reply to comments" bot. Every legitimate comment-to-DM tool — Meta's own and every third party — uses the same Meta endpoint, the **private reply**. Someone comments on your reel, and you get the right to send that person exactly one direct message. The rules are Meta's, not the tool's, so they apply identically whichever route you pick:

| Rule | Number |
|---|---|
| Private replies per comment | **1** |
| Time limit to send it | **7 calendar days** from the comment timestamp |
| Automated DMs to the same person from comment/story triggers | **1 per 24 hours** (new in 2026) |
| Private reply API rate limit | 750/hour per account |
| After that one message | You can only message again if *they* reply, which opens a 24-hour window |

The 24-hour reply window is the part that matters most for Elena, and section 4 below is built around it.

**Prerequisite:** the account must be a Professional account (Creator or Business) in Settings → Account type. A personal account cannot do any of this. Some automations also want a linked Facebook Page — if Business Suite shows no Automations tab, that's why.

---

## 2. Option A — free, Meta's own, set up in ten minutes

Meta Business Suite (desktop only, business.facebook.com) → **Automations** → **Comment to Message**.

- Pick the trigger keyword: `OLIVE`.
- Write the message that goes out.
- Apply it to all reels, or to selected ones.

What you give up by staying native:
- **Five exact-match keywords maximum.** Fine — the audit already says pick one keyword and OLIVE is it.
- **Roughly a 15-minute delay** before the DM sends. Slower than paid tools, faster than the current setup, which is nobody.
- Desktop only to configure.
- No follow-gate, no follow-up sequence, no click tracking, no branching.

At 68 followers and single-digit keyword comments per reel, this is the correct first move. It costs nothing and it closes the hole where four OLIVE comments from 13–14 Sep got no reply at all.

## 3. Option B — a tool, once volume justifies it

Worth paying for when one reel produces more keyword comments than you'd hand-answer, or when you want the follow-gate enforced automatically.

| Tool | Free tier | Paid | Notes |
|---|---|---|---|
| **ManyChat** | 25 active contacts/mo, 4 automations, 2 channels, their branding on the first message | $14/mo (250 contacts), $29/mo (2,500) | Industry default. Free plan was cut from 1,000 contacts to 25 on 2 Mar 2026, so it's now a trial, not a home. Follow-to-DM works on free; enabling any PRO option forces the upgrade. |
| **ReplyRush** | 1,500 DMs/mo, permanent | — | Biggest genuinely free allowance found. |
| **LinkDM** | 1,000 DMs/mo | $19/mo flat | Does link delivery and nothing else, which is most of what this funnel is. |
| **InstantDM** | — | $9.99/mo, unlimited contacts | Cheapest unlimited option. |
| **CreatorFlow** | 500 DMs/mo | $15/mo flat | Instagram-only, flat rate. |

Recommendation: start native (free, today), and move to ReplyRush or LinkDM's free tier the week a reel breaks ~50 keyword comments. Skip ManyChat's free plan — 25 contacts is one good reel.

---

## 4. The message itself

Two constraints shape the script:

1. **Non-followers land in Requests.** A DM from an account they don't follow goes to the Requests folder with no notification; industry estimates put up to 80% of those unread. This is why "Follow me first or Instagram won't let me reply" belongs in every caption — it's not a growth trick, it's deliverability.
2. **A link in the first DM is one of Instagram's strongest spam signals.** Sending the affiliate link in the automated message is the fastest way to get the automation throttled.

So split it. The automated message carries no link and asks a question — because their reply is what opens the 24-hour window where a link is safe and where you're no longer limited to one message.

**Message 1 (automated, no link):**
> It's here 🫒 The full 10 — what my nonna did, what I still do every morning, and the one thing she didn't have.
>
> Reply **YES** and I'll send it straight over. (Instagram makes me wait for a reply before I can send anything with a link — nonna rules, not mine.)

**Message 2 (sent after they reply, link allowed):**
> Here it is 🫒 [list / PDF]
>
> Habit 2 is the only thing on here she couldn't get: [product link]
>
> *Affiliate link — I earn a small commission, costs you nothing.*

**Message 3 (24h later, only if they replied):** one habit from the list, no ask. Keeps the thread warm.

---

## 5. Amazon compliance

Amazon's Operating Agreement (updated 15 Oct 2025) permits Special Links in direct messages **when the communication is solicited** — the recipient opted in. Someone commenting OLIVE to ask for your list is an opt-in, so this funnel is allowed. Unsolicited link-dropping in DMs is not.

Two things are required, not optional:
- **Disclosure wherever the link appears** — the DM, the caption and the bio. Missing disclosure is grounds for immediate termination and forfeited commissions.
- **FTC:** `#ad` or equivalent on any caption that promotes the product.

The audit flagged zero of eight captions carry a disclosure. Fix that in the same sitting as the automation.

---

## 6. The honest order of operations

The automation is not the bottleneck at 68 followers. The account's entire reach so far — 46K plays on the ice-plunge reel — carried no keyword at all, so there was nothing for an automation to catch. Set the native automation up today because it takes ten minutes and never needs touching again, then go back to the audit's list: profile picture matching the clips, the OLIVE CTA on every caption, and the withheld list that gives people a reason to comment.

An automation with nothing to answer earns nothing.

---

### Sources
- Meta private reply rules and limits: [Spur](https://www.spurnow.com/en/blogs/instagram-dm-automation-rules), [Conferbot](https://www.conferbot.com/limits/instagram), [Creator Lane](https://creatorlanehq.com/glossary/private-reply-window)
- Native Business Suite automations: [CreatorFlow](https://creatorflow.so/blog/instagram-built-in-automation/), [QuickDM](https://quickdm.app/blog/instagram-comment-to-dm-automation-complete-guide)
- Tool pricing: [ManyChat Help](https://help.manychat.com/hc/en-us/articles/25800197498652-Free-plan), [SetSmart](https://setsmart.io/blog/manychat-pricing), [CreatorFlow](https://creatorflow.so/blog/free-instagram-dm-automation-tools/), [InstantDM](https://instantdm.com/blog/top-15-manychat-alternatives-for-instagram-automation-in-2026)
- DM deliverability: [Inrō](https://www.inro.social/blog/instagram-dm-deliverability), [CreatorFlow](https://creatorflow.so/blog/instagram-dm-compliance-meta-rules/)
- Amazon Associates: [Operating Agreement](https://affiliate-program.amazon.com/help/operating/agreement), [Geniuslink](https://geniuslink.com/blog/amazon-associates-requirements/)
