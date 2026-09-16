import { readFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';

const forbidden = [
  new RegExp(`\\b${'a' + 'leo'}\\b`, 'i'),
  /@provablehq/i,
  new RegExp('null' + 'pay', 'i'),
];
const files = ['package.json'];
for await (const file of glob('src/**/*.{ts,tsx,css}', { cwd: new URL('..', import.meta.url) })) {
  files.push(file);
}

const violations = [];
for (const file of files) {
  const text = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
  if (forbidden.some((pattern) => pattern.test(text))) violations.push(file);
}

if (violations.length) {
  console.error(`Legacy chain references remain: ${violations.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('No legacy chain references found.');
}
