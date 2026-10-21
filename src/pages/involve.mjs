import { site, videos, partners } from '../data/site.mjs';
import { readCollection } from '../data/content.mjs';
import { btn, ctaBand, cards, section, pageHero, prose, tagline, videoCard, supporters, field, form, esc } from '../lib.mjs';

const branches = ['Army', 'Marine Corps', 'Navy', 'Air Force', 'Space Force', 'Coast Guard', 'Army National Guard', 'Air National Guard', 'Reserve component', 'Other'];

const applyFields = [
  field({ name: 'full_name', label: 'Full name', required: true, autocomplete: 'name' }),
  field({ name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' }),
  field({ name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel' }),
  field({ name: 'branch', label: 'Branch of service', required: true, options: branches }),
  field({
    name: 'status', label: 'Where are you in your transition?', required: true,
    options: ['Active duty, within 18 months of separation', 'Separated within the last 18 months', 'Something else (tell us below)'],
  }),
  field({ name: 'separation_date', label: 'Separation date (or expected separation date)', type: 'date', required: true }),
  field({
    name: 'retreat_format', label: 'Retreat format', required: true,
    options: ['Single-veteran retreat', 'Family retreat (spouse and children)', 'Not sure yet'],
    hint: 'We will confirm the right fit with you when we follow up.',
  }),
  field({ name: 'hoping_for', label: 'What are you hoping to get out of Freedom Ranch?', type: 'textarea', required: true, rows: 6, hint: 'A few sentences is plenty.' }),
].join('');

const contactTopics = ['General question', 'Volunteering', 'Mentoring', 'Hosting a retreat', 'Partnership', 'Sharing my story', 'Vehicle donation', 'Donating by check'];
export const contactFields = [
  field({ name: 'name', label: 'Name', required: true, autocomplete: 'name' }),
  field({ name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' }),
  field({ name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel' }),
  field({ name: 'topic', label: 'Topic', required: true, options: contactTopics }),
  field({ name: 'message', label: 'Message', type: 'textarea', required: true, rows: 6 }),
].join('');

export default [
  {
    path: '/apply',
    title: 'Apply for a Retreat',
    desc: 'Apply to a Freedom Ranch retreat. It takes about five to ten minutes, and our team personally reviews every application.',
    render() {
      const formHtml = site.applyEmbed
        ? `<iframe class="embed-frame" src="${site.applyEmbed}" title="Veteran application form" loading="lazy"></iframe>`
        : form({
            id: 'apply-form',
            endpoint: site.applyEndpoint,
            subject: 'Freedom Ranch retreat application',
            fields: applyFields,
            submit: 'Start Your Application',
            success: 'Thank you. Your application is in. Our team will follow up with next steps.',
          });
      return `${pageHero({
        eyebrow: 'Veteran Application',
        title: 'Ready to take the first step toward your next mission?',
        lede: 'Applying to Freedom Ranch takes about five to ten minutes. Tell us about your service, your transition, and what you’re hoping to gain, and our team will personally review your application.',
      })}
<section class="section">
  <div class="wrap split flip" style="align-items:start">
    <div>
      ${formHtml}
    </div>
    <aside>
      <div class="card" style="margin-bottom:1.2rem">
        <h3>What to have ready</h3>
        <ul class="checklist" style="margin:0">
          <li>Branch of service and separation date (or expected separation date)</li>
          <li>A few sentences on what you’re hoping to get out of Freedom Ranch</li>
        </ul>
      </div>
      <div class="card">
        <h3>What happens next</h3>
        <p style="margin:0">Our team reviews every application individually and will follow up to talk through cohort placement, whether a family retreat or a single-veteran retreat is the right fit, and next steps, including verification of service and the refundable commitment fee.</p>
      </div>
      <p class="hint" style="margin-top:1.2rem">Questions first? Read the <a href="/programs/eligibility-and-faq">Eligibility &amp; FAQ</a> or <a href="/contact">contact us</a>.</p>
    </aside>
  </div>
</section>`;
    },
  },

  {
    path: '/veterans',
    title: 'For Veterans',
    desc: 'Your service may be ending. Your purpose isn’t. See what Freedom Ranch offers post-9/11 veterans and how to apply.',
    render() {
      return `${pageHero({
        eyebrow: 'I’m a Veteran',
        title: 'Your service may be ending. Your purpose isn’t.',
        lede: 'Freedom Ranch is a donor-funded three-day retreat, six months of one-on-one coaching, and a community that stays with you, built for post-9/11 veterans within 18 months of transition.',
        actions: `${btn('Apply for a Retreat', '/apply')}${btn('Read the FAQ', '/programs/eligibility-and-faq', 'ink')}`,
      })}
${section({
  narrow: true,
  eyebrow: 'Is This for Me?',
  title: 'You do not have to explain yourself here.',
  body: prose(`<p>If you are running the math on whether your situation is “bad enough” to deserve a seat, that math is the reason we exist.</p>
<p>Many of the veterans who come to Freedom Ranch are not in crisis. They are functioning. They go to work, they show up for their families, and something still feels unsettled that they cannot quite name. You do not need a story big enough to justify the trip. You need a few days with people who already understand what you would have to explain to anyone else.</p>
<p>And if you are in crisis, please call 988 and press 1 first. Then reach out to us.</p>`),
})}
${section({
  eyebrow: 'What You Get',
  title: 'The whole path, not just a weekend.',
  body: cards(
    [
      { title: 'A three-day retreat', text: 'A small cohort of 12 veterans on a private ranch estate, away from the noise.', link: ['Retreat details', '/programs/veteran-retreats'] },
      { title: 'Six months of coaching', text: 'One-on-one Thrive in Transition™ coaching that turns clarity into a real plan.', link: ['About the coaching', '/programs/coaching'] },
      { title: 'A family track', text: 'Family retreats welcome spouses and children, and single-veteran retreats are offered separately.', link: ['Eligibility & FAQ', '/programs/eligibility-and-faq'] },
      { title: 'An alumni community', text: 'Stay connected to your cohort, your coach, and veterans further down the same road.', link: ['About the community', '/programs/community'] },
    ],
    'c4'
  ),
})}
${section({
  cls: 'sand',
  narrow: true,
  eyebrow: 'How to Apply',
  title: 'Three simple steps.',
  body: `<ol class="steps">
    <li><h3>Fill out the short application</h3><p>It takes about five to ten minutes.</p></li>
    <li><h3>Our team follows up</h3><p>Every application is reviewed personally, including cohort placement and retreat format.</p></li>
    <li><h3>Confirm and show up</h3><p>Service is verified and the small, fully refundable commitment fee is arranged. Then we get you to the ranch.</p></li>
  </ol><div class="actions">${btn('Start Your Application', '/apply')}</div>`,
})}
${section({
  narrow: true,
  eyebrow: 'If You Need More Than We Offer',
  title: 'Help that is available right now.',
  body: `${prose(`<p>Freedom Ranch is not a clinical or crisis program. If you need that kind of help, please reach out right away.</p>
<ul>
<li><strong>Veterans Crisis Line:</strong> dial 988, then press 1, or ${site.crisisText}. Free, confidential, 24/7.</li>
<li><strong>National Call Center for Homeless Veterans:</strong> 877-424-3838.</li>
</ul>
<p>For clinical care or help with benefits claims, a VA provider or an accredited veterans service officer can point you in the right direction.</p>`)}`,
})}`;
    },
  },

  {
    path: '/stories',
    title: 'Veteran Stories',
    desc: 'Watch the Freedom Ranch story, and as alumni move through the retreat and coaching, hear from veterans in their own words.',
    render() {
      return `${pageHero({
        eyebrow: 'Testimonials and Videos',
        title: 'Every veteran arrives with a different story.',
        lede: 'As our alumni move through the retreat and coaching, we’ll share their experiences here, in their own words.',
      })}
${section({
  eyebrow: 'Featured Videos',
  title: 'Watch our story',
  body: `<div class="videos">${videos.map(videoCard).join('')}</div>`,
})}
${ctaBand({ title: 'Help write the next story.', actions: btn('Support a Veteran’s Story', site.donateUrl) })}`;
    },
  },

  {
    path: '/events',
    title: 'Events',
    desc: 'Fundraisers and community gatherings that bring veterans, supporters, and partners together for Freedom Ranch.',
    render() {
      const today = new Date().toISOString().slice(0, 10);
      const all = readCollection('events');
      const end = (e) => e.endDate || e.date;
      const upcoming = all.filter((e) => end(e) >= today).sort((a, b) => (a.date > b.date ? 1 : -1));
      const past = all.filter((e) => end(e) < today).sort((a, b) => (a.date < b.date ? 1 : -1));
      const fmt = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const when = (e) => (e.endDate && e.endDate !== e.date ? `${fmt(e.date)} to ${fmt(e.endDate)}` : fmt(e.date));
      const card = (e) => `<article class="article-card"><p class="meta">${esc(e.category || 'Event')} &middot; ${when(e)}</p><h3>${esc(e.title)}</h3>${e.location ? `<p><strong>${esc(e.location)}</strong></p>` : ''}${e.html}${e.link ? `<a class="more" href="${esc(e.link)}" rel="noopener">More details <span aria-hidden="true">&rarr;</span></a>` : ''}</article>`;
      const cal = site.eventsEmbed
        ? `<iframe class="embed-frame" src="${site.eventsEmbed}" title="Upcoming events calendar" loading="lazy"></iframe>`
        : upcoming.length
          ? `<div class="articles">${upcoming.map(card).join('')}</div>`
          : `<div class="placeholder-box"><p>No events are posted right now. Check back soon, or reach out if you’d like to host one.</p></div>`;
      const pastHtml = past.length ? section({ cls: 'sand', eyebrow: 'Past Events', title: 'Recaps', body: `<div class="articles">${past.map(card).join('')}</div>` }) : '';
      return `${pageHero({
        eyebrow: 'Upcoming and Past Events',
        title: 'Events',
        lede: 'From fundraisers to community gatherings, our events bring together veterans, supporters, and partners in service of the same mission: helping veterans move forward with clarity and purpose.',
      })}
${section({ eyebrow: 'Upcoming Events', title: 'On the calendar', body: cal })}
${pastHtml}
${ctaBand({
  title: 'Want to host or support an event for Freedom Ranch?',
  text: 'Reach out and let’s talk.',
  actions: btn('Get Involved', '/get-involved'),
})}`;
    },
  },

  {
    path: '/partners',
    title: 'Corporate & Community Partners',
    desc: 'Freedom Ranch’s mission is made possible by organizations and individuals who share our commitment to veterans.',
    render() {
      return `${pageHero({
        eyebrow: 'Partners',
        title: 'Corporate & Community Partners',
        lede: 'Freedom Ranch’s mission is made possible by organizations and individuals who share our commitment to veterans.',
      })}
${section({ eyebrow: 'Our Partners', title: 'Thank you.', body: supporters() })}
${section({
  cls: 'sand',
  eyebrow: 'Ways to Partner',
  title: 'Find the right fit.',
  body: cards(
    [
      { title: 'Corporate & Foundation Giving', text: 'Join Freedom Ranch as a mission partner through financial sponsorship of retreats, coaching, or program growth.' },
      // Receipt language for in-kind facility use is held back until FRVF's accountant or counsel confirms it.
      { title: 'Ranch Partners: Host a Retreat', text: 'Own an estate, lodge, or retreat property? Through our Ranch Partners program, property owners can donate the use of their facility for a Freedom Ranch retreat in kind, directly reducing our venue costs so more resources go toward coaching and veteran support. In return, Ranch Partners receive public recognition and the opportunity to see their space become part of a veteran’s next chapter.', link: ['Inquire about hosting', '/contact?topic=hosting'] },
      { title: 'In-Kind & Professional Services', text: 'Businesses can also contribute goods, services, or professional expertise in support of our programs.' },
    ],
    'c3'
  ),
})}
${ctaBand({ title: 'Let’s build this together.', actions: btn('Become a Partner', '/contact?topic=partnership') })}`;
    },
  },

  {
    path: '/get-involved',
    title: 'Volunteer & Sponsorship',
    desc: 'Volunteer, mentor, sponsor a retreat, host a retreat on your property, or give your professional expertise to Freedom Ranch.',
    render() {
      return `${pageHero({
        eyebrow: 'Volunteer & Sponsorship',
        title: 'Get involved',
        lede: 'There are many ways to become part of the Freedom Ranch community, beyond financial giving.',
      })}
${section({
  body: cards(
    [
      { title: 'Volunteer', text: 'Contribute your time to support retreats, events, and day-to-day operations.', link: ['Volunteer with us', '/contact?topic=volunteering'] },
      { title: 'Mentor', text: 'Share your experience and expertise with veterans in our coaching and alumni community.', link: ['Become a mentor', '/contact?topic=mentoring'] },
      { title: 'Sponsor a Retreat or Cohort', text: 'Fund the full cost of a retreat or coaching cohort for a group of veterans.', link: ['Talk to us about sponsoring', '/contact?topic=partnership'] },
    ],
    'c3'
  ),
})}
<section class="section sand" id="host">
  <div class="wrap split flip" style="align-items:start">
    <div>
      ${'<p class="eyebrow">Ranch Partners Program</p>'}
      <h2>Host a Retreat</h2>
      <p>Do you own or manage a large estate, lodge, or retreat property? Rather than renting a venue for each retreat at significant cost, Freedom Ranch is building a network of Ranch Partners, property owners who donate the use of their facility for a retreat in kind.</p>
      <p><strong>Hosting a retreat means:</strong></p>
      <ul class="checklist">
        <li>Opening your property for a three-day cohort of 12 veterans</li>
        <li>Public recognition as a Freedom Ranch Ranch Partner</li>
        <li>Directly reducing the cost of delivering the program, so more of every dollar raised goes to coaching and veteran support</li>
      </ul>
      <div class="actions">${btn('Inquire About Hosting', '/contact?topic=hosting')}</div>
    </div>
    <div class="card">
      <h3>Professional Services &amp; In-Kind Giving</h3>
      <p>Offer your business’s products, services, or expertise to support Freedom Ranch programs.</p>
      <a class="more" href="/contact">Get Involved <span aria-hidden="true">&rarr;</span></a>
    </div>
  </div>
</section>`;
    },
  },

  {
    path: '/shave-club',
    title: 'Freedom Shave Club',
    desc: 'Join the Freedom Shave Club for $10 a month and become part of the steady, reliable support that keeps Freedom Ranch running.',
    render() {
      return `${pageHero({
        eyebrow: 'Recurring Donor Program',
        title: 'Every mission has to start somewhere. Freedom Ranch’s started with a razor.',
      })}
${section({
  narrow: true,
  body: `${prose(`
<p>Long before Freedom Ranch existed, Sandy Lehmkuhler got on the radio with one simple ask: help her get razors into the hands of veterans. It was a small thing, a shave, a moment of dignity, but it was also the seed of everything that came after. Sandy learned early that you don’t need a grand gesture to change a veteran’s day. You need people willing to show up, again and again, in small and consistent ways.</p>
<p><strong>The Freedom Shave Club carries that same idea forward.</strong></p>
<p>For just $10 a month, you join a community of recurring donors whose steady, reliable support keeps Freedom Ranch running, funding retreats, coaching, and the everyday tools veterans need as they rebuild their lives. Ten dollars won’t feel like much to give. But multiplied across hundreds of members, month after month, it becomes something Freedom Ranch can count on: consistent, dependable funding that lets us plan ahead instead of scrambling one gift at a time.</p>
<p class="pull">It’s a small commitment. But so was a radio call asking for razors, and look what that became.</p>`)}
  <div class="actions">${btn('Join the Club', site.shaveClubUrl)}</div>`,
})}`;
    },
  },

  {
    path: '/donate',
    title: 'Donate',
    desc: 'Give a one-time or monthly gift to help a veteran build what’s next through Freedom Ranch retreats, coaching, and community.',
    render() {
      return `${pageHero({
        eyebrow: 'One-Time & Monthly Giving',
        title: 'Help a veteran build what’s next.',
        lede: 'Military service may end. Purpose does not.',
        actions: btn('Donate Now', site.donateUrl),
      })}
${section({
  narrow: true,
  body: prose(`<p>Your support helps Freedom Ranch provide immersive retreat experiences, professional coaching, and a lasting community designed to help veterans move forward with clarity and purpose. Every gift, whether it’s a one-time contribution or a recurring monthly gift, moves that mission forward.</p>`),
})}
${section({
  cls: 'sand',
  eyebrow: 'Ways to Give',
  title: 'Choose what fits.',
  body: cards(
    [
      { title: 'Monthly Giving: Freedom Shave Club', text: 'Join our recurring donor community for just $10 a month, providing steady, dependable funding Freedom Ranch can count on.', link: ['Join the club', '/shave-club'] },
      { title: 'One-Time Gift', text: 'Make a single contribution in any amount to support retreats, coaching, and veteran services.', link: ['Give now', site.donateUrl] },
      { title: 'Ranch Partners: Donate a Facility', text: 'Own an estate or retreat property? Donate the use of your facility in kind and help us direct more resources to coaching and veterans.', link: ['Learn about hosting', '/get-involved#host'] },
      { title: 'Corporate & Foundation Partnership', text: 'Partner with Freedom Ranch to sponsor retreats, coaching cohorts, or long-term program growth.', link: ['Become a partner', '/partners'] },
      { title: 'Vehicle Donation', text: 'That car, truck, motorcycle, boat, or RV sitting unused can help send a veteran to a Freedom Ranch retreat. We handle free pickup and paperwork, and provide a tax-deductible receipt.', link: ['Ask about donating a vehicle', '/contact?topic=vehicle'] },
      { title: 'Donating by Check', text: 'Prefer to mail a gift? Get in touch and we will share the details.', link: ['Contact us', '/contact?topic=check'] },
    ],
    'c3'
  ) + `<div style="margin-top:2.2rem">${tagline()}</div>`,
})}
${ctaBand({ title: 'Every gift moves the mission forward.', actions: btn('Donate Now', site.donateUrl) })}`;
    },
  },
];
