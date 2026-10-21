import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, nav, partners } from './data/site.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(here, 'assets', 'img');

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const slugify = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Finds an optional image in src/assets/img by base name (jpg, jpeg, png, webp).
export function findImg(base) {
  for (const ext of ['webp', 'jpg', 'jpeg', 'png']) {
    if (fs.existsSync(path.join(imgDir, `${base}.${ext}`))) return `/img/${base}.${ext}`;
  }
  return null;
}

export const compassSvg = (cls = '') => `<svg class="${cls}" viewBox="0 0 200 200" fill="none" aria-hidden="true" focusable="false">
<circle cx="100" cy="100" r="94" stroke="currentColor" stroke-width="1.5"/>
<circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="1" stroke-dasharray="2 6"/>
<g fill="currentColor"><path d="M100 4 L111 89 L196 100 L111 111 L100 196 L89 111 L4 100 L89 89Z"/></g>
<g fill="currentColor" opacity=".5" transform="translate(100 100) rotate(45) scale(.62) translate(-100 -100)"><path d="M100 4 L111 89 L196 100 L111 111 L100 196 L89 111 L4 100 L89 89Z"/></g>
<circle cx="100" cy="100" r="9" fill="var(--compass-hub, #1c2126)"/>
</svg>`;

// Deterministic topographic contour lines, used as a subtle background texture.
export function topoSvg(stroke, opacity) {
  const cx = 420, cy = 300;
  let paths = '';
  for (let k = 1; k <= 16; k++) {
    const base = 26 * k;
    const pts = [];
    for (let i = 0; i <= 90; i++) {
      const t = (i / 90) * Math.PI * 2;
      const wob = Math.sin(2 * t + k * 0.55) * 14 + Math.sin(3 * t - k * 0.9) * 9 + Math.cos(5 * t + k) * 4;
      const r = base * 1.25 + wob + k * 3;
      pts.push(`${(cx + Math.cos(t) * r * 1.55).toFixed(1)},${(cy + Math.sin(t) * r * 0.95).toFixed(1)}`);
    }
    paths += `<polyline points="${pts.join(' ')}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 600" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1.2" stroke-linejoin="round">${paths}</g></svg>`;
}

/* ---------- small components ---------- */

export const btn = (label, href, variant = 'primary') => {
  const ext = /^https?:/.test(href);
  return `<a class="btn btn-${variant}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`;
};

export const eyebrow = (t) => `<p class="eyebrow">${t}</p>`;

export const tagline = () => `<p class="tagline">REST. REFRESH. REBUILD.</p>`;

export function pageHero({ eyebrow: eb, title, lede = '', actions = '' }) {
  return `<section class="page-hero topo-dark">
  <div class="wrap">
    ${eb ? eyebrow(eb) : ''}
    <h1>${title}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ''}
    ${actions ? `<div class="actions">${actions}</div>` : ''}
  </div>
</section>`;
}

export function section({ id = '', cls = '', eyebrow: eb = '', title = '', intro = '', body = '', narrow = false }) {
  return `<section class="section ${cls}"${id ? ` id="${id}"` : ''}>
  <div class="wrap${narrow ? ' narrow' : ''}">
    ${eb ? eyebrow(eb) : ''}
    ${title ? `<h2>${title}</h2>` : ''}
    ${intro ? `<div class="intro">${intro}</div>` : ''}
    ${body}
  </div>
</section>`;
}

export const prose = (html) => `<div class="prose">${html}</div>`;

export function ctaBand({ title, text = '', actions }) {
  return `<section class="cta-band topo-light">
  <div class="wrap">
    <h2>${title}</h2>
    ${text ? `<p>${text}</p>` : ''}
    <div class="actions">${actions}</div>
  </div>
</section>`;
}

export function cards(items, cls = '') {
  return `<div class="cards ${cls}">${items
    .map(
      (c) => `<article class="card">
      ${c.kicker ? `<p class="kicker">${c.kicker}</p>` : ''}
      <h3>${c.title}</h3>
      <p>${c.text}</p>
      ${c.link ? `<a class="more" href="${esc(c.link[1])}"${/^https?:/.test(c.link[1]) ? ' target="_blank" rel="noopener"' : ''}>${c.link[0]} <span aria-hidden="true">&rarr;</span></a>` : ''}
    </article>`
    )
    .join('')}</div>`;
}

export function faq(items) {
  return `<div class="faq">${items
    .map(([q, a]) => `<details><summary>${q}</summary><div class="answer"><p>${a}</p></div></details>`)
    .join('')}</div>`;
}

export function portrait(base, name, initials, cls = '') {
  const src = findImg(base);
  if (src) return `<img class="portrait ${cls}" src="${src}" alt="${esc(name)}" loading="lazy" width="640" height="800">`;
  return `<div class="portrait portrait-fallback ${cls}" role="img" aria-label="${esc(name)}">${compassSvg('pf-compass')}<span>${initials}</span></div>`;
}

export function videoCard(v) {
  let embed = '';
  const yt = v.url && v.url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  const vm = v.url && v.url.match(/vimeo\.com\/(\d+)/);
  if (yt) embed = `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`;
  if (vm) embed = `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
  const play = `<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>`;
  const inner = embed
    ? `<button class="video-thumb" type="button" data-embed="${esc(embed)}" aria-label="Play video: ${esc(v.title)}">${play}</button>`
    : `<div class="video-thumb is-soon" role="img" aria-label="${esc(v.title)} (video coming soon)">${play}<span class="soon">Video coming soon</span></div>`;
  return `<figure class="video">${inner}<figcaption><h3>${v.title}</h3><p>${v.desc}</p></figcaption></figure>`;
}

export function supporters({ homeOnly = false } = {}) {
  const list = partners.filter((p) => p.show && (!homeOnly || p.home));
  return `<ul class="supporters">${list
    .map((p) => {
      const logo = findImg(`partners/${slugify(p.name)}`);
      const inner = logo ? `<img src="${logo}" alt="${esc(p.name)}" loading="lazy">` : `<span class="chip">${esc(p.name)}</span>`;
      return `<li>${p.url ? `<a href="${esc(p.url)}" rel="noopener" target="_blank">${inner}</a>` : inner}</li>`;
    })
    .join('')}</ul>`;
}

/* ---------- forms ---------- */

export function field({ name, label, type = 'text', required = false, options = null, rows = 5, hint = '', autocomplete = '' }) {
  const id = `f-${name}`;
  const req = required ? ' required' : '';
  const ac = autocomplete ? ` autocomplete="${autocomplete}"` : '';
  let control;
  if (options) {
    control = `<select id="${id}" name="${name}"${req}><option value="">Select one</option>${options.map((o) => `<option>${esc(o)}</option>`).join('')}</select>`;
  } else if (type === 'textarea') {
    control = `<textarea id="${id}" name="${name}" rows="${rows}"${req}></textarea>`;
  } else {
    control = `<input id="${id}" name="${name}" type="${type}"${req}${ac}>`;
  }
  return `<div class="field"><label for="${id}">${label}${required ? '' : ' <span class="opt">(optional)</span>'}</label>${control}${hint ? `<p class="hint">${hint}</p>` : ''}</div>`;
}

export function form({ id, endpoint, subject, fields, submit, success }) {
  const nl = endpoint ? '' : ` name="${esc(id)}" method="POST" data-netlify="true" netlify-honeypot="company"`;
  return `<form class="form" id="${id}"${nl} data-endpoint="${esc(endpoint)}" data-mailto="${esc(site.email)}" data-subject="${esc(subject)}" novalidate>
  ${endpoint ? '' : `<input type="hidden" name="form-name" value="${esc(id)}"><input type="hidden" name="subject" value="${esc(subject)} (frvf.org)">`}
  ${fields}
  <div class="hp" aria-hidden="true"><label>Leave this empty<input name="company" tabindex="-1" autocomplete="off"></label></div>
  <p class="form-note">We use what you share only to follow up on your request.</p>
  <button class="btn btn-primary" type="submit">${submit}</button>
  <p class="form-status" role="status" aria-live="polite" data-success="${esc(success)}"></p>
</form>`;
}

/* ---------- layout ---------- */

function header() {
  const items = nav
    .map((n) => {
      if (!n.sub) return `<li><a href="${n.href}">${n.label}</a></li>`;
      return `<li class="has-sub"><a href="${n.href}">${n.label}</a><ul class="sub">${n.sub
        .map(([l, h]) => `<li><a href="${h}">${l}</a></li>`)
        .join('')}</ul></li>`;
    })
    .join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="/" aria-label="${esc(site.name)}, home">
      <img class="brand-logo" src="/img/logo-horizontal-color.png" width="600" height="150" alt="Freedom Ranch Veterans Foundation">
    </a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>
    <nav id="primary-nav" class="primary-nav" aria-label="Primary">
      <ul>${items}</ul>
      ${btn('Donate', site.donateUrl, 'brass')}
    </nav>
  </div>
</header>`;
}

function footer() {
  const a = site.address;
  const col = (t, links) => `<div><h3>${t}</h3><ul>${links.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>`;
  const about = nav[0].sub.slice(1).concat([]);
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="/" aria-label="${esc(site.name)}, home"><img class="brand-logo" src="/img/logo-white.png" width="300" height="175" alt="Freedom Ranch Veterans Foundation"></a>
        <p>Helping post-9/11 veterans and their families step away, find clarity, and build a purposeful next chapter.</p>
        <p class="small">Freedom Ranch Veterans Foundation is a registered 501(c)(3) nonprofit organization, EIN 39-4244309. Contributions are tax-deductible to the extent allowed by law.</p>
      </div>
      ${col('About', [['About Freedom Ranch', '/about'], ...about])}
      ${col('Programs', nav[1].sub)}
      ${col('Get Involved', [...nav[2].sub, ['Donate', site.donateUrl], ['Resources & Newsroom', '/resources']])}
      <div>
        <h3>Contact</h3>
        <ul>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="mailto:${site.email}">${site.email}</a></li>
          <li class="addr">${esc(a.street)}<br>${esc(a.city)}, ${a.region} ${a.zip}</li>
        </ul>
      </div>
    </div>
    <div class="crisis"><strong>${site.crisisLine}</strong> (or ${site.crisisText}). Free and confidential, 24/7.</div>
    <p class="legal">&copy; 2026 Freedom Ranch Veterans Foundation. All rights reserved.</p>
  </div>
</footer>`;
}

export function layout({ title, desc, path: p, body, noindex = false, jsonld = null }) {
  const full = p === '/' ? site.name : `${title} | ${site.name}`;
  const url = site.url + (p === '/' ? '' : p);
  const og = findImg('og') ? site.url + findImg('og') : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
${og ? `<meta property="og:image" content="${og}"><meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">'}
<meta name="theme-color" content="#1d3563">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Barlow:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
<script>document.documentElement.classList.add('js')</script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body>
${header()}
<main id="main">
${body}
</main>
${footer()}
<script src="/main.js" defer></script>
</body>
</html>`;
}
