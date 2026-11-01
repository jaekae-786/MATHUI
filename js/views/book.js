// Self-study "book": two pages side by side.
//   Left page  – the question with keywords highlighted
//   Right page – tabs: Formula | Similar question | Formula sheet (Rumus) | Solution 🔒
// Pages are ordered by G-CATS; the LAST page is the G-CATS index.
import { h, questionMeta, highlightedText, keywordChips, rightFormulas, formulaCard, gcatOf, letterChip } from '../ui.js';
import { t, tr, lang } from '../i18n.js';
import { store } from '../store.js';
import { QUESTIONS } from '../data/questions.js';
import { GCATS, CHAPTERS, chapterById } from '../data/gcats.js';
import { FORMULAS, formulaById } from '../data/formulas.js';
import { formulasFor } from '../detector.js';
import { gcatGrid } from './gcats.js';
import { navigate } from '../router.js';

const chapterRank = Object.fromEntries(CHAPTERS.map((c, i) => [c.id, i]));
const gcatRank = Object.fromEntries(GCATS.map((g, i) => [g.id, i]));

export const BOOK = [...QUESTIONS].sort(
  (a, b) =>
    gcatRank[chapterById[a.chapter].gcat] - gcatRank[chapterById[b.chapter].gcat] ||
    chapterRank[a.chapter] - chapterRank[b.chapter],
);
export const INDEX_PAGE = BOOK.length + 1; // 1-based page numbers; index is last
export const pageOf = (qid) => BOOK.findIndex((q) => q.id === qid) + 1;
export const firstPageOf = (gcatId) => BOOK.findIndex((q) => chapterById[q.chapter].gcat === gcatId) + 1;

let currentTab = 'formula';

export function renderBook(root, params) {
  // #/book, #/book/12, #/book/q/<id>, #/book/index
  let page = 1;
  if (params[0] === 'q') page = pageOf(params[1]) || 1;
  else if (params[0] === 'index') page = INDEX_PAGE;
  else if (params[0]) page = Math.min(Math.max(1, parseInt(params[0], 10) || 1), INDEX_PAGE);

  const go = (p) => navigate(`#/book/${Math.min(Math.max(1, p), INDEX_PAGE)}`);
  const isIndex = page === INDEX_PAGE;
  const q = isIndex ? null : BOOK[page - 1];

  const toolbar = h(
    'div.book-toolbar',
    {},
    h('button.btn.ghost', { type: 'button', disabled: page === 1, onclick: () => go(page - 1), 'aria-label': t('prev') }, '◀ ', h('span.hide-sm', {}, t('prev'))),
    h('div.book-pos', {}, q ? letterChip(gcatOf(q)) : null, h('span.hide-sm', {}, `${t('page')} ${page} ${t('of')} ${INDEX_PAGE}`), h('span.show-sm', {}, `${page}/${INDEX_PAGE}`)),
    h('a.btn.gcats-jump', { href: '#/book/index', title: t('index') }, h('span.mini-letters', { 'aria-hidden': 'true' }, GCATS.map((g) => h('i', { vars: { '--c': g.color } }, g.id))), h('span.hide-sm', {}, t('openIndex'))),
    h('button.btn.ghost', { type: 'button', disabled: isIndex, onclick: () => go(page + 1), 'aria-label': t('next') }, h('span.hide-sm', {}, t('next')), ' ▶'),
  );

  const spread = isIndex ? indexSpread() : questionSpread(q, page);
  root.replaceChildren(h('main.book', {}, toolbar, spread));

  if (q) store.addTo('seen', q.id);

  // ← → keys turn pages.
  root.onkeydown = (e) => {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowLeft' && page > 1) go(page - 1);
    if (e.key === 'ArrowRight' && !isIndex) go(page + 1);
  };
  root.tabIndex = -1;
  root.focus({ preventScroll: true });
}

