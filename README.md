# MATHUI

**Spot the keyword. Know the formula.** *(Kenal kata kunci. Tahu rumusnya.)*

MATHUI is a TikTok-style trainer for **SPM Additional Mathematics (KSSM)**.
Students scroll through exam questions. MATHUI highlights the **keywords** in each
question and shows the **right formula** to use, grouped under **G-CATS**:

| | Category | Chapters |
|---|---|---|
| **G** | Geometry | Coordinate Geometry, Vectors, Circular Measure |
| **C** | Calculus | Differentiation, Integration, Kinematics of Linear Motion |
| **A** | Algebra | Functions, Quadratic Functions, Systems of Equations, Indices/Surds/Logarithms, Progressions, Linear Law, Linear Programming |
| **T** | Trigonometry | Trigonometric Functions, Solution of Triangles |
| **S** | Statistics | Permutation & Combination, Probability Distribution, Index Numbers |

This repo is the **web app (full version)**. The mobile app (AI-generated videos) comes next. See [`docs/DESIGN.md`](docs/DESIGN.md).

## Features (v0.1)

- **Language picked before sign-in**: Bahasa Melayu or English (questions and UI), switchable later.
- **Feed**: vertical scroll-snap, one question per screen. Keywords are highlighted in their G-CATS colour, and tapping one shows the formula it points to. The side rail has ❤ Save · 💡 Formula · 🔒 Solution (Premium, coming soon) · ↗ Share.
- **G-CATS tab**: five big letters with progress rings. Tapping a letter plays a **5-second intro** (the letter turns into the category's signature formula; Skip appears after 2 s; a short version plays on repeat visits) and then opens that category's feed.
- **Book mode**: two pages side by side. The left page holds the question. The right page has tabs: **Formula · Similar question · Formula sheet (Rumus)**, with the needed formula highlighted, and **Solution 🔒**. ← → keys turn pages. The **last page is the G-CATS index**, and the G-CATS button jumps there from any page.
- **Formula detector**: weighted BM + EN keyword rules (`js/detector.js`), with tests.
- **Me**: language, G-CATS progress, saved questions.

## Run it

It's a static site with no build step. ES modules need a web server (not `file://`):

```bash
npm start            # → http://localhost:8080  (python3 http.server)
npm test             # detector + data tests (Node 18+)
npm run tag -- "Find the equation of the tangent to the curve y = x² at (1, 1)."
```

It also works on GitHub Pages as is (Settings → Pages → deploy from `main`, root folder).

## Project layout

```
.
├── index.html
├── css/mathui.css
├── js/
│   ├── app.js            app shell + routing (#/feed, #/feed/C, #/gcats, #/book/7, #/book/index, #/me)
│   ├── detector.js       keyword → formula → G-CATS detector (pure JS, runs in Node too)
│   ├── i18n.js           BM / EN strings
│   ├── store.js          per-device state (language, demo user, saved, progress)
│   ├── ui.js             shared UI pieces (highlighting, formula cards, popover, toast)
│   ├── data/
│   │   ├── gcats.js      G-CATS letters, colours, intro formulas, chapter map
│   │   ├── formulas.js   formula bank + BM/EN trigger keywords + "on SPM formula sheet" flag
│   │   └── questions.js  question bank (currently SPM-style samples)
│   └── views/            onboarding, feed, intro, gcats, book, me
├── tools/tag-question.mjs   CLI to tag new questions with the detector
├── tests/detector.test.js
└── vendor/katex/            bundled KaTeX (math rendering, MIT)
```

## Adding questions

1. Run `npm run tag -- "<question text>"` to get the suggested keywords, formulas and G-CATS letter.
2. Add an entry to `js/data/questions.js` with both `en` and `ms` text and the confirmed `formulas`.
3. Run `npm test`. It checks that the detector puts every question in the right G-CATS letter and ranks a tagged formula in its top 3, in **both languages**. If it fails, add or adjust keywords in `js/data/formulas.js`.

> ⚠ The current 32 questions are **original SPM-style samples** written for development.
> Real past-year / trial questions will be added through the data pipeline once copyright is cleared (see `docs/DESIGN.md`).

## Not done yet

- Real accounts and a backend (sign-in is a local demo; data stays on the device).
- Real SPM past-year questions (data pipeline: collect → OCR → split → tag).
- Full worked solutions and the subscription (the `solution` field and 🔒 UI are already in place).
- The mobile app with AI-generated videos.
