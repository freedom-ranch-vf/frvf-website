// Central site config. Edit values here, then run: node build.mjs

import { readJson } from './content.mjs';

// Editable values live in content/settings.json and content/partners.json (editable in Pages CMS).
const cfg = readJson('settings.json');

export const site = {
  name: cfg.name,
  short: cfg.short,
  tagline: cfg.tagline,
  // Set SITE_URL at build time (netlify.toml) once the final domain is confirmed.
  url: (process.env.SITE_URL || 'https://frvf.org').replace(/\/$/, ''),
  email: cfg.email,
  address: cfg.address,
  // Every Donate and Support a Veteran button points here.
  donateUrl: cfg.donateUrl,
  shaveClubUrl: cfg.shaveClubUrl,
  crisisLine: cfg.crisisLine,
  crisisText: cfg.crisisText,
  // Forms use Netlify Forms by default. These optional env vars send them to a webhook instead.
  applyEndpoint: process.env.FRVF_APPLY_ENDPOINT || '',
  contactEndpoint: process.env.FRVF_CONTACT_ENDPOINT || '',
  applyEmbed: process.env.FRVF_APPLY_EMBED || '',
  eventsEmbed: process.env.FRVF_EVENTS_EMBED || '',
};

// Financial documents. Paste the public links in settings; blank entries render as "coming soon".
export const docs = { form990: cfg.form990 || '', spendingBreakdown: cfg.spendingBreakdown || '' };

// Featured videos. Add a YouTube or Vimeo URL to turn a card into a click-to-play embed.
export const videos = cfg.videos;

// Partners. Only show organizations with an established, approved relationship.
//   home: show on the homepage supporter strip. show: false hides the entry everywhere.
export const partners = readJson('partners.json').items;

export const nav = [
  {
    label: 'About', href: '/about',
    sub: [
      ['About Freedom Ranch', '/about'],
      ['Our Mission', '/about/our-mission'],
      ['Our Story', '/about/our-story'],
      ['Co-Founder', '/about/founder'],
      ['Leadership', '/about/leadership'],
      ['Board of Directors', '/about/board-of-directors'],
      ['Financial Transparency', '/about/financial-transparency'],
      ['Annual Reports', '/about/annual-reports'],
    ],
  },
  {
    label: 'Programs', href: '/programs',
    sub: [
      ['All Programs', '/programs'],
      ['How It Works', '/programs/how-it-works'],
      ['Veteran Retreats', '/programs/veteran-retreats'],
      ['Coaching', '/programs/coaching'],
      ['Community', '/programs/community'],
      ['Eligibility & FAQ', '/programs/eligibility-and-faq'],
    ],
  },
  {
    label: 'Get Involved', href: '/get-involved',
    sub: [
      ['For Veterans', '/veterans'],
      ['Apply for a Retreat', '/apply'],
      ['Volunteer & Sponsor', '/get-involved'],
      ['Corporate Partners', '/partners'],
      ['Events', '/events'],
      ['Veteran Stories', '/stories'],
      ['Freedom Shave Club', '/shave-club'],
    ],
  },
  { label: 'Resources & Newsroom', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];
