import { site, videos } from '../data/site.mjs';
import { articles, articleIntro, fmtDate } from '../data/articles.mjs';
import { btn, compassSvg, ctaBand, cards, section, eyebrow, portrait, videoCard, supporters, findImg, tagline } from '../lib.mjs';

const challenge = [
  ['Identity', 'Military service can become a major part of how you see yourself. Transition creates an opportunity to rediscover who you are and who you want to become next.'],
  ['Purpose', 'You spent years serving a mission bigger than yourself. Finding the next mission can take time.'],
  ['Connection', 'Leaving the military can also mean leaving behind the built in community, relationships, and sense of belonging that came with service.'],
  ['Direction', 'Career, family, location, lifestyle, and priorities can all be changing at once. It is not always obvious what comes next.'],
  ['Family', 'Transition affects spouses and families too. The next chapter often has to work for more than just the veteran.'],
];

const journey = [
  ['Military Service', 'You served with purpose, structure, and a mission.'],
  ['Transition', 'Life changes. The structure of military service may be gone, and your next direction may not immediately be clear.'],
  ['Freedom Ranch Retreat', 'Step away from everyday distractions. Reflect on where you have been, reconnect with what matters most, and begin defining what comes next.', true],
  ['Professional Coaching', 'Turn clarity into action through ongoing coaching, meaningful goals, accountability, and support.'],
  ['Community', 'Stay connected to veterans, families, coaches, mentors, and supporters who understand the journey.'],
  ['Your Next Mission', 'Move forward with greater clarity, connection, purpose, and a plan for what comes next.'],
];

