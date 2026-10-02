# GodCode — Decode Your Identity. Discover God's Design.

A polished, mobile-first Christian identity & biblical insight web app, built from the GodCode spec.
React + Vite, no backend required — the data layer is a clearly-marked local mock behind a single API
surface (`src/store.js`) so it can be swapped for Postgres/Prisma + real auth without touching the UI.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## What's built

| Area | Status |
| --- | --- |
| Landing page (hero, how it works, "does not predict your future", Eph 2:10) | ✅ |
| Email/password accounts, session, sign out, account + data deletion | ✅ (local) |
| Google / Apple sign-in | Placeholder buttons, wire OAuth at deploy |
| Onboarding (name, birth date, optional gender / relationship status / photo) | ✅ |
| Transparent GodCode calculation, step-by-step, intermediate + reduced stored | ✅ |
| Biblical number library — 1-10, 12, 13, 40, 50, 70, 100, 144, 666 | ✅ 18 entries, 70+ Scripture refs |
| Identity profile (strengths, growth, emotional, communication, decisions, relationships, leadership, conflict, spiritual) | ✅ |
| Name analysis — 55-name library, says "we couldn't establish a reliable connection" when unknown | ✅ |
| Scripture for your journey (4 verses, why + apply) | ✅ |
| Relationship compatibility (communication, emotional, strengths, friction, conflict, growth, Scripture) | ✅ |
| Daily GodCode devotional (Scripture / meaning / identity / action / prayer) | ✅ 14 in fixed rotation |
| Prayer generator — 13 categories, each anchored to a passage | ✅ |
| "What GodCode Is Not" education page | ✅ |
| Understanding 666 module | ✅ |
| Dashboard + mobile bottom nav (Home, My Code, Relations, Daily, Bible, Profile) | ✅ |
| Shareable card — download PNG (canvas), native share, copy link | ✅ |
| Saved insights | ✅ |
| Free / GodCode+ tier architecture (Stripe-ready, not hard-coded) | ✅ |
| Admin panel — content, users, tiers, AI rules, analytics, disable content | ✅ |

## Theological guardrails enforced in the content

- Never astrology, fortune telling, divination, or destiny prediction — stated on the landing page, the
  dedicated education page, and repeated in-profile.
- Every biblical theme carries a Scripture reference. No invented meanings, no invented Hebrew/Greek
  etymologies — uncertain name origins are labelled as uncertain, unknown names return the explicit
  "we couldn't establish a reliable biblical connection" message instead of a guess.
- Every number entry includes "common misunderstandings" and "what this does NOT mean".
- Personality content uses observational language only ("you may tend to…", "consider whether…").
- Compatibility never says soulmates / destined / God chose this person.
- All prayers end "In Jesus' mighty name, Amen." Anxiety and healing categories point to professional care.
- The 16 AI response-engine rules are encoded in the Admin → AI Rules tab as the content contract.

## Where real services plug in

| Service | Hook |
| --- | --- |
| Auth + DB | `src/store.js` — replace `api.*` with fetch calls; tables: users, profiles, godcodes, number_library, scriptures, name_meanings, relationship_profiles, compatibility_results, devotionals, prayers, saved_insights, subscriptions, content_reviews, analytics |
| Stripe | `user.plan` field + Profile upgrade button |
| Bible API | `src/data/*.js` verse text — swap for a licensed translation |
| AI reflection | Generate against the rules in Admin → AI Rules; withhold anything without a verifiable reference |
| Email / SMS / Push | `user.notify` preferences saved in Devotional screen |

## Project structure

```
src/
  data/      numbers.js · identity.js · devotionals.js · prayers.js · names.js   (all content)
  lib/       godcode.js (calculation) · compat.js (relationship reflection)
  screens/   Landing Auth Onboarding Dashboard MyCode Relationships Devotional
             Prayer BibleTab NumberDetail Share Profile Saved Admin
  components/ui.jsx     store.js     styles.css
```

Verse text is given in a common plain-English rendering. Read every passage in your own Bible, in context.
