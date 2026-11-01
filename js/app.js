// MATHUI web app entry: app shell, navigation and routing.
import { h, logo, closePopover } from './ui.js';
import { t, lang } from './i18n.js';
import { store } from './store.js';
import { parseHash, navigate } from './router.js';
import { renderWelcome, renderSignIn } from './views/onboarding.js';
import { renderFeed } from './views/feed.js';
import { renderGcats } from './views/gcats.js';
import { renderBook } from './views/book.js';
import { renderMe } from './views/me.js';

const app = document.getElementById('app');

const NAV = [
  { name: 'feed', icon: '▶', label: 'navFeed', href: '#/feed' },
  { name: 'gcats', icon: '◆', label: 'navGcats', href: '#/gcats' },
  { name: 'book', icon: '📖', label: 'navBook', href: '#/book' },
  { name: 'me', icon: '👤', label: 'navMe', href: '#/me' },
];

function shell(active) {
  const view = h('div.view');
  const nav = h(
    'nav.nav',
    { 'aria-label': 'MATHUI' },
    h('div.nav-logo', {}, logo()),
    NAV.map((n) =>
      h(`a.nav-item${n.name === active ? '.active' : ''}`, { href: n.href, 'aria-current': n.name === active ? 'page' : null }, h('span.nav-icon', { 'aria-hidden': 'true' }, n.icon), h('span.nav-label', {}, t(n.label))),
    ),
  );
  app.replaceChildren(h('div.shell', {}, nav, view));
  return view;
}

function route() {
  closePopover();
  document.documentElement.lang = lang() === 'ms' ? 'ms' : 'en';
  const { name, params } = parseHash();
  const { lang: chosen, user } = store.get();

  // Onboarding: language first, then sign-in.
  if (!chosen || name === 'welcome') return renderWelcome(app);
  if (!user || name === 'signin') return user ? navigate('#/feed', { replace: true }) : renderSignIn(app);

  switch (name) {
    case 'feed':
      return renderFeed(shell('feed'), params[0]?.toUpperCase());
    case 'gcats':
      return renderGcats(shell('gcats'));
    case 'book':
      return renderBook(shell('book'), params);
    case 'me':
      return renderMe(shell('me'));
    default:
      return navigate('#/feed', { replace: true });
  }
}

window.addEventListener('hashchange', route);
route();
