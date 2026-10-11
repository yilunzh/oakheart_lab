---
name: copy-review
description: Review and tighten Oakheart Lab site copy, especially marketing hooks (headlines, subheads, section headings and intros, CTAs, card text). Use before committing any copy change, and when asked to make copy shorter, punchier or less verbose.
---

# Copy review: short hooks, plain words

Busy, non-technical owners skim. A hook has one job: make them read the next line. Every extra word competes with that.

Facts and claims still come from `docs/brief.md`; owner decisions in `docs/decisions.md` win over this skill.

## 1. Word budgets (hard limits)

| Element | Max | Shape |
|---|---|---|
| H1 | 12 words | One idea. A question or a plain statement. No second clause unless it is the owner-approved line. |
| Hero subhead | 25 words, 2 sentences | What we do, in the buyer's words. Never repeat the H1's words. |
| Section H2 | 8 words | Says the point, not the topic ("Free check. Then one flat monthly fee.", not "How it works"). |
| Section intro | 15 words, 1 sentence | Optional. Delete it if the H2 or the visual already says it. |
| Card / step body | 15 words | One fact or action. |
| Bullet | 10 words | Starts with the noun or verb that matters. |
| CTA | 5 words | Verb first. Same label everywhere for the same action. |
| Microcopy row | 6 words per item | |
| FAQ answer | 50 words | First sentence answers the question in 15 words or fewer. Required verbatim sentences (money-back) don't count. |

Count with the rendered text, not the source. A quick audit:

```bash
NODE_PATH=$(npm root -g) node -e "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto(process.argv[1]);const r=await p.evaluate(()=>[...document.querySelectorAll('main h1,main h2,main h3,main p')].map(e=>[e.tagName,e.innerText.trim().split(/\s+/).length,e.innerText.trim().slice(0,90)]));r.forEach(x=>console.log(x.join(' | ')));await b.close()})()" http://127.0.0.1:3100/
```

## 2. Cut list (apply in order)

1. **Repeats.** If the line above already says it, delete it. Watch openings: two adjacent elements must not start with the same words.
2. **Setup clauses.** "Customers used to…", "In today's world…", "It's important to…". Start at the point.
3. **Doubled ideas.** "Does it recommend you, and get your details right?" → "Does it recommend you?" Keep the stronger half.
4. **Filler words.** just, really, actually, simply, quick and easy, seamless, end to end, handled, leverage, solutions.
5. **Lists longer than three.** Keep the three a buyer recognizes; the rest go to a card, FAQ or visual.
6. **Hedges stacked on hedges.** One qualifier, next to the claim it qualifies.
7. **Explaining the visual.** If the diagram shows it, the caption names it in a few words; it doesn't narrate it.

## 3. Keep

- Concrete buyer language: "Can we bring the dog?", "pet fee", "test-drive Saturday".
- Numbers over adjectives, always with a source and date (brief rule).
- Honest qualifiers where a claim would otherwise overreach (no ranking or recommendation promises).
- The exact money-back sentence: "If you're not happy with our service, we'll give your money back, no questions asked."

## 4. Hook test (read each hook aloud)

- Would a tour operator or plumber say these words?
- Does it make one promise or ask one question?
- Can a word go without changing the meaning? Then it goes.
- Is it under budget?

## 5. Output

When reviewing, return a table: element · current text · word count · budget · proposed text · words saved. Flag any owner-locked line (see `docs/decisions.md`) instead of changing it silently, and propose a version for the owner.
