// Language picker (before sign-in) and demo sign-in.
import { h, logo } from '../ui.js';
import { t, LANGS } from '../i18n.js';
import { store } from '../store.js';
import { GCATS } from '../data/gcats.js';
import { navigate } from '../router.js';

export function renderWelcome(root) {
  let chosen = store.get().lang;
  const buttons = LANGS.map((l) =>
    h(
      'button.lang-btn',
      {
        type: 'button',
        'aria-pressed': String(chosen === l.id),
        onclick: () => {
          chosen = l.id;
          store.set({ lang: l.id });
          renderWelcome(root); // re-render so the copy switches language instantly
        },
      },
      l.label,
    ),
  );

  root.replaceChildren(
    h(
      'main.onboard',
      {},
      h('div.onboard-letters', { 'aria-hidden': 'true' }, GCATS.map((g, i) => h('span', { vars: { '--c': g.color, '--i': i } }, g.id))),
      logo('xl'),
      h('p.tagline', {}, t('tagline')),
      h('h2.onboard-q', {}, chosen ? t('chooseLang') : 'Pilih bahasa · Choose your language'),
      h('div.lang-row', {}, buttons),
      h('button.btn.primary.wide', { type: 'button', disabled: !chosen, onclick: () => navigate('#/signin') }, chosen ? t('continue') : 'Teruskan · Continue'),
    ),
  );
}

export function renderSignIn(root) {
  const form = h(
    'form.signin-form',
    {
      onsubmit: (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get('name') ?? '').trim();
        const email = String(data.get('email') ?? '').trim();
        if (!name || !email) return;
        store.set({ user: { name, email } });
        navigate('#/feed');
      },
    },
    h('label', {}, t('name'), h('input', { name: 'name', required: true, autocomplete: 'name', maxlength: 60 })),
    h('label', {}, t('email'), h('input', { name: 'email', type: 'email', required: true, autocomplete: 'email' })),
    h('button.btn.primary.wide', { type: 'submit' }, t('signIn')),
    h('p.muted.small.center', {}, t('demoNote')),
  );

  root.replaceChildren(
    h(
      'main.onboard',
      {},
      h('button.link-btn.back', { type: 'button', onclick: () => navigate('#/welcome') }, '← ', t('language')),
      logo('lg'),
      h('h2', {}, t('signInTitle')),
      h('p.muted', {}, t('signInSub')),
      form,
    ),
  );
}
