// Shared UI building blocks.
import { detect, segments, formulasFor } from './detector.js';
import { formulaById } from './data/formulas.js';
import { chapterById, gcatById } from './data/gcats.js';
import { t, tr, lang } from './i18n.js';

// h('div.card#id', { onclick, style, ... }, ...children)
export function h(tag, props = {}, ...children) {
  const [, name = 'div', rest = ''] = tag.match(/^([a-z0-9-]*)(.*)$/i);
  const el = document.createElement(name || 'div');
  for (const part of rest.match(/[.#][^.#]+/g) ?? []) {
    if (part[0] === '.') el.classList.add(part.slice(1));
    else el.id = part.slice(1);
  }
  for (const [k, v] of Object.entries(props ?? {})) {
    if (v == null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k === 'vars') for (const [n, val] of Object.entries(v)) el.style.setProperty(n, val);
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

// Render LaTeX with the bundled KaTeX; fall back to plain text if unavailable.
export function math(tex, text, { display = false } = {}) {
  const el = h('span.math');
  if (window.katex) {
    try {
      window.katex.render(tex, el, { displayMode: display, throwOnError: false });
      return el;
    } catch {
      /* fall through */
    }
  }
  el.textContent = text ?? tex;
  el.classList.add('math-fallback');
  return el;
}

export const gcatOf = (q) => gcatById[chapterById[q.chapter].gcat];
export const qText = (q) => q.text[lang()] ?? q.text.en;

export function letterChip(gcat, { size = '' } = {}) {
  return h(`span.letter-chip${size ? '.' + size : ''}`, { vars: { '--c': gcat.color }, title: tr(gcat.name) }, gcat.id);
}

export function questionMeta(q) {
  const g = gcatOf(q);
  const src = q.source === 'sample' ? t('sample') : `SPM ${q.year}`;
  return h(
    'div.q-meta',
    {},
    letterChip(g),
    h('div.q-meta-text', {}, h('strong', {}, tr(chapterById[q.chapter].name)), h('span', {}, `${src} · ${t('paper')} ${q.paper === 'K1' ? 1 : 2} · ${q.marks} ${t('marks')}`)),
  );
}

// Question text with detected keywords highlighted. Tapping a keyword opens a
// popover showing which formula it points to.
export function highlightedText(q, { tag = 'p.q-text' } = {}) {
  const text = qText(q);
  const result = detect(text);
  const home = chapterById[q.chapter].gcat;
  const el = h(tag);
  for (const seg of segments(text, result.matches)) {
    if (!seg.match) {
      el.append(seg.text);
      continue;
    }
    const gid = seg.match.gcats.includes(home) ? home : seg.match.gcats[0];
    el.append(
      h(
        'mark.kw',
        {
          vars: { '--c': gcatById[gid].color },
          tabindex: 0,
          role: 'button',
          onclick: (e) => showKeywordPopover(e.currentTarget, seg.match, home),
          onkeydown: (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), showKeywordPopover(e.currentTarget, seg.match, home)),
        },
        seg.text,
      ),
    );
  }
  return { el, result };
}

// Keyword chips ("gradient of the tangent → Tangent & normal").
export function keywordChips(result, home) {
  if (!result.matches.length) return h('p.muted.small', {}, t('noKeywords'));
  const seen = new Set();
  const chips = [];
  for (const m of result.matches) {
    const key = m.phrase.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const fid = pickFormula(m, home);
    const g = gcatById[m.gcats.includes(home) ? home : m.gcats[0]];
    chips.push(h('span.kw-chip', { vars: { '--c': g.color } }, h('b', {}, m.phrase), ' → ', tr(formulaById[fid].name)));
  }
  return h('div.kw-chips', {}, chips);
}

function pickFormula(match, home) {
  return match.formulas.find((id) => chapterById[formulaById[id].chapter].gcat === home) ?? match.formulas[0];
}

export function formulaCard(id, { compact = false } = {}) {
  const f = formulaById[id];
  const g = gcatById[chapterById[f.chapter].gcat];
  return h(
    `div.formula-card${compact ? '.compact' : ''}`,
    { vars: { '--c': g.color } },
    h('div.formula-name', {}, tr(f.name), f.onSheet ? null : h('span.badge', { title: t('notOnSheet') }, '★')),
    h('div.formula-math', {}, math(f.tex, f.text, { display: !compact })),
  );
}

export function rightFormulas(q) {
  return h('div.formula-list', {}, formulasFor(q, lang()).map((id) => formulaCard(id)));
}

// ── Popover ──
let popover;
function showKeywordPopover(anchor, match, home) {
  closePopover();
  const fid = pickFormula(match, home);
  popover = h(
    'div.popover',
    { role: 'dialog' },
    h('div.popover-head', {}, h('b', {}, `“${match.phrase}”`), ` ${t('pointsTo')}`),
    formulaCard(fid, { compact: true }),
  );
  document.body.append(popover);
  const r = anchor.getBoundingClientRect();
  const pw = popover.offsetWidth;
  const left = Math.min(Math.max(8, r.left + r.width / 2 - pw / 2), window.innerWidth - pw - 8);
  const below = r.bottom + 8 + popover.offsetHeight < window.innerHeight;
  popover.style.left = `${left}px`;
  popover.style.top = `${below ? r.bottom + 8 : r.top - popover.offsetHeight - 8}px`;
  setTimeout(() => document.addEventListener('pointerdown', onOutside, { once: true }), 0);
}
function onOutside(e) {
  if (popover && !popover.contains(e.target)) closePopover();
  else if (popover) document.addEventListener('pointerdown', onOutside, { once: true });
}
export function closePopover() {
  popover?.remove();
  popover = null;
}

// ── Toast ──
let toastTimer;
export function toast(message) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = h('div.toast', { role: 'status', 'aria-live': 'polite' });
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

export async function copyLink(hash) {
  const url = `${location.origin}${location.pathname}${hash}`;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    /* clipboard blocked: still show the toast so the user knows the link */
  }
  toast(t('linkCopied'));
}

export function logo(size = '') {
  return h(`div.logo${size ? '.' + size : ''}`, { 'aria-label': 'MATHUI' }, 'MATH', h('span', {}, 'UI'));
}
