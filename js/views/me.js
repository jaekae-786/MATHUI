// Profile: language switch, G-CATS progress, saved questions, sign out.
import { h, letterChip, gcatOf, qText, logo } from '../ui.js';
import { t, tr, LANGS } from '../i18n.js';
import { store } from '../store.js';
import { GCATS } from '../data/gcats.js';
import { questionById } from '../data/questions.js';
import { gcatProgress } from './gcats.js';
import { navigate } from '../router.js';

export function renderMe(root) {
  const { user, lang, saved } = store.get();

  const langRow = h(
    'div.lang-row.small',
    {},
    LANGS.map((l) =>
      h('button.lang-btn', { type: 'button', 'aria-pressed': String(lang === l.id), onclick: () => { store.set({ lang: l.id }); navigate('#/me'); } }, l.label),
    ),
  );

  const progress = h(
    'div.progress-list',
    {},
    GCATS.map((g) => {
      const p = gcatProgress(g.id);
      return h(
        'div.progress-row',
        { vars: { '--c': g.color } },
        letterChip(g),
        h('span.progress-name', {}, tr(g.name)),
        h('span.progress-bar', { role: 'progressbar', 'aria-valuenow': p.pct, 'aria-valuemin': 0, 'aria-valuemax': 100 }, h('span', { style: { width: `${p.pct}%` } })),
        h('span.progress-num', {}, `${p.done}/${p.total}`),
      );
    }),
  );

  const savedList = saved.map((id) => questionById[id]).filter(Boolean);

  root.replaceChildren(
    h(
      'main.page.me-page',
      {},
      logo(),
      h('h1.page-title', {}, `${t('hi')}, ${user?.name ?? ''} 👋`),
      h('p.muted.center', {}, user?.email ?? ''),
      h('section.panel', {}, h('h3.panel-title', {}, t('language')), langRow),
      h('section.panel', {}, h('h3.panel-title', {}, t('progress')), progress),
      h(
        'section.panel',
        {},
        h('h3.panel-title', {}, '❤ ', t('savedQuestions')),
        savedList.length
          ? h('ul.saved-list', {}, savedList.map((q) => h('li', {}, h('a', { href: `#/book/q/${q.id}` }, letterChip(gcatOf(q)), h('span', {}, qText(q))))))
          : h('p.muted.small', {}, t('noSaved')),
      ),
      h('button.btn.ghost.wide', { type: 'button', onclick: () => { store.signOut(); navigate('#/signin'); } }, t('signOut')),
    ),
  );
}
