# MATHUI – Design decisions

Summary of the brainstorming sessions that shaped MATHUI.

## 1. Idea

A KPM/SPM learning tool that **detects which formula an exam question needs**, from keywords in the question.
It's delivered as a **TikTok-style scrolling feed** and grouped into five categories: **G-CATS** (Geometry, Calculus, Algebra, Trigonometry, Statistics).

## 2. Decisions

| Topic | Decision |
|---|---|
| Subject | SPM **Additional Mathematics** (KSSM, SPM 2021 onwards) |
| Builder | Engineering student project |
| Web app | **Full MATHUI**: TikTok feed **and** self-study book (two pages side by side) |
| Mobile app | **Videos only**, AI-generated, with AI tags |
| Language | **Bilingual**: user picks BM or EN **before sign-in** |
| Answers | Free: **right formula only**. Full worked solutions: **subscription later** (not built yet) |
| G-CATS placement | **Tab in the menu** (feed) **+ last page of the book** (index). Big letters jump to a category |
| Category intro | **5 s "ad"**: big letter → signature formula → category name → feed. Skip after 2 s, short version on repeat |
| Book right page | **All three**: Formula · Similar question · Formula sheet (Rumus), plus locked Solution |
| Build order | **Web first**, then mobile |

## 3. Chapter → G-CATS map

| G-CATS | Chapters | Notes |
|---|---|---|
| **G** | Coordinate Geometry (F4), Vectors (F4), Circular Measure (F5) | Circular Measure in G (arcs, sectors) |
| **C** | Differentiation (F5), Integration (F5), Kinematics of Linear Motion (F5) | Kinematics = applied calculus |
| **A** | Functions, Quadratic Functions, Systems of Equations, Indices/Surds/Logs, Progressions, Linear Law (F4), Linear Programming (F5) | Biggest category |
| **T** | Trigonometric Functions (F5), Solution of Triangles (F4) | Sine/cosine rule in T |
| **S** | Permutation & Combination (F5), Probability Distribution (F5), Index Numbers (F4) | |

## 4. Formula detector

- **v1 (built):** weighted keyword rules in BM + EN. The formula bank is based on the official SPM *Rumus* page plus key "memorise" formulas (★).
  The longest phrase wins, a phrase counts once per G-CATS letter, and matching respects word boundaries. `npm test` checks every question in both languages.
- **v2:** a machine-learning classifier trained on the hand-tagged question bank.
- **v3:** AI-assisted tagging (an AI suggests, a human approves) to scale up to hundreds of papers.

## 5. Data pipeline (next)

1. **Collect:** official LP papers, state trial papers (*Soalan Percubaan*), MRSM. Check copyright and prefer sources that allow reuse, or rewrite the questions.
2. **OCR:** a maths-aware OCR (normal OCR breaks fractions, roots and powers).
3. **Split:** one record per question or sub-question (a), (b), (c).
4. **Tag:** `npm run tag` → human check → `js/data/questions.js` (later: a database).

## 6. Mobile videos (AI-generated)

```
question → AI script (BM + EN) → storyboard (question → keywords glow → formula pops in)
         → fixed animation template → text-to-speech voice → 9:16 video + tags
```
Each video ends with the formula, not the answer ("Try it yourself!"), matching the free tier.
Uploaded or community videos come later, once the database is running.

## 7. Roadmap

| Phase | Deliverable | Status |
|---|---|---|
| 0 | Question data (samples → real papers) | 🟡 samples done |
| 1 | Formula detector v1 (BM + EN) | ✅ |
| 2 | Web: language → sign-in → feed → G-CATS tab | ✅ (demo sign-in) |
| 3 | Web: book mode + G-CATS index | ✅ |
| 4 | Category intros | ✅ |
| 5 | AI video generator | ⬜ |
| 6 | Mobile app (video feed + AI tags) | ⬜ |
| 7 | Premium: full solutions + subscription | ⬜ (UI placeholder ready) |
