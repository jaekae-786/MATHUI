import { test } from 'node:test';
import assert from 'node:assert/strict';

import { detect, segments, formulasFor } from '../js/detector.js';
import { FORMULAS, formulaById } from '../js/data/formulas.js';
import { QUESTIONS } from '../js/data/questions.js';
import { CHAPTERS, GCATS, chapterById } from '../js/data/gcats.js';

test('every chapter belongs to a G-CATS letter', () => {
  const ids = new Set(GCATS.map((g) => g.id));
  for (const c of CHAPTERS) assert.ok(ids.has(c.gcat), c.id);
});

test('every formula has a valid chapter and keywords in both languages', () => {
  const seen = new Set();
  for (const f of FORMULAS) {
    assert.ok(!seen.has(f.id), `duplicate formula id ${f.id}`);
    seen.add(f.id);
    assert.ok(chapterById[f.chapter], `${f.id}: unknown chapter`);
    assert.ok(f.kw.en.length > 0, `${f.id}: no English keywords`);
    assert.ok(f.kw.ms.length > 0, `${f.id}: no Malay keywords`);
    assert.ok(f.name.en && f.name.ms && f.tex && f.text, `${f.id}: missing fields`);
  }
});

test('every question is valid and tagged with formulas from its own G-CATS letter', () => {
  for (const q of QUESTIONS) {
    const chapter = chapterById[q.chapter];
    assert.ok(chapter, `${q.id}: unknown chapter`);
    assert.ok(q.text.en && q.text.ms, `${q.id}: needs both languages`);
    for (const id of q.formulas) {
      assert.ok(formulaById[id], `${q.id}: unknown formula ${id}`);
      assert.equal(chapterById[formulaById[id].chapter].gcat, chapter.gcat, `${q.id}: ${id} is in another letter`);
    }
  }
});

for (const lang of ['en', 'ms']) {
  test(`detector finds the right G-CATS letter for every sample question (${lang})`, () => {
    for (const q of QUESTIONS) {
      const r = detect(q.text[lang]);
      assert.equal(r.gcat, chapterById[q.chapter].gcat, `${q.id} [${lang}] → ${JSON.stringify(r.gcats)}`);
    }
  });

  test(`detector's top-3 formulas include a tagged formula (${lang})`, () => {
    for (const q of QUESTIONS) {
      const top = detect(q.text[lang]).formulas.slice(0, 3).map((f) => f.id);
      assert.ok(q.formulas.some((id) => top.includes(id)), `${q.id} [${lang}] top=${top} tagged=${q.formulas}`);
    }
  });
}

test('longer phrase wins over the shorter one inside it', () => {
  const r = detect('Find the gradient of the tangent to the curve.');
  assert.equal(r.matches[0].phrase, 'gradient of the tangent');
  assert.equal(r.formulas[0].id, 'diff-tangent');
});

test('matching is case-insensitive and keeps original text for highlights', () => {
  const r = detect('A GEOMETRIC PROGRESSION has a Common Ratio of 2.');
  assert.deepEqual(r.matches.map((m) => m.phrase), ['GEOMETRIC PROGRESSION', 'Common Ratio']);
  assert.equal(r.gcat, 'A');
});

test('"log" matches before a subscript, but not inside another word', () => {
  assert.equal(detect('Solve log₂ x = 3').formulas[0].id, 'log-laws');
  assert.equal(detect('The catalogue lists items').matches.length, 0);
});

test('hyphenated Malay keywords match', () => {
  const r = detect('cari kebarangkalian sekurang-kurangnya 2 murid');
  assert.ok(r.matches.some((m) => m.phrase === 'sekurang-kurangnya'));
  assert.equal(r.gcat, 'S');
});

test('symbol keywords such as ∠ match when followed by letters', () => {
  assert.ok(detect('Find ∠PQR in triangle PQR.').matches.some((m) => m.phrase === '∠'));
});

test('no keywords → empty result', () => {
  const r = detect('Hello world');
  assert.equal(r.gcat, null);
  assert.deepEqual(r.formulas, []);
});

test('segments rebuild the original text exactly', () => {
  const text = QUESTIONS[0].text.en;
  const segs = segments(text, detect(text).matches);
  assert.equal(segs.map((s) => s.text).join(''), text);
  assert.ok(segs.some((s) => s.match));
});

test('formulasFor uses hand tags, else falls back to the detector', () => {
  assert.deepEqual(formulasFor(QUESTIONS[0]), QUESTIONS[0].formulas);
  const untagged = { text: { en: 'Find the sum to infinity of the geometric progression.' }, formulas: [] };
  assert.equal(formulasFor(untagged)[0], 'gp-sum-inf');
});
