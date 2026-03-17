import { readFileSync } from 'node:fs';
import path from 'node:path';

const configPath = path.join(process.cwd(), 'postcss.config.js');
const source = readFileSync(configPath, 'utf8');

const hasCorrectPlugin = source.includes("'@tailwindcss/postcss'") || source.includes('"@tailwindcss/postcss"');
const hasLegacyPlugin = /(^|\W)tailwindcss\s*:\s*\{/.test(source);

if (!hasCorrectPlugin || hasLegacyPlugin) {
  console.error('Invalid Tailwind PostCSS config detected.');
  console.error("Use '@tailwindcss/postcss' and do not use legacy 'tailwindcss' PostCSS plugin key.");
  process.exit(1);
}

console.log('PostCSS Tailwind config check passed.');
