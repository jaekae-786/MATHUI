// 5-second category intro ("ad"): the big G-CATS letter morphs into the
// category's signature formula, then the feed starts.
//   0–2 s   big letter pops in
//   2–4 s   letter fades, formula appears          (Skip button shows at 2 s)
//   4–5 s   category name → done
// After the first full play in a session, a short 1.5 s version plays instead.
import { h, math } from '../ui.js';
import { t, tr } from '../i18n.js';
import { gcatById } from '../data/gcats.js';
import { session } from '../store.js';

export function playIntro(gcatId) {
  const g = gcatById[gcatId];
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const short = reduced || session.get(`intro:${gcatId}`) === '1';
  session.set(`intro:${gcatId}`, '1');

  return new Promise((resolve) => {
    const timers = [];
    const finish = () => {
      timers.forEach(clearTimeout);
      document.removeEventListener('keydown', onKey);
      overlay.classList.add('out');
      setTimeout(() => overlay.remove(), 250);
      resolve();
    };
    const onKey = (e) => e.key === 'Escape' && finish();

    const skip = h('button.intro-skip', { type: 'button', onclick: finish }, `${t('skip')} ›`);
    const overlay = h(
      `div.intro${short ? '.short' : ''}`,
      { vars: { '--c': g.color }, role: 'dialog', 'aria-label': tr(g.name) },
      h('div.intro-letter', { 'aria-hidden': 'true' }, g.id),
      h('div.intro-formula', {}, math(g.introTex, g.introText, { display: true })),
      h('div.intro-name', {}, tr(g.name)),
      h('div.intro-bar', {}, h('span')),
      skip,
    );
    document.body.append(overlay);
    document.addEventListener('keydown', onKey);

    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    if (short) {
      at(0, () => overlay.classList.add('s-name'));
      at(1500, finish);
    } else {
      at(2000, () => overlay.classList.add('s-formula', 'can-skip'));
      at(4000, () => overlay.classList.add('s-name'));
      at(5000, finish);
    }
  });
}
