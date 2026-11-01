// MATHUI formula detector (v1: weighted keyword rules, English + Bahasa Melayu).
//
// detect(text) →
//   {
//     matches:  [{ start, end, phrase, weight, formulas: [id], gcats: [id] }]  (non-overlapping, in text order)
//     formulas: [{ id, score }]   best first
//     gcats:    [{ id, score }]   best first
//     gcat:     top G-CATS id or null
//   }
//
// Pure module: no DOM, so it runs in the browser, in Node tests and in tools/.

import { FORMULAS } from './data/formulas.js';
import { chapterById } from './data/gcats.js';

const DEFAULT_WEIGHT = 2;

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Build a lookup: phrase → { weight, formulas:Set, gcats:Set }.
// The same phrase may trigger several formulas (e.g. "nth term" → AP and GP).
function buildIndex(formulas) {
  const index = new Map();
  for (const f of formulas) {
    const chapter = chapterById[f.chapter];
    if (!chapter) throw new Error(`Formula ${f.id} has unknown chapter ${f.chapter}`);
    for (const lang of ['en', 'ms']) {
      for (const entry of f.kw?.[lang] ?? []) {
        const [phrase, weight] = Array.isArray(entry) ? entry : [entry, DEFAULT_WEIGHT];
        const key = phrase.toLowerCase();
        let item = index.get(key);
        if (!item) {
          item = { phrase: key, weight, formulas: new Map(), gcats: new Set() };
          index.set(key, item);
        }
        // Per-formula weight; the phrase's overall weight is the max over formulas.
        item.formulas.set(f.id, Math.max(item.formulas.get(f.id) ?? 0, weight));
        item.weight = Math.max(item.weight, weight);
        item.gcats.add(chapter.gcat);
      }
    }
  }
  // Longest phrases first so "gradient of the tangent" wins over "tangent".
  return [...index.values()]
    .sort((a, b) => b.phrase.length - a.phrase.length)
    .map((item) => ({
      ...item,
      // Letter boundaries only (not digits) so "log₂" still matches "log".
      // Symbols like "∠" get no boundary on their symbol side ("∠PQR").
      re: new RegExp(
        (/^\p{L}/u.test(item.phrase) ? '(?<!\\p{L})' : '') +
          escapeRegExp(item.phrase) +
          (/\p{L}$/u.test(item.phrase) ? '(?!\\p{L})' : ''),
        'gu',
      ),
    }));
}

const INDEX = buildIndex(FORMULAS);

// Normalise for matching while keeping string length identical, so match
// offsets map straight back onto the original text for highlighting.
function normalise(text) {
  return text.toLowerCase().replace(/-/g, '−').replace(/−/g, (m, i, s) => {
    // Keep hyphens inside words (sekurang-kurangnya, paksi-x, mid-point) as "-",
    // but treat a spaced minus as "−" so "sin (a − b)" matches either way.
    const prev = s[i - 1] ?? ' ';
    const next = s[i + 1] ?? ' ';
    return /\p{L}/u.test(prev) && /\p{L}/u.test(next) ? '-' : '−';
  });
}

export function detect(text, { index = INDEX } = {}) {
  const hay = normalise(text ?? '');

  // 1. Find every keyword occurrence.
  const found = [];
  for (const item of index) {
    item.re.lastIndex = 0;
    let m;
    while ((m = item.re.exec(hay)) !== null) {
      found.push({ start: m.index, end: m.index + m[0].length, item });
    }
  }

  // 2. Keep non-overlapping matches, preferring longer phrases.
  found.sort((a, b) => (b.end - b.start) - (a.end - a.start) || a.start - b.start);
  const taken = [];
  for (const f of found) {
    if (taken.every((t) => f.end <= t.start || f.start >= t.end)) taken.push(f);
  }
  taken.sort((a, b) => a.start - b.start);

  // 3. Score formulas and G-CATS. A phrase counts once per G-CATS letter even
  //    when it points to several formulas in that letter.
  const formulaScore = new Map();
  const gcatScore = new Map();
  const matches = taken.map(({ start, end, item }) => {
    for (const [id, w] of item.formulas) formulaScore.set(id, (formulaScore.get(id) ?? 0) + w);
    for (const g of item.gcats) gcatScore.set(g, (gcatScore.get(g) ?? 0) + item.weight);
    return {
      start,
      end,
      phrase: text.slice(start, end),
      weight: item.weight,
      formulas: [...item.formulas.keys()],
      gcats: [...item.gcats],
    };
  });

  const rank = (m) => [...m].map(([id, score]) => ({ id, score })).sort((a, b) => b.score - a.score);
  const gcats = rank(gcatScore);
  return { matches, formulas: rank(formulaScore), gcats, gcat: gcats[0]?.id ?? null };
}

// Split text into plain / keyword segments for highlighting in the UI.
export function segments(text, matches) {
  const out = [];
  let pos = 0;
  for (const m of matches) {
    if (m.start > pos) out.push({ text: text.slice(pos, m.start) });
    out.push({ text: text.slice(m.start, m.end), match: m });
    pos = m.end;
  }
  if (pos < text.length) out.push({ text: text.slice(pos) });
  return out;
}

// Formulas to show as "the right formula" for a question: the hand-checked
// tags when present, otherwise the detector's top suggestions.
export function formulasFor(question, lang = 'en', max = 3) {
  if (question.formulas?.length) return question.formulas;
  const r = detect(question.text[lang] ?? question.text.en);
  if (!r.formulas.length) return [];
  const best = r.formulas[0].score;
  return r.formulas.filter((f) => f.score >= best * 0.6).slice(0, max).map((f) => f.id);
}
