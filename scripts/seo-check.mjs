// Checks every title and description in src/data/seo.ts against search-result length limits.
// Usage: npm run seo:check
import { PAGE_SEO, PRODUCT_SEO, INDUSTRY_SEO, ARTICLE_SEO } from '../src/data/seo.ts';
import products from '../src/data/products.json' with { type: 'json' };

const SUFFIX = ' | ALL PACK';
const groups = { page: PAGE_SEO, product: PRODUCT_SEO, industry: INDUSTRY_SEO, article: ARTICLE_SEO };
let problems = 0;
const seen = new Map();

for (const [group, entries] of Object.entries(groups)) {
  for (const [key, s] of Object.entries(entries)) {
    const full = s.absolute ? s.title : s.title + SUFFIX;
    const issues = [];
    if (full.length > 60) issues.push(`title ${full.length} > 60`);
    if (s.description.length < 120 || s.description.length > 160) issues.push(`description ${s.description.length} (want 120-160)`);
    for (const [kind, v] of [['title', full], ['description', s.description]]) {
      if (seen.has(v)) issues.push(`duplicate ${kind} with ${seen.get(v)}`);
      seen.set(v, `${group}:${key}`);
    }
    if (issues.length) { problems++; console.log(`✗ ${group}:${key} — ${issues.join(', ')}`); }
    else console.log(`✓ ${group}:${key} (${full.length} / ${s.description.length})`);
  }
}
for (const p of products) if (!PRODUCT_SEO[p.slug]) { problems++; console.log(`✗ product:${p.slug} — missing SEO entry`); }
if (problems) { console.log(`\n${problems} problem(s)`); process.exit(1); }
console.log('\nAll titles and descriptions are within limits.');
