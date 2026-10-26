// Zero-dependency static site build. Usage: node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/data/site.mjs';
import { layout, topoSvg, compassSvg } from './src/lib.mjs';

import home from './src/pages/home.mjs';
import about from './src/pages/about.mjs';
import programs from './src/pages/programs.mjs';
import involve from './src/pages/involve.mjs';
import misc from './src/pages/misc.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const src = path.join(root, 'src');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'img'), { recursive: true });

const pages = [...home, ...about, ...programs, ...involve, ...misc];

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: site.name,
  url: site.url,
  email: site.email,
  slogan: site.tagline,
  description: 'Freedom Ranch helps post-9/11 veterans and their families step away, find clarity, and build a purposeful next chapter through retreats and coaching.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.zip,
    addressCountry: 'US',
  },
};

const urls = [];
for (const p of pages) {
  const html = layout({
    title: p.title,
    desc: p.desc,
    path: p.path,
    body: p.render(),
    noindex: !!p.noindex,
    jsonld: p.path === '/' ? orgJsonLd : p.jsonld || null,
  });
  const out = p.file ? path.join(dist, p.file) : p.path === '/' ? path.join(dist, 'index.html') : path.join(dist, p.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  if (!p.noindex) urls.push(p.path);
}

// static assets
fs.copyFileSync(path.join(src, 'styles.css'), path.join(dist, 'styles.css'));
fs.copyFileSync(path.join(src, 'main.js'), path.join(dist, 'main.js'));
fs.writeFileSync(path.join(dist, 'img', 'topo-dark.svg'), topoSvg("#1d3563", "0.07"));
fs.writeFileSync(path.join(dist, 'img', 'topo-light.svg'), topoSvg("#dcd8ca", "0.08"));
fs.writeFileSync(
  path.join(dist, 'favicon.svg'),
  compassSvg('').replace('<svg class=""', '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"').replace(/currentColor/g, '#fbbd5b').replace('var(--compass-hub, #1c2126)', '#3158a3')
);

const imgSrc = path.join(src, 'assets', 'img');
if (fs.existsSync(imgSrc)) fs.cpSync(imgSrc, path.join(dist, 'img'), { recursive: true });

const docsSrc = path.join(src, 'assets', 'docs');
if (fs.existsSync(docsSrc)) fs.cpSync(docsSrc, path.join(dist, 'docs'), { recursive: true });

// SEO + hosting files
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${site.url}${u === '/' ? '' : u}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
// Cloudflare Pages
fs.writeFileSync(
  path.join(dist, '_headers'),
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n/img/*\n  Cache-Control: public, max-age=604800\n/styles.css\n  Cache-Control: public, max-age=3600\n/main.js\n  Cache-Control: public, max-age=3600\n`
);
// Vercel
fs.writeFileSync(path.join(dist, 'vercel.json'), JSON.stringify({ cleanUrls: true, trailingSlash: false }, null, 2) + '\n');

// Redirects from netlify.toml become small static redirect pages (works on any host, including GitHub Pages).
const toml = fs.existsSync(path.join(root, 'netlify.toml')) ? fs.readFileSync(path.join(root, 'netlify.toml'), 'utf8') : '';
for (const m of toml.matchAll(/\[\[redirects\]\]\s*from = "([^"]+)"\s*to = "([^"]+)"/g)) {
  const [, from, to] = m;
  if (from.includes('*') || from.endsWith('.html')) continue;
  const out = path.join(dist, from, 'index.html');
  if (fs.existsSync(out)) continue;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting</title><meta name="robots" content="noindex"><link rel="canonical" href="${to}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><p>Redirecting to <a href="${to}">${to}</a>.</p><script>location.replace(${JSON.stringify(to)}+location.hash)</script></body></html>`);
}

// Optional BASE_PATH (for a project site such as https://org.github.io/repo/). Leave unset for a custom domain at the root.
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
if (base) {
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of walk(dist)) {
    if (!/\.(html|css|js|xml|txt)$/.test(f)) continue;
    let t = fs.readFileSync(f, 'utf8');
    t = t
      .replace(/(href|src|action|content)="\/(?!\/)/g, `$1="${base}/`)
      .replace(/url\((['"]?)\/(?!\/)/g, `url($1${base}/`)
      .replace(/location\.replace\("\//g, `location.replace("${base}/`);
    if (f.endsWith('sitemap.xml')) t = t.replace(/<loc>(https?:\/\/[^/<]+)/g, `<loc>$1${base}`);
    fs.writeFileSync(f, t);
  }
}

console.log(`Built ${pages.length} pages into dist/`);
