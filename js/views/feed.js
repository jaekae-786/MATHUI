// TikTok-style vertical feed: one question per screen, keywords highlighted,
// tap to reveal the right formula.
import { h, questionMeta, highlightedText, keywordChips, rightFormulas, toast, copyLink, gcatOf, letterChip } from '../ui.js';
import { t, tr } from '../i18n.js';
import { store } from '../store.js';
import { QUESTIONS } from '../data/questions.js';
import { GCATS, chapterById, gcatById } from '../data/gcats.js';
import { playIntro } from './intro.js';
import { navigate } from '../router.js';

// Order: unseen questions first; in the mixed feed, rotate through G C A T S
// so consecutive cards come from different categories.
export function feedOrder(gcatId, seen = new Set()) {
  const pool = gcatId ? QUESTIONS.filter((q) => chapterById[q.chapter].gcat === gcatId) : QUESTIONS;
  const byFresh = (list) => [...list.filter((q) => !seen.has(q.id)), ...list.filter((q) => seen.has(q.id))];
  if (gcatId) return byFresh(pool);
  const buckets = GCATS.map((g) => byFresh(pool.filter((q) => chapterById[q.chapter].gcat === g.id)));
  const out = [];
  for (let i = 0; buckets.some((b) => i < b.length); i++) for (const b of buckets) if (b[i]) out.push(b[i]);
  return byFresh(out);
}

export async function renderFeed(root, gcatId) {
  if (gcatId && !gcatById[gcatId]) return navigate('#/feed', { replace: true });
  const order = feedOrder(gcatId, new Set(store.get().seen));

  const feed = h('div.feed', { tabindex: 0, 'aria-label': t('navFeed') });
  for (const q of order) feed.append(card(q));
  feed.append(endCard());

  const header = h(
    'div.feed-top',
    {},
    h('button.pill', { type: 'button', 'aria-pressed': String(!gcatId), onclick: () => navigate('#/feed') }, t('allCategories')),
    GCATS.map((g) =>
      h(
        'button.pill.letter',
        { type: 'button', vars: { '--c': g.color }, 'aria-pressed': String(gcatId === g.id), title: tr(g.name), onclick: () => navigate(`#/feed/${g.id}`) },
        g.id,
      ),
    ),
  );

  root.replaceChildren(h('div.feed-wrap', {}, header, feed));

  // Track "seen" when a card is mostly on screen.
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.dataset.id && store.addTo('seen', e.target.dataset.id)),
    { root: feed, threshold: 0.6 },
  );
  feed.querySelectorAll('.card[data-id]').forEach((c) => io.observe(c));

  // Arrow keys / j k move one card, like a video feed.
  feed.addEventListener('keydown', (e) => {
    const dir = { ArrowDown: 1, j: 1, ArrowUp: -1, k: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    feed.scrollBy({ top: dir * feed.clientHeight, behavior: 'smooth' });
  });

  if (gcatId) await playIntro(gcatId);
  feed.focus({ preventScroll: true });
}

function card(q) {
  const g = gcatOf(q);
  const { el: text, result } = highlightedText(q);
  const formulas = h('div.formula-panel', { hidden: true }, h('h3.panel-title', {}, t('rightFormula')), rightFormulas(q));
  const state = store.get();

  const revealBtn = h('button.btn.reveal', { type: 'button', onclick: () => toggleReveal() }, '💡 ', t('revealFormula'));
  function toggleReveal(force) {
    const show = force ?? formulas.hidden;
    formulas.hidden = !show;
    revealBtn.lastChild.textContent = show ? t('hideFormula') : t('revealFormula');
    railFormula.setAttribute('aria-pressed', String(show));
    if (show) store.addTo('revealed', q.id);
  }

  const saveBtn = railButton('❤', state.saved.includes(q.id) ? t('saved') : t('save'), state.saved.includes(q.id), () => {
    const on = store.toggleIn('saved', q.id);
    saveBtn.setAttribute('aria-pressed', String(on));
    saveBtn.querySelector('small').textContent = on ? t('saved') : t('save');
  });
  const railFormula = railButton('💡', t('formula'), false, () => toggleReveal());
  const railSolution = railButton('🔒', t('solution'), false, () => toast(t('premiumSoon')));
  const railShare = railButton('↗', t('share'), false, () => copyLink(`#/book/q/${q.id}`));

  return h(
    'section.card',
    { 'data-id': q.id, vars: { '--c': g.color } },
    h(
      'div.card-body',
      {},
      questionMeta(q),
      text,
      h('div.kw-block', {}, h('h3.panel-title', {}, '🔑 ', t('keywords')), keywordChips(result, g.id)),
      revealBtn,
      formulas,
    ),
    h('aside.rail', {}, saveBtn, railFormula, railSolution, railShare),
  );
}

function railButton(icon, label, pressed, onclick) {
  return h('button.rail-btn', { type: 'button', 'aria-pressed': String(pressed), onclick }, h('span', { 'aria-hidden': 'true' }, icon), h('small', {}, label));
}

function endCard() {
  return h(
    'section.card.end-card',
    {},
    h(
      'div.card-body.center',
      {},
      h('div.end-emoji', { 'aria-hidden': 'true' }, '🎉'),
      h('h2', {}, t('endOfFeed')),
      h('p.muted', {}, t('endOfFeedSub')),
      h('div.end-letters', {}, GCATS.map((g) => h('a', { href: `#/feed/${g.id}`, 'aria-label': tr(g.name) }, letterChip(g, { size: 'lg' })))),
      h('a.btn', { href: '#/book' }, '📖 ', t('navBook')),
    ),
  );
}
