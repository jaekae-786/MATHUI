// G-CATS page: five big letters. Tap one to jump to that category.
// Used as the G-CATS tab (feed) and as the back-of-book index (book mode).
import { h } from '../ui.js';
import { t, tr } from '../i18n.js';
import { store } from '../store.js';
import { GCATS, chaptersOf, chapterById } from '../data/gcats.js';
import { QUESTIONS } from '../data/questions.js';

export function gcatProgress(gcatId) {
  const qs = QUESTIONS.filter((q) => chapterById[q.chapter].gcat === gcatId);
  const seen = new Set(store.get().seen);
  const done = qs.filter((q) => seen.has(q.id)).length;
  return { done, total: qs.length, pct: qs.length ? Math.round((done / qs.length) * 100) : 0 };
}

// hrefFor(gcatId) decides where a letter jumps to (feed or a book page).
export function gcatGrid(hrefFor) {
  return h(
    'div.gcats-grid',
    {},
    GCATS.map((g) => {
      const p = gcatProgress(g.id);
      return h(
        'a.gcat-tile',
        { href: hrefFor(g.id), vars: { '--c': g.color, '--p': p.pct } },
        h('span.gcat-ring', { 'aria-hidden': 'true' }, h('span.gcat-letter', {}, g.id)),
        h('span.gcat-name', {}, tr(g.name)),
        h('span.gcat-stat', {}, `${p.done}/${p.total} ${t('done')}`),
        h('ul.gcat-chapters', {}, chaptersOf(g.id).map((c) => h('li', {}, tr(c.name)))),
      );
    }),
  );
}

export function renderGcats(root) {
  root.replaceChildren(
    h(
      'main.page.gcats-page',
      {},
      h('h1.page-title', {}, t('chooseGcats')),
      h('p.muted.center', {}, t('gcatsSub')),
      gcatGrid((id) => `#/feed/${id}`),
    ),
  );
}
