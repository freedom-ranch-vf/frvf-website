# Freedom Ranch Veterans Foundation website

A zero-dependency static site. Node 18+ is the only requirement. No npm install.

## Build and preview

    node build.mjs          # writes the finished site to dist/
    cd dist && python3 -m http.server 8000

Deploy the `dist/` folder as-is to Cloudflare Pages or Vercel (build command: `node build.mjs`, output directory: `dist`). It also works on any static host.

## Where things live

- `src/data/site.mjs`: domain, email, address, Givebutter link, nav, partners, videos, Form 990 links, form endpoints
- `src/data/articles.mjs`: Resources & Newsroom articles (add one, rebuild, done)
- `src/pages/*.mjs`: page copy, one file per area (home, about, programs, involve, misc)
- `src/styles.css`: design system (ink, sand, burnt clay, brass; Fraunces, Public Sans, IBM Plex Mono)
- `src/assets/img/`: drop photos here (see below)

## Images

Drop files into `src/assets/img/` and rebuild. The site picks them up by name and falls back to a clean monogram until they exist.

- `hero.jpg` homepage hero photo
- `sandy.jpg`, `matt.jpg`, `povas.jpg` founder portraits (4:5 portrait crop works best)
- `og.jpg` social share image, 1200x630
- `partners/<partner-name>.png` partner logos, for example `partners/semper-solaris.png`

## Settings you set at build time (environment variables)

- `SITE_URL` final domain, for canonical links and the sitemap (default https://frvf.org)
- `FRVF_APPLY_ENDPOINT` Go High Level inbound webhook URL for the application form
- `FRVF_CONTACT_ENDPOINT` webhook URL for the contact and subscribe forms
- `FRVF_APPLY_EMBED` a Go High Level form embed URL (replaces the native application form with an iframe)
- `FRVF_EVENTS_EMBED` calendar embed URL (Go High Level or Luma) for the Events page

With no endpoint set, forms fall back to a pre-filled email to info@frvf.org, so nothing is ever lost. Have the developer test the webhook from the live domain before launch.

## Before launch checklist

- Add the three video URLs in `site.mjs` (YouTube or Vimeo)
- Add real photos and confirm which portrait belongs to which founder
- Paste the Form 990 and spending breakdown links in `docs` in `site.mjs`
- Confirm Doyle Foundation status, then flip `show` to true in `site.mjs`
- Confirm with the accountant or counsel before adding any fair market value receipt language for in-kind facility use
- Add a privacy policy page and an EIN line if desired

## Deploy on Netlify (recommended)

1. Push this folder to a new GitHub repo (`dist/` is git-ignored).
2. In Netlify: Add new site, Import from Git, pick the repo. `netlify.toml` sets the build (`node build.mjs`) and publish folder (`dist`). No other settings needed.
3. Forms: Apply, Contact and Subscribe use Netlify Forms automatically (no setup in code). After the first deploy go to Site configuration, Forms, Form notifications, and add an email notification for each form (send to an address that reliably receives mail). Spam filtering is on by default, plus a honeypot field.
4. Domain: add `frvf.org` and `freedomranchveterans.org` in Domain management. Keep the registrar at GoDaddy and point DNS at Netlify only when ready to launch.
5. Optional: set `FRVF_APPLY_ENDPOINT` / `FRVF_CONTACT_ENDPOINT` to send forms to Go High Level instead of Netlify.


## Editing the site without code (Pages CMS)

All text that changes over time lives in `content/`: events, articles, partners, videos, donate links, address, and the Form 990 link.
Pages CMS (free, https://pagescms.org) gives the team a simple web editor for those files.

1. Sign in at pagescms.org with GitHub and open this repository.
2. Pick Events, Articles and news, Partners, or Site settings in the sidebar, edit, and click Save.
3. Each save is a commit to GitHub, and Netlify rebuilds and publishes the site in about a minute.

The editor setup is in `.pages.yml`. Page layouts and wording on the main pages (home, programs, about) are still in `src/pages/`.
Past and upcoming events sort by date at build time. To keep them fresh without a manual save, add a Netlify build hook and call it daily from a free scheduler.
