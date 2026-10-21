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

console.log(`Built ${pages.length} pages into dist/`);