export default [
  {
    path: '/',
    title: 'Home',
    desc: 'Freedom Ranch helps post-9/11 veterans and their families step away, find clarity, and build a purposeful next chapter through retreats and coaching.',
    render() {
      const heroPhoto = findImg('hero');
      return `
<section class="hero${heroPhoto ? ' has-photo' : ''}"${heroPhoto ? ` style="background-image:url('${heroPhoto}')"` : ''}>
  ${compassSvg('rose')}
  <div class="wrap">
    ${eyebrow('Rest. Refresh. Rebuild.')}
    <h1>No Veteran Should Have to Navigate the Next Chapter Alone.</h1>
    <p class="lede">Freedom Ranch Veterans Foundation helps veterans step away from the noise, reconnect with purpose, and build what comes next through immersive retreats, professional coaching, and a lasting community of support.</p>
    <div class="actions">${btn('Get Support', '/veterans')}${btn('Support a Veteran', site.donateUrl, 'ghost')}</div>
  </div>
</section>

${section({
  eyebrow: 'The Challenge',
  title: 'Leaving the Military Changes More Than Your Career.',
  intro: `<p>Military service can provide identity, purpose, structure, community, and a clear mission.</p><p>When that chapter ends, veterans can find themselves asking bigger questions about who they are, what matters most, and what comes next.</p>`,
  body: `<div class="cards c5">${challenge
    .map(([t, d], i) => `<article class="card bearing"><span class="bearing-no">BEARING 0${i + 1}</span><h3>${t}</h3><p>${d}</p></article>`)
    .join('')}</div>`,
})}

${section({
  cls: 'sand',
  eyebrow: 'The Freedom Ranch Difference',
  title: 'From Service to What’s Next.',
  intro: `<p>Freedom Ranch is designed to help veterans move from transition to clarity, action, and continued connection.</p>`,
  body: `<ol class="journey">${journey
    .map(([t, d, ranch]) => `<li${ranch ? ' class="is-ranch"' : ''}><h3>${t}</h3><p>${d}</p>${ranch ? tagline() : ''}</li>`)
    .join('')}</ol><div class="actions">${btn('See How It Works', '/programs/how-it-works', 'ink')}</div>`,
})}

${section({
  id: 'stories',
  cls: 'ink',
  eyebrow: 'Stories',
  title: 'Every Veteran Has a Story. The Next Chapter Is Still Being Written.',
  intro: `<p>Every veteran arrives at Freedom Ranch with different experiences, different goals, and a different vision for what comes next.</p><p>As our veterans complete Freedom Ranch retreats and continue through professional coaching, we will share their experiences and stories here in their own words.</p>`,
  body: `<div class="videos">${videos.map(videoCard).join('')}</div><div class="actions">${btn('Watch Our Story', '/stories', 'primary')}</div>`,
})}

${section({
  eyebrow: 'We Serve More Than Veterans',
  title: 'Transition Is a Family Event.',
  body: cards(
    [
      { title: 'Veterans', text: 'Your service may be ending. Your purpose isn’t.', link: ['Get Support', '/veterans'] },
      { title: 'Spouses', text: 'Military transition changes the life you’ve built together.', link: ['Learn More', '/programs/eligibility-and-faq'] },
      { title: 'Families', text: 'The next chapter has to work for the whole family.', link: ['Learn More', '/programs/eligibility-and-faq'] },
    ],
    'c3'
  ),
})}

<section class="section sand">
  <div class="wrap split">
    <div>${portrait('sandy', 'Sandy Lehmkuhler, Co-Founder', 'SL')}</div>
    <div>
      ${eyebrow('Meet Our Founder')}
      <h2>A Personal Story. A Bigger Mission.</h2>
      <p><strong>Sandy Lehmkuhler</strong>, Co-Founder</p>
      <p>For more than two decades, Sandy Lehmkuhler has dedicated herself to serving veterans and military families. As the spouse of a veteran, the mother of a veteran, and the mother-in-law of two veterans, the military community is deeply woven into her family.</p>
      <p>After building a foundation that supported those combat-wounded veterans after 9/11, Sandy saw a broader challenge emerging: transition affects all servicemembers, whether injured in war or simply navigating the profound change that comes with leaving military life.</p>
      <p>She co-founded Freedom Ranch Veterans Foundation with two veterans to help meet that challenge and create a place where veterans can reconnect with purpose, community, and a clear vision for what comes next.</p>
      <p>Freedom Ranch is the next chapter in Sandy’s lifelong commitment to veterans and their families.</p>
      <div class="actions">${btn('Read Sandy’s Story', '/about/team#sandy', 'ink')}</div>
    </div>
  </div>
</section>

${section({
  cls: 'ink',
  eyebrow: 'Our Impact',
  title: 'Building Impact That Lasts Beyond the Retreat',
  intro: `<p>Freedom Ranch is designed to create more than a great weekend. Our goal is to give veterans the space, coaching, community, and accountability to build meaningful change that continues long after they leave the ranch.</p>`,
  body: `<div class="stats">
    <div class="stat"><span class="n">3 Days</span><span class="t">Immersive Retreat Experience</span></div>
    <div class="stat"><span class="n">12</span><span class="t">Veterans</span><span class="d">Small Cohort Designed for Connection</span></div>
    <div class="stat"><span class="n">6 Months</span><span class="t">Professional Coaching and Accountability</span></div>
    <div class="stat"><span class="n">1</span><span class="t">Community</span><span class="d">Continued Connection Beyond the Retreat</span></div>
  </div>
  ${tagline()}
  <p style="max-width:46rem;margin-top:1.2rem;opacity:.85">As Freedom Ranch grows, we will measure and share the real impact of our programs, including veterans served, coaching outcomes, participant progress, family impact, and alumni engagement.</p>`,
})}

${section({
  eyebrow: 'How You Can Help',
  title: 'Be Part of the Mission.',
  intro: `<p>There are many ways to become part of the Freedom Ranch community.</p>`,
  body: cards(
    [
      { title: 'I’m a Veteran', text: 'Ready to think intentionally about what comes next? Learn more about the Freedom Ranch experience and upcoming opportunities to participate.', link: ['Get Support', '/veterans'] },
      { title: 'Support a Veteran', text: 'Your contribution helps provide retreats, professional coaching, and continued support for veterans.', link: ['Donate', site.donateUrl] },
      { title: 'Become a Partner', text: 'Join Freedom Ranch as a corporate, foundation, or community mission partner.', link: ['Partner With Us', '/partners'] },
      { title: 'Get Involved', text: 'Volunteer your time, professional expertise, resources, or network to help grow the Freedom Ranch mission.', link: ['Get Involved', '/get-involved'] },
    ],
    'c4'
  ),
})}

${section({
  cls: 'sand',
  eyebrow: 'Our Supporters',
  title: 'Proudly Supported By',
  intro: `<p>Freedom Ranch Veterans Foundation is grateful for the organizations and individuals helping make our mission possible.</p>`,
  body: `${supporters({ homeOnly: true })}<div class="actions" style="margin-top:0">${btn('Our Partners', '/partners', 'ink')}</div>`,
})}

${section({
  eyebrow: 'Latest',
  title: 'From Freedom Ranch',
  intro: `<p>${articleIntro}</p>`,
  body: `<div class="articles">${articles
    .map(
      (a) => `<article class="article-card"><p class="meta">${a.label} &middot; ${fmtDate(a.date)}</p><h3><a href="/resources/${a.slug}">${a.title}</a></h3><p>${a.excerpt}</p><a class="more" href="/resources/${a.slug}">Read more <span aria-hidden="true">&rarr;</span></a></article>`
    )
    .join('')}</div><div class="actions">${btn('Resources & News', '/resources', 'ink')}</div>`,
})}

${ctaBand({
  title: 'Help a Veteran Build What’s Next.',
  text: `<strong>Military service may end. Purpose does not.</strong><br><br>Your support helps Freedom Ranch provide immersive retreat experiences, professional coaching, and a lasting community designed to help veterans move forward with clarity and purpose.<br><br>Every contribution helps create opportunities for veterans to step away from the noise, reconnect with what matters most, and intentionally build their next chapter.<br><br><span class="tagline" style="margin:0">REST. REFRESH. REBUILD.</span>`,
  actions: btn('Support a Veteran', site.donateUrl),
})}`;
    },
  },
];
