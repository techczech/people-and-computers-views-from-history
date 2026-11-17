import { frontmatter as records } from '../../content/history/history-public-records.md';
import { frontmatter as introduction } from '../../content/history/history-introduction.md';
import { frontmatter as prompts } from '../../content/history/history-prompts.md';
import { frontmatter as ui } from '../../content/history/history-interface.md';
import type { TimelineEvent, VideoItem, QuoteItem, ThemeItem, SummaryItem } from './history-types';
const summaries = import.meta.glob<{frontmatter: SummaryItem}>('../../content/history/history-summary-*.md', { eager: true });
export const TIMELINE_DATA: TimelineEvent[] = records.TIMELINE_DATA;
export const VIDEO_LIST: VideoItem[] = records.VIDEO_LIST;
export const QUOTES_DATA: QuoteItem[] = records.QUOTES_DATA;
export const THEMES_DATA: ThemeItem[] = records.THEMES_DATA;
export const SUMMARIES_DATA: SummaryItem[] = Object.keys(summaries).sort().map(key => summaries[key].frontmatter);
export const INTRO_TEXT: string = introduction.text;
export const METHOD_PROMPTS = prompts.prompts as Record<string, {label:string; text:string}[]>;
export const copy = ui.copy as Record<string, string>;
export const sections = ui.sections as {id:string; label:string; icon:string}[];
export const documentTitle: string = ui.documentTitle;
// Fail the build rather than silently publish incomplete content or unsafe links.
for (const [items, count] of [[TIMELINE_DATA,9],[VIDEO_LIST,9],[QUOTES_DATA,9],[THEMES_DATA,3],[SUMMARIES_DATA,9]] as const) {
  if (items.length !== count) throw new Error('Historical collection count changed');
}
for (const url of [...VIDEO_LIST.map(v => v.link), ...QUOTES_DATA.flatMap(q => q.quotes.map(q => q.link)), ...SUMMARIES_DATA.map(s => s.metadata.link)]) {
  if (new URL(url).protocol !== 'https:') throw new Error('Historical link must use HTTPS');
}
for (const summary of SUMMARIES_DATA) for (const section of summary.sections) {
  const tags = section.content.match(/<[^>]+>/g) ?? [];
  if (tags.some(tag => !/^<\/?(?:strong|br|ul|ol|li|blockquote)\s*\/?>$/.test(tag))) throw new Error('Unreviewed authored summary HTML');
}
