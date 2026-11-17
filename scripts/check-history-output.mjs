import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const frontmatter = name => JSON.parse(read(`src/content/history/${name}.md`).split('---')[1]);
const baseline = JSON.parse(read('research/retired-history-react-baseline-2026-10-27/public-content.json'));
const current = { ...frontmatter('history-public-records'), INTRO_TEXT: frontmatter('history-introduction').text,
  METHOD_PROMPTS: frontmatter('history-prompts').prompts,
  SUMMARIES_DATA: Array.from({length:9}, (_, i) => frontmatter(`history-summary-${String(i+1).padStart(2,'0')}`)) };
assert.deepEqual(current, baseline, 'Complete public projection, order, links and prompt bytes match baseline');
const html = read('dist/index.html');
const decode = s => s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&#x27;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const text = decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g,' ');
const normal = s => s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
for (const items of [baseline.TIMELINE_DATA, baseline.VIDEO_LIST, baseline.QUOTES_DATA, baseline.THEMES_DATA, baseline.SUMMARIES_DATA]) {
  for (const item of items) assert(text.includes(normal(item.title ?? item.videoTitle)), 'Every record title rendered');
}
for (const prompts of Object.values(baseline.METHOD_PROMPTS)) for (const p of prompts) {
  assert(text.includes(normal(p.text)), 'Every exact prompt rendered');
}
for (const group of baseline.QUOTES_DATA) for (const quote of group.quotes) {
  assert(text.includes(normal(quote.text)), 'Every historical quotation rendered');
  assert(decode(html).includes(quote.link), 'Every original timecode URL rendered');
}
for (const summary of baseline.SUMMARIES_DATA) for (const section of summary.sections) {
  assert(text.includes(normal(section.content)), 'Every saved rich-text summary rendered');
}
assert.equal((html.match(/<details\b/g) ?? []).length, 9, 'Nine native summaries');
assert(!/<details[^>]*\bopen(?:\s|[=>])/i.test(html), 'Summaries begin collapsed');
assert.equal((html.match(/<(?:div|details)\b[^>]*\bdata-filter-item\b/g) ?? []).length, 36, 'Distinct filter boundaries for timeline/videos/quote groups/summaries');
for (const id of ['methods','timeline','videos','quotes','themes','summaries', 'method-timeline','method-videos','method-quotes','method-themes','method-summaries']) {
  assert(html.includes(`id="${id}"`), 'Existing section identifier preserved');
}
assert(!/<meta[^>]*(?:content-security-policy|x-frame-options)/i.test(html), 'No document framing restriction introduced');
assert(!/astro-island|react-dom|aistudiocdn|cdn\.tailwindcss|GEMINI_API_KEY|process\.env/.test(html), 'No framework runtime, CDN runtime or API-key substitution');
const root = new URL('../dist/',import.meta.url).pathname;
function walk(dir) {return readdirSync(dir,{withFileTypes:true}).flatMap(f => f.isDirectory()?walk(join(dir,f.name)):[relative(root,join(dir,f.name))]);}
const files=walk(root);
const approvedIcons = ['favicon.ico', 'favicon-people-and-computers-20261028.svg', 'favicon-people-and-computers-20261028.ico', 'apple-touch-icon-people-and-computers-20261028.png'];
for (const file of files) assert(file === 'index.html' || approvedIcons.includes(file) || /^_astro\/[^/]+\.(css|js)$/.test(file), 'Only reviewed page, icons and built CSS/JS in output: '+file);
for (const file of approvedIcons) assert(files.includes(file), 'Approved icon present in output: '+file);
for (const file of files) assert(!/history-rerun|research\/|\.env|retired-|transcript|manifest-history/.test(file), 'No private or unpublished file emitted');
for (const file of files.filter(f=>f.endsWith('.js'))) assert(!/createRoot|react-dom|GEMINI_API_KEY|innerHTML|insertAdjacentHTML/.test(read('dist/'+file)), 'Browser module contains no framework, substitution or HTML injection');
console.log(JSON.stringify({status:'pass', contentProjection:'exact baseline equality', records:{timeline:9,videos:9,quoteGroups:9,quotes:17,themes:3,summaries:9}, routes:['/'], publicFiles:files, framing:'No document-level restriction; live response headers remain hosting owner responsibility'},null,2));
