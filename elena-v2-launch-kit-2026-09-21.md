# Elena v2 — new page launch kit
Written 21 Sep 2026, after @elena.moretti.wellness was removed. Built on a fresh vidIQ outlier pull (12 Instagram/TikTok reels from the last 30 days, all in the women-45-70 healthy-ageing niche, each one 8x–1949x its own creator's median), plus the 17 Sep audit and the competitor playbook.

**One risk to name before the setup, then we proceed:** if Meta disabled the old account rather than you deleting it, Meta links accounts by device, IP, phone, email and payment method, and a replacement made during an open enforcement can be read as ban evasion. The way to make that risk small is not to hide the connection — it is to remove the reasons the old page was actionable. That is what this spec does: the AI label goes on, the affiliate disclosure goes on, every health claim comes out, and no sourced footage ever touches the account. Set it up this way and there is nothing left to enforce against.

---

## 1. What the last 30 days of data say (this revises the audit)

Six Instagram outliers, six TikTok. The pattern is consistent and it is *not* what the 17 Sep audit concluded.

| Account | Followers | Views | vs. their median | Format |
|---|---|---|---|---|
| @clarasterling.glows | **77** | 231.1K | 57.0x | Static shot, bathroom, text overlay, EDM |
| @maria.aging | 4.1K | 623.9K | 55.2x | Walking into a hotel room, text overlay |
| @rebecca.wellnessglow | **191** | 137.5K | 51.7x | Static shot in a salon chair, text overlay |
| @healthyagingguide360 | 40.8K | 467.9K | 40.8x | Static couple shot, "Comment GLOW" |
| @vivianhartleyglow | 9.2K | 172.3K | 39.6x | Single pose, Britney remix |
| @imelenavance | 2.9K | 115.1K | 37.3x | Talking head, Italian song |
| @rachelstone.fitness | **403** | 59.9K | 21.4x | Dancing, Shakira |
| @barbara.elison.we (TT) | 100K | 2.0M | 180.3x | 12s dance, "I'm 72" |

**1. A 77-follower account did 231K views nine days ago.** The niche is not gated by follower count. Starting from zero costs you nothing but time.

**2. The winning clips are low-motion, not high-energy.** Every single Instagram outlier is logged as "visual changes: Low (static camera)", pacing slow-to-moderate, "static text overlay", "music only". The audit told you every clip needs an explosive event in the first second — that was inferred from one data point (your ice-plunge reel) and the fresh data does not support it. What actually carries these reels is: **a person looking straight down the lens with visible confidence, one bold quantified claim in text, and the whole payload in the caption.** That is far easier to generate convincingly than a full-face ice plunge, and it is where AI clips fail least.

**3. The hook has a second number now.** "I'm 67" alone is table stakes. The outliers pair the age with a *quantified counter-claim*:
   - "I'm 57 and I have a biological age of 33.6" (115K)
   - "i'm 67. My skin age is 27. My dermatologist dad canceled my Botox at 29" (624K)
   - "look 30 at 71" (60K)
   - "I'm 71. 10 boring things I do daily I wish someone had told me to do at 40" (60K)

**4. "Boring" is the live frame.** Two separate outliers ran "10 boring things" (51.7x and 21.4x) and @rebecca.wellnessglow's caption opens "no ice baths, no crazy detox 👇 #6 is the one i'd never give up (SAVE)". The playbook's BORING positioning was written before this and the market has now validated it. Use it.

**5. Upbeat, recognisable music. Not acoustic, not silence.** Shakira, a Britney remix, a Rick Ross remix, pop-rock, "a smooth upbeat Italian song". Every failed Elena reel used sad-pop, acoustic guitar, or no audio at all. This is a one-click fix worth more than any prompt change.

**6. Loop it.** Almost every outlier is logged `is_looped: true`. A 7–10s clip that cuts back to frame one reads as a longer watch. Elena's reels did not loop.

**7. Mediterranean is validated, and it is the one angle with a true differentiator.** @imelenavance runs an Italian track; on TikTok, @vicky.derosa's olive-oil-and-lemon routine of a 109-year-old did 751.9K (111x her median). Nobody in the Instagram set owns the nonna frame. Keep it.

**8. The exact money mechanic is visible in the data.** @healthyagingguide360, 467.9K views: *"Comment GLOW and I'll send you the exact recommendation I take 💌"*. That is the funnel. Not a bio link people never tap.

---

## 2. Identity and profile setup

**Persona:** keep her. Mediterranean, 67, nonna-raised, honest. The old page had 68 followers, so there is no equity to protect and total freedom to change anything — but the *positioning* is the one asset that tested well and is genuinely differentiated.

**Face:** regenerate the base character in Higgsfield rather than reusing the old renders. One new face, locked, used in 100% of clips including the profile picture. The old page's core leak was that the profile picture, the AI reels and the viral reel showed three different women.

**Handle:** avoid `@imelenavance` (live, 2.9K, same niche). Pick one and check it is free:
- `@elena.nonna.habits` ← recommended, says the whole positioning
- `@elenas.boring.list`
- `@elena.at.67`
- `@the.nonna.list`

**Name field:** `Elena · 67 · boring habits`  (the name field is searchable; put keywords in it)

**Bio** — disclosure-first and still sells the follow:
> Elena · 67 · AI-generated persona 🤖
> My nonna's boring habits. No filler, no 14-step routine 🫒
> Comment BORING for my one-page list
> #ad · affiliate link ⬇️

**Non-negotiable settings, day zero:**
1. **Edit profile → AI-generated profile → ON.** Applied, the label costs you nothing in reach; skipped, it caps you out of Reels and Explore recommendations, which is the whole distribution.
2. Professional account → Creator → category *Digital creator* (not "Health/Medical", which invites health-claim review).
3. Profile picture = the locked face, same framing as the reels.
4. No link in bio until day 11 (see the warm-up).

**Banned language, permanently.** No "age backwards", "reverses", "cures", "clinically", "my blood work", no before/after medical claims. Replace measurable outcomes with preference and habit language: "this is what I do", "my nonna did this", "people guess 45". Note that the 624K outlier says "skin age 27" — cosmetic-perception claims survive where physiological claims do not. Stay on the cosmetic side of that line.

---

## 3. The format spec (replaces the audit's section 4)

Every reel, no exceptions:

- **7–10 seconds, looped.** End frame matches start frame.
- **One static or slow-walking shot.** Kitchen with the same window, hallway with the same door, garden, car interior. No cuts.
- **One deliberate moment of eye contact** — she looks down the lens for a full second. This is the single most repeated element across the outliers, and it is what "low motion" buys you over a serene eyes-closed dip.
- **Static text overlay, top third, 3–4 lines.** Line 1 is `I'M 67` on its own, largest.
- **Upbeat licensed trending audio.** Never silence, never sad acoustic.
- **Saturated colour somewhere in frame.** One bright object beats a whole golden-hour palette.
- **Caption carries everything.** The reel sells the caption; the caption sells the DM.

**Retired permanently:** the ice-plunge clip whatever its origin, bathrobes, landscape-only shots, talking heads (until lip-sync passes), and any footage you did not generate yourself.

---

## 4. The first ten posts

Hooks are built from the fresh outlier patterns. Captions use the playbook's Part 7 bodies (they are strong and tested-adjacent) with the compliance block swapped in. `[PRODUCT]` stays a find-and-replace token.

| # | On-screen hook (line 1 always `I'M 67`) | Clip | Caption body |
|---|---|---|---|
| 1 | I'M 67 / My nonna was 94 and never owned a serum / here are her 10 boring habits / (READ CAPTION) | Kitchen, pours olive oil into a small dish, looks up at lens | Playbook Reel 1 list, nonna-framed |
| 2 | I'M 67 / people guess 45 / because I never break these 6 rules / (SAVE THIS) | Hallway, walks in, drops keys, eye contact | Playbook Reel 2 |
| 3 | I'M 67 / 10 boring things I do daily / I wish someone told me at 40 | Garden, cuts herbs, turns to camera | The boring list, #6 withheld |
| 4 | I'M 67 / my skin age came back 41 / my dermatologist didn't believe the olive oil | Bathroom, presses a cold cloth to face, eye contact | Nonna habit 1 — olive oil on damp skin |
| 5 | I'M 67 / lemon and olive oil before coffee / the way the 109-year-olds do it | Close macro: lemon squeezed into a glass, oil poured in, she drinks | Ride the live TikTok trend, nonna-framed |
| 6 | I'M 67 / I stopped washing my face in the morning at 52 / here's what happened | Kitchen window, morning light, splashes plain water, looks up | Playbook Reel 2 rule 1, expanded |
| 7 | I'M 67 / no ice baths / no detox teas / just the 10 things my nonna actually did | Sofa, reading glasses off, eye contact | Full list, #7 withheld |
| 8 | I'M 67 / Boring Habit 1 of 10 / salt in the water before coffee | Kitchen, pinch of sea salt into a glass, stirs, drinks | Series opener |
| 9 | I'M 67 / Boring Habit 2 of 10 / the hat, not the sunscreen | Doorway, puts on a straw hat, steps into the light | Series |
| 10 | I'M 67 / the one thing my nonna didn't have / and the one thing I take | Kitchen, `[PRODUCT]` on the counter, she takes it with water, eye contact | The conversion reel — resolves the product/story conflict |

**The caption block every post ends with** (this is the fix for the old page's biggest leak — 46,364 plays that captured nothing):

> Comment **BORING** and I'll send you the one-page list with what I use for each 💌
> (follow me first or Instagram won't let me reply)
>
> #ad · affiliate link in bio · AI-generated persona
> #womenover50 #over60 #healthyaging #agingracefully #mediterraneanliving

**Withhold one item.** Always. "#6 is the one I'd never give up" is doing real work in a 137K reel. A fully written-out list gives nobody a reason to comment.

---

## 5. Warm-up calendar

The old page posted eight reels in five days with an affiliate link in the bio from day one. That profile shape is a spam signal on top of everything else.

| Day | Action |
|---|---|
| 1 | Profile complete, AI label ON, face locked, **no link, no posts.** Follow 20 accounts in the niche, leave 10 real comments |
| 2 | Same. Post one story (behind-the-scenes, no link) |
| 3 | Post 1 goes up. No keyword CTA yet — just "save this" |
| 4–10 | One reel a day, posts 2–7. Still no link in bio. Add "comment BORING" from post 4 and **answer every comment by hand within the hour** |
| 11 | Link goes in the bio. ManyChat BORING automation switched on. Post 8 |
| 12+ | Posts 9, 10, then the audit's cadence: repost the best-performing caption on a new clip every 3–4 days, series habits in between |

**Kill rule:** any clip under 300 plays at 48 hours — do not reuse that setting, that outfit, or that track. Any clip over 5K — regenerate three variations of it that week.

---

## 6. The funnel and the offer

1. **ManyChat, keyword BORING, follow-gated.** Message 1 delivers the PDF link. Message 2, 24 hours later, one line about `[PRODUCT]` as habit #1.
2. **Capture the email, not just the DM.** The PDF sits behind a one-field email form. Instagram deleted your last audience in its entirety; an email list is the only version of this asset that survives the next enforcement sweep.
3. **Fix the offer before scaling traffic.** Amazon Associates pays low single-digit percent on health and grocery — under a dollar a bottle at the Thinbi price point, so 46K views would have earned roughly nothing even with a working funnel. Apply to the NAD+/longevity brands' own programs (Impact, ShareASale, or direct) before you send real volume; the competitor network in the playbook uses cloaked direct-brand links for exactly this reason.
4. **Resolve the story/product conflict.** The old captions said "my nonna never touched a supplement bottle" while the bio sold a supplement. The fix is one sentence, used every time: *"My nonna had the olive oil, the walk and the sun. She didn't have this. It's the one thing I take that she couldn't."*
5. **Mirror every reel to TikTok and YouTube Shorts from day one.** Same clip, same caption. The TikTok half of the outlier pull is doing bigger numbers than Instagram in this niche (2M, 751K, 12.5M), and it means the next deletion costs a third of the audience instead of all of it.

---

## 7. What success looks like, in order

1. **Week 1:** one reel over 5K plays. That tells you the face and the format read as real.
2. **Week 2:** 30+ BORING comments across the week, all answered. That tells you the caption/CTA pair works.
3. **Week 3:** 100 email addresses. That is the first thing you own.
4. **Week 4:** first affiliate click-throughs, on a direct-brand program, with the disclosure in place.

Reach is not the constraint — a 77-follower account did 231K views this month. Capture is the constraint, and it is the one thing the old page had none of.

---

## 8. Appendix — the faceless variant (added 22 Sep)

Going faceless changes the naming question, and it changes something bigger: **Instagram's "AI-generated profile" label applies to profiles that feature an AI-generated *person*.** No person on screen, no label requirement, and the single most likely cause of the old page's removal stops existing. It also removes the continuity problem (no face to keep consistent across 50 clips) and the lip-sync problem.

**The cost:** you lose "I'm 67". Every face-based outlier in section 1 is powered by an age reveal, and a page with no face cannot make that claim. So the hook engine has to change.

**What the faceless outliers actually use** (fresh pull, same 30-day window, same niche):

| Account | Views | vs. median | Hook | Visual |
|---|---|---|---|---|
| @froyaorganics | **2.5M** | 21.7x | "YOU AGE HOW YOU EAT." | Faceless, text list over a dim table b-roll, 5s |
| @blooddocdad | **2.2M** | 9.5x | "Five foods I avoid as a cancer doctor" | Hands chopping cucumber, ambient chopping SFX |
| @ctrlhunger | **2.1M** | 7.2x | "SMALL HABITS THAT SLOW AGING (BIG TIME)" | Numbered list over looping gym b-roll |
| @flarefreediary (TT) | 448.1K | **95.7x** | "MORNING RESET · Anti-inflammatory · Gut support" | Top-down food assembly, 9s |
| @kennyglowing (TT) | 2.9M | **6199.9x** | Celebrity audio synced to hands making tea | Split screen, 4.8K-follower account |

The faceless hook replaces *age* with one of three things: **an authority** ("as a cancer doctor"), **a declarative law** ("you age how you eat"), or **a labelled ritual** ("morning reset"). Everything else from section 3 holds — static camera, looping 5–10s, static text, list in the caption. Ambient sound (chopping, pouring, boiling) is a live alternative to music and is what the 2.2M reel used.

**Naming.** Faceless pages are named for the *idea*, not a person — but keeping a nonna frame lets the captions stay in first person ("my nonna kept a bowl of olive oil by the sink"), which preserves the one differentiator this project has. Checked against live Instagram on 22 Sep:

| Handle | Display name | Status |
|---|---|---|
| **`@nonna.knew`** | What Nonna Knew | **free** ← recommended |
| `@whatnonnaknew` | What Nonna Knew | free |
| `@thenonnalist` | The Nonna List | free |
| `@nonna.rules` | Nonna Rules | free |
| `@the.nonna.method` | The Nonna Method | free |
| `@nonna.protocol` | The Nonna Protocol | free |
| `@nonna.rosa.habits` | Nonna Rosa | free (keeps a named persona) |
| `@olive.hour.habits` | The Olive Hour | free |
| `@nonnas.table` | — | taken (732 followers, catering business) |
| `@the.olive.hour` | — | taken (11 posts, Mediterranean food) |
| `@olive.and.salt` | — | taken (private) |
| `@theboringlist` | — | taken (private) |

`@nonna.knew` is the pick: three syllables, states the whole premise, works as a caption sign-off ("nonna knew 🫒"), and leaves room for the "boring habits" language in the bio without burning it in the handle.

**Bio for the faceless version** (no AI label needed, affiliate disclosure still required):
> What Nonna Knew 🫒
> The boring Mediterranean habits that outlived every trend
> Comment BORING for the one-page list
> #ad · affiliate link ⬇️

**The ten posts, faceless.** Same captions from section 4, new visuals — hands and food only, top-down or static:
olive oil poured into a shallow dish · lemon squeezed into a glass · sea salt pinched into water · herbs cut with scissors · a straw hat lifted off a hook · a silk pillowcase smoothed · anchovies laid on bread · a pot of greens simmering · espresso poured *after* a glass of water · a hand closing a door on the evening light.

Shoot ambient sound with each one. The hooks become: "My nonna was 94. These are the 10 boring things she did every day." / "YOU AGE HOW YOU EAT." / "The 10 things in a Mediterranean nonna's kitchen that a dermatologist would charge you for."

**Availability caveat:** these were checked by public profile lookup. A handle that returns nothing can still be reserved or held by a deactivated account — confirm in the Instagram signup form before you commit to one, and grab the matching TikTok and YouTube handles the same day.
