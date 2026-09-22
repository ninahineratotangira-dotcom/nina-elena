/**
 * Inlines my-safe-place.css into a standalone preview page so the design
 * system can be viewed without a Shopify install. Run: node build-preview.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';

const css = readFileSync(new URL('./assets/my-safe-place.css', import.meta.url), 'utf8');
const body = readFileSync(new URL('./preview.body.html', import.meta.url), 'utf8');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>My Safe Place — Design Preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<style>
${css}

/* --- preview-only scaffolding (not part of the theme) --- */
* { box-sizing: border-box; }
body { margin: 0; }
.wrap { max-width: 1180px; margin: 0 auto; padding: 0 clamp(1rem, 5vw, 4rem); }
.hdr { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
.nav { display: flex; gap: 2rem; flex-wrap: wrap; }
.nav a { text-decoration: none; }
.hero { padding-block: var(--msp-s6) var(--msp-s5); max-width: 22ch; }
.hero p { color: var(--msp-stone); max-width: 42ch; font-size: 1.05rem; }
.shot { aspect-ratio: 4/5; background: var(--msp-porcelain); display: grid; place-items: center; }
.shot span { font-size: .64rem; letter-spacing: .22em; text-transform: uppercase; color: var(--msp-faint); }
.grid3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); column-gap: var(--msp-s4); row-gap: var(--msp-s4); }
.pdp { display: grid; grid-template-columns: 1fr 1fr; gap: var(--msp-s5); align-items: start; }
@media (max-width: 849px) { .pdp { grid-template-columns: 1fr; } }
.chips { display: flex; gap: .6rem; flex-wrap: wrap; margin-block: var(--msp-s3); }
.chip { border: 1px solid var(--msp-rule-firm); padding: .85rem 1.6rem; font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--msp-stone); }
.chip.on { background: var(--msp-ink); border-color: var(--msp-ink); color: var(--msp-linen); }
.rule { border: 0; border-top: 1px solid var(--msp-rule); margin: 0; }
.note { font-size: .8rem; color: var(--msp-stone); letter-spacing: .04em; }
.sw { display: flex; gap: 0; flex-wrap: wrap; margin-top: var(--msp-s2); }
.sw div { width: 96px; height: 76px; display: flex; align-items: flex-end; padding: .4rem; font-size: .58rem; letter-spacing: .08em; }
.toggle { position: fixed; top: 1rem; right: 1rem; z-index: 9; font-size: .64rem; letter-spacing: .18em; text-transform: uppercase; background: var(--msp-ink); color: var(--msp-linen); border: 0; padding: .7rem 1.1rem; cursor: pointer; font-family: 'Jost',sans-serif; }
</style>
</head>
<body>
<button class="toggle" onclick="document.documentElement.dataset.mspTheme = document.documentElement.dataset.mspTheme === 'dark' ? '' : 'dark'">Toggle dark</button>
${body}
</body>
</html>`;

writeFileSync(new URL('./preview.html', import.meta.url), html);
console.log(`preview.html written (${(html.length / 1024).toFixed(1)} KB)`);
