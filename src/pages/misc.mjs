import { site } from '../data/site.mjs';
import { articles, categories, fmtDate } from '../data/articles.mjs';
import { btn, ctaBand, section, pageHero, prose, tagline, field, form, esc } from '../lib.mjs';
import { contactFields } from './involve.mjs';

const articleCard = (a) => `<article class="article-card" data-article="${esc(a.category)}">
  <p class="meta">${a.category} &middot; ${fmtDate(a.date)}</p>
  <h3><a href="/resources/${a.slug}">${a.title}</a></h3>
  <p>${a.excerpt}</p>
  <a class="more" href="/resources/${a.slug}">Read more <span aria-hidden="true">&rarr;</span></a>
</article>`;

const articlePages = articles.map((a) => ({
  path: `/resources/${a.slug}`,
  title: a.title,
  desc: (a.excerpt || '').slice(0, 155).replace(/\s+\S*$/, '') + '...',
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    datePublished: a.date,
    publisher: { '@type': 'Organization', name: site.name },
  },
  render() {
    const others = articles.filter((x) => x.slug !== a.slug);
    return `${pageHero({ eyebrow: `${a.category} &middot; ${fmtDate(a.date)}`, title: a.title })}
${section({
  narrow: true,
  body: `${prose(a.html)}${tagline()}
  <div class="actions">${btn('Apply for a Retreat', '/apply')}${btn('Support a Veteran', site.donateUrl, 'ink')}</div>`,
})}
${others.length ? section({
  cls: 'sand',
  eyebrow: 'Keep Reading',
  title: 'More from Freedom Ranch',
  body: `<div class="articles">${others.map(articleCard).join('')}</div>`,
}) : ''}`;
  },
}));

const cats = categories.filter((c) => articles.some((a) => a.category === c));

export default [
  {
    path: '/resources',
    title: 'Resources & Newsroom',
    desc: 'Stories, resources, and updates focused on veteran transition, purpose, family, leadership, career, wellness, and community.',
    render() {
      return `${pageHero({
        eyebrow: 'Articles, News, Media',
        title: 'Resources & Newsroom',
        lede: 'Stories, resources, and updates focused on veteran transition, purpose, family, leadership, career, wellness, and community.',
      })}
${section({
  eyebrow: 'From Freedom Ranch',
  title: 'Latest articles',
  body: `<div class="filters" role="group" aria-label="Filter articles by category">
    <button type="button" data-cat="all" aria-pressed="true">All</button>
    ${cats.map((c) => `<button type="button" data-cat="${esc(c)}" aria-pressed="false">${c}</button>`).join('')}
  </div>
  <div class="articles">${articles.map(articleCard).join('')}</div>`,
})}
${section({
  cls: 'sand',
  narrow: true,
  eyebrow: 'Stay in the Loop',
  title: 'Subscribe for updates',
  intro: '<p>New articles, stories, and event announcements, straight to your inbox.</p>',
  body: form({
    id: 'subscribe-form',
    endpoint: site.contactEndpoint,
    zoho: { ...site.zoho, kind: 'subscribe' },
    subject: 'Subscribe me to Freedom Ranch updates',
    fields: field({ name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' }),
    submit: 'Subscribe for Updates',
    success: 'Thank you. You are on the list.',
  }),
})}`;
    },
  },
  ...articlePages,

  {
    path: '/contact',
    title: 'Contact',
    desc: 'Reach out to Freedom Ranch about a retreat, a partnership, or a story you want to share.',
    render() {
      const a = site.address;
      return `${pageHero({
        eyebrow: 'Contact',
        title: 'Let’s talk.',
        lede: 'Reach out about a retreat, a partnership, or a story you want to share.',
      })}
<section class="section">
  <div class="wrap split flip" style="align-items:start">
    <div>${form({
      id: 'contact-form',
      endpoint: site.contactEndpoint,
      zoho: { ...site.zoho, kind: 'contact' },
      subject: 'Message from the Freedom Ranch website',
      fields: contactFields,
      submit: 'Send Message',
      success: 'Thank you. We got your message and will be in touch.',
    })}</div>
    <aside>
      <div class="card" style="margin-bottom:1.2rem">
        <h3>Get in touch</h3>
        <p style="margin:0"><a href="mailto:${site.email}">${site.email}</a><br>${esc(a.street)}<br>${esc(a.city)}, ${a.region} ${a.zip}</p>
      </div>
      <div class="callout">
        <h3>In crisis?</h3>
        <p><strong>${site.crisisLine}</strong>, or ${site.crisisText}. Free, confidential, 24/7. Freedom Ranch is not a crisis service.</p>
      </div>
      <p class="hint">Looking for something specific? <a href="/apply">Apply for a retreat</a>, <a href="/get-involved">get involved</a>, or see our <a href="/partners">partners</a>.</p>
    </aside>
  </div>
</section>`;
    },
  },

  {
    path: '/404',
    file: '404.html',
    title: 'Page not found',
    desc: 'This page could not be found.',
    noindex: true,
    render() {
      return `${pageHero({
        eyebrow: 'Off the trail',
        title: 'We couldn’t find that page.',
        lede: 'It may have moved. Here are a few good places to pick the trail back up.',
        actions: `${btn('Back to Home', '/')}${btn('Programs', '/programs', 'ink')}${btn('Contact Us', '/contact', 'ink')}`,
      })}`;
    },
  },
];
