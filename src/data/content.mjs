// Reads editable content from /content (JSON and Markdown with simple frontmatter).
// Everything in /content can be edited from the web through Pages CMS (see .pages.yml).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'content');

export const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));

export function parseFrontmatter(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split('\n')) {
    const k = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!k) continue;
    let v = k[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1).replace(/\\"/g, '"');
    if (v === 'true') v = true;
    else if (v === 'false') v = false;
    data[k[1]] = v;
  }
  return { data, body: m[2].trim() };
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function inline(s) {
  return esc(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
}

// Small Markdown to HTML converter: headings, paragraphs, lists, links, bold, italic.
export function md(src) {
  const out = [];
  let list = null;
  const flush = () => { if (list) { out.push(`</${list}>`); list = null; } };
  const blocks = src.replace(/\r\n/g, '\n').split(/\n{2,}/);
  for (const b of blocks) {
    const lines = b.split('\n').filter((l) => l.trim());
    if (!lines.length) continue;
    if (/^#{1,6}\s/.test(lines[0])) {
      flush();
      const lvl = Math.min(Math.max(lines[0].match(/^#+/)[0].length, 2), 4);
      out.push(`<h${lvl}>${inline(lines[0].replace(/^#+\s*/, ''))}</h${lvl}>`);
      if (lines.length > 1) out.push(`<p>${inline(lines.slice(1).join(' '))}</p>`);
    } else if (lines.every((l) => /^\s*([-*]|\d+\.)\s+/.test(l))) {
      flush();
      const tag = /^\s*\d+\./.test(lines[0]) ? 'ol' : 'ul';
      out.push(`<${tag}>${lines.map((l) => `<li>${inline(l.replace(/^\s*([-*]|\d+\.)\s+/, ''))}</li>`).join('')}</${tag}>`);
    } else {
      flush();
      out.push(`<p>${inline(lines.join(' '))}</p>`);
    }
  }
  flush();
  return out.join('\n');
}

export function readCollection(dir) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, body } = parseFrontmatter(fs.readFileSync(path.join(full, f), 'utf8'));
      return { slug: f.replace(/\.md$/, ''), ...data, body, html: md(body) };
    })
    .filter((x) => !x.draft);
}
