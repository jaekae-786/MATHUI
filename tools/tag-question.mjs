#!/usr/bin/env node
// Tag a question from the command line – first step of the data pipeline.
//
//   npm run tag -- "Find the equation of the tangent to the curve y = x² at (1, 1)."
//   echo "Cari kadar perubahan luas bulatan" | npm run tag
//
// Prints the detected keywords, suggested formulas and G-CATS letter so a
// human can confirm them before the question is added to js/data/questions.js.

import { detect } from '../js/detector.js';
import { formulaById } from '../js/data/formulas.js';
import { gcatById } from '../js/data/gcats.js';

async function readInput() {
  const arg = process.argv.slice(2).join(' ').trim();
  if (arg) return arg;
  if (process.stdin.isTTY) return '';
  let data = '';
  for await (const chunk of process.stdin) data += chunk;
  return data.trim();
}

const text = await readInput();
if (!text) {
  console.error('Usage: npm run tag -- "<question text>"');
  process.exit(1);
}

const r = detect(text);
console.log(`\nQuestion: ${text}\n`);
if (!r.matches.length) {
  console.log('No keywords found → tag this question by hand (and consider adding new keywords).');
  process.exit(0);
}
console.log('Keywords:');
for (const m of r.matches) console.log(`  • "${m.phrase}" (w${m.weight}) → ${m.formulas.join(', ')}`);
console.log(`\nG-CATS: ${r.gcats.map((g) => `${g.id} (${gcatById[g.id].name.en}) ${g.score}`).join(' | ')}`);
console.log('\nSuggested formulas:');
for (const f of r.formulas.slice(0, 5)) {
  console.log(`  ${String(f.score).padStart(2)}  ${f.id.padEnd(18)} ${formulaById[f.id].text}`);
}
console.log(`\nSuggested tag: formulas: ${JSON.stringify(r.formulas.slice(0, 2).map((f) => f.id))}\n`);
