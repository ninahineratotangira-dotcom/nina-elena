#!/usr/bin/env node
/**
 * Compliance linter.
 *
 * Scans all customer-facing copy for language that would reclassify a product
 * as a therapeutic good under the TGA (AU) or Medsafe (NZ), or that would
 * breach the Fair Trading Act / Australian Consumer Law.
 *
 * Run before every deploy:  npm run check
 * Exits non-zero on a BLOCK, so it can gate a push.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// BLOCK  - converts the product into a regulated therapeutic good. Never ship.
// WARN   - context-dependent; a human must confirm it reads as a product
//          property rather than a physiological effect.
const RULES = [
  { level: 'BLOCK', re: /\b(cures?|curing|heals?|healing)\b/gi, why: 'Therapeutic claim (TGA/Medsafe)' },
  { level: 'BLOCK', re: /\btreat(s|ing|ment)?\b/gi, why: 'Therapeutic claim (TGA/Medsafe)' },
  { level: 'BLOCK', re: /\b(insomnia|sleep apnoea|sleep apnea|restless leg|sleep disorder)\b/gi, why: 'Names a medical condition' },
  { level: 'BLOCK', re: /\b(anxiety|depression|adhd)\b/gi, why: 'Names a medical condition' },
  { level: 'BLOCK', re: /\b(clinically|medically)\s+(proven|tested|validated)\b/gi, why: 'Implies clinical evidence' },
  { level: 'BLOCK', re: /\bdoctor[- ]recommended\b/gi, why: 'Implies professional endorsement' },
  { level: 'BLOCK', re: /\b(cortisol|melatonin|blood pressure|heart rate)\b/gi, why: 'Physiological mechanism claim' },
  { level: 'BLOCK', re: /\b(medical|pharmaceutical)[- ]grade\b/gi, why: 'Implies regulated classification' },
  { level: 'BLOCK', re: /\btherapeutic\b/gi, why: 'Directly invokes the regulated category' },
  { level: 'BLOCK', re: /\b(alleviat|reliev|remed)\w*\b/gi, why: 'Therapeutic claim verb' },
  { level: 'BLOCK', re: /\bmouth\s*tap(e|ing)\b/gi, why: 'ARTG-registered product category - excluded from this catalogue' },
  { level: 'WARN',  re: /\bprevents?\b/gi, why: 'Only safe about an object, never a condition' },
  { level: 'WARN',  re: /\bimproves?\b/gi, why: 'Safe about an object; a claim about the body' },
  { level: 'WARN',  re: /\b(boosts?|enhances?|increases?)\b/gi, why: 'Reads as a physiological claim' },
  { level: 'WARN',  re: /\bguarantee(s|d)?\b/gi, why: 'Absolute claim - Fair Trading Act exposure' },
  { level: 'WARN',  re: /\b\d+\s*%\s*(more|better|deeper|faster|longer)\b/gi, why: 'Quantified outcome needs evidence' },
];

const SOURCES = [
  { file: '../products/catalog.json', fields: ['title', 'body_html'], list: 'products' },
  { file: '../products/catalog.json', fields: ['title', 'body_html'], list: 'collections' },
  { file: '../content/pages.json', fields: ['title', 'body_html'], list: 'pages' },
];

const strip = (html) => String(html).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ');

/**
 * Some blocked words are legitimate in specific legal contexts:
 *  - the mandated medical disclaimer must say "diagnose, treat, cure or prevent"
 *  - statutory consumer-law wording must say "guarantees that cannot be excluded"
 * Both are required language, so exempt them rather than rewriting around them.
 */
const EXEMPTIONS = [
  /not intended to diagnose, treat, cure or prevent any condition/i,
  /guarantees that cannot be excluded under/i,
  /Consumer Guarantees Act/i,
  /Australian Consumer Law/i,
];
const isExempt = (text, index) => {
  const window = text.slice(Math.max(0, index - 150), index + 150);
  return EXEMPTIONS.some((re) => re.test(window));
};

let blocks = 0;
let warns = 0;

console.log('\n\x1b[1mCompliance check — NZ (Medsafe/Fair Trading) + AU (TGA/ACCC)\x1b[0m');

for (const src of SOURCES) {
  const data = JSON.parse(readFileSync(join(__dirname, src.file), 'utf8'));
  const items = data[src.list] ?? [];

  for (const item of items) {
    const text = src.fields.map((f) => strip(item[f] ?? '')).join(' \n ');
    const found = [];

    for (const rule of RULES) {
      rule.re.lastIndex = 0;
      let m;
      while ((m = rule.re.exec(text)) !== null) {
        if (isExempt(text, m.index)) continue;
        found.push({ ...rule, match: m[0] });
        if (rule.level === 'BLOCK') blocks++; else warns++;
      }
    }

    if (found.length) {
      console.log(`\n  ${item.handle ?? item.title}`);
      // Collapse repeats of the same phrase into one line.
      const seen = new Set();
      for (const f of found) {
        const key = `${f.level}:${f.match.toLowerCase()}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const tag = f.level === 'BLOCK' ? '\x1b[31mBLOCK\x1b[0m' : '\x1b[33m WARN\x1b[0m';
        console.log(`    ${tag}  "${f.match}" — ${f.why}`);
      }
    }
  }
}

console.log('');
if (blocks) {
  console.log(`\x1b[31m✗ ${blocks} blocking issue(s). Do not publish.\x1b[0m`);
  console.log('\x1b[2m  See ../strategy/01-compliance-nz-au.md for safe rewrites.\x1b[0m\n');
  process.exit(1);
}
if (warns) {
  console.log(`\x1b[33m! ${warns} warning(s) — review each reads as a product property, not a bodily effect.\x1b[0m\n`);
} else {
  console.log('\x1b[32m✓ Clean. No therapeutic-claim language found.\x1b[0m\n');
}