function questionSpread(q, page) {
  const g = gcatOf(q);
  const { el: text, result } = highlightedText(q);

  const left = h(
    'section.book-page.left',
    { vars: { '--c': g.color } },
    questionMeta(q),
    text,
    h('div.kw-block', {}, h('h3.panel-title', {}, '🔑 ', t('keywords')), keywordChips(result, g.id)),
    h('div.page-num', {}, page),
  );

  const tabs = [
    ['formula', '📐', t('tabFormula')],
    ['similar', '🔁', t('tabSimilar')],
    ['rumus', '📄', t('tabRumus')],
    ['solution', '🔒', t('tabSolution')],
  ];
  const body = h('div.tab-body');
  const tabBar = h(
    'div.tabs',
    { role: 'tablist' },
    tabs.map(([id, icon, label]) =>
      h('button.tab', { type: 'button', role: 'tab', title: label, 'data-tab': id, 'aria-selected': String(currentTab === id), onclick: () => select(id) }, h('span', { 'aria-hidden': 'true' }, icon), ' ', h('span.tab-label', {}, label)),
    ),
  );
  function select(id) {
    currentTab = id;
    tabBar.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === id)));
    body.replaceChildren(tabContent(id, q));
    if (id === 'rumus') body.querySelector('.rumus-item.hit')?.scrollIntoView({ block: 'center' });
    if (id === 'formula') store.addTo('revealed', q.id);
  }

  const right = h('section.book-page.right', { vars: { '--c': g.color } }, tabBar, body, h('div.page-num', {}, page));
  queueMicrotask(() => select(currentTab));
  return h('div.spread', {}, left, right);
}

function tabContent(id, q) {
  switch (id) {
    case 'formula':
      return h('div', {}, h('h3.panel-title', {}, t('rightFormula')), rightFormulas(q));
    case 'similar':
      return similar(q);
    case 'rumus':
      return rumus(q);
    case 'solution':
    default:
      return h('div.locked', {}, h('div.lock-icon', { 'aria-hidden': 'true' }, '🔒'), h('h3', {}, t('lockedTitle')), h('p.muted', {}, t('lockedBody')));
  }
}

// Another question that uses the same formula (else same chapter).
export function similarTo(q) {
  const mine = new Set(formulasFor(q, lang()));
  const others = QUESTIONS.filter((o) => o.id !== q.id);
  const scored = others
    .map((o) => ({ o, shared: formulasFor(o, lang()).filter((f) => mine.has(f)).length }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared);
  return scored[0]?.o ?? others.find((o) => o.chapter === q.chapter) ?? null;
}

function similar(q) {
  const s = similarTo(q);
  if (!s) return h('p.muted', {}, t('noSimilar'));
  const { el } = highlightedText(s, { tag: 'p.q-text.small' });
  return h('div.similar', {}, questionMeta(s), el, h('a.btn', { href: `#/book/q/${s.id}` }, t('openInBook'), ' →'));
}

// The official SPM formula page, grouped by G-CATS, with this question's formulas highlighted.
function rumus(q) {
  const need = new Set(formulasFor(q, lang()));
  const offSheet = [...need].filter((id) => !formulaById[id].onSheet);
  return h(
    'div.rumus',
    {},
    h('p.muted.small', {}, t('rumusNote')),
    offSheet.length ? h('div.off-sheet', {}, h('p.small', {}, '★ ', t('notOnSheet')), offSheet.map((id) => formulaCard(id, { compact: true }))) : null,
    GCATS.map((g) => {
      const items = FORMULAS.filter((f) => f.onSheet && chapterById[f.chapter].gcat === g.id);
      return h(
        'div.rumus-group',
        { vars: { '--c': g.color } },
        h('h4', {}, letterChip(g), ' ', tr(g.name)),
        items.map((f) => h(`div.rumus-item${need.has(f.id) ? '.hit' : ''}`, {}, formulaCard(f.id, { compact: true }))),
      );
    }),
  );
}

// Chapters of one G-CATS letter with their page range, e.g. Differentiation 6–9.
function chapterRanges(gcatId) {
  const ranges = [];
  BOOK.forEach((q, i) => {
    const chapter = chapterById[q.chapter];
    if (chapter.gcat !== gcatId) return;
    const last = ranges[ranges.length - 1];
    if (last?.chapter === chapter) last.to = i + 1;
    else ranges.push({ chapter, from: i + 1, to: i + 1 });
  });
  return ranges;
}

function indexSpread() {
  const firstPages = Object.fromEntries(GCATS.map((g) => [g.id, firstPageOf(g.id)]));
  return h(
    'div.spread.index-spread',
    {},
    h(
      'section.book-page.full',
      {},
      h('h1.page-title', {}, t('index')),
      h('p.muted.center', {}, t('indexSub')),
      gcatGrid((id) => `#/book/${firstPages[id]}`),
      h(
        'div.index-list',
        {},
        GCATS.map((g) =>
          h(
            'div.index-col',
            { vars: { '--c': g.color } },
            h('h4', {}, letterChip(g), ' ', tr(g.name)),
            chapterRanges(g.id).map(({ chapter, from, to }) =>
              h('a.index-entry', { href: `#/book/${from}` }, h('span', {}, tr(chapter.name)), h('span.dots'), h('span', {}, from === to ? from : `${from}–${to}`)),
            ),
          ),
        ),
      ),
    ),
  );
}

