import { site, docs } from '../data/site.mjs';
import { btn, ctaBand, cards, section, pageHero, prose, portrait, tagline, eyebrow } from '../lib.mjs';

const values = [
  ['Transition is more than a checklist', 'A resume workshop and a final medical exam do not prepare someone to leave a military identity. We build a real process for the deeper work.'],
  ['Stress can be a catalyst', 'We help veterans turn the discomfort of transition into clarity, purpose, and forward motion.'],
  ['Distance creates clarity', 'Real reflection rarely happens amid daily noise, so our retreats take place away from the city.'],
  ['No veteran should walk it alone', 'Every veteran meets others on the same road, and coaches who stay with them for six months.'],
  ['Clarity needs action', 'Reflection is the beginning. Coaching turns insight into a plan, backed by accountability.'],
  ['Families transition too', 'The next chapter has to work for the whole household, not only the veteran.'],
];

const people = [
  {
    key: 'povas', initials: 'PM', name: 'Povas Miknaitis', role: 'Sgt., USMC (Ret.), President, Co-Founder',
    bio: 'Povas Miknaitis served as a Marine Corps Scout Sniper, deploying to Iraq in 2008 and Afghanistan in 2009, where he was seriously wounded by an IED in combat. A Purple Heart recipient, Povas spent the following months in recovery, then rebuilt his life step by step: finishing school, finding his footing in civilian work, and learning firsthand how little structured support exists for veterans navigating that road. As President and Co-Founder of Freedom Ranch, Povas brings that lived experience directly into how the organization serves veterans today, insisting that no one should have to rebuild alone.',
  },
  {
    key: 'matt', initials: 'MB', name: 'Matthew Beaghley', role: 'LCDR, USN (Ret.), Treasurer, Co-Founder',
    bio: 'Matthew Beaghley served 20 years in the Navy, first as an enlisted sailor and later as a commissioned officer, retiring as a Lieutenant Commander. A Naval Flight Officer and TOPGUN graduate, he flew the E-2C Hawkeye as a strike lead and mission commander. Later in his career, Matt managed the contract for the Navy’s Flag Officer transition program, where he saw firsthand that even senior military leaders, backed by top-tier coaching, struggled with the same unresolved questions of purpose and identity as junior sailors. That experience became the spark for Freedom Ranch. Today, Matt is a business consultant specializing in cybersecurity, governance, risk, and compliance, and OT/critical infrastructure protection. As Treasurer and Co-Founder, he oversees the financial stewardship of the organization while helping shape the program model at its core.',
  },
  {
    key: 'sandy', initials: 'SL', name: 'Sandy Lehmkuhler', role: 'Spouse, Mother, and Mother-in-Law of Veterans, Secretary, Co-Founder',
    bio: 'Sandy Lehmkuhler has spent more than two decades serving veterans and military families, work rooted as much in her own family as in her career. As the spouse of a veteran, the mother of a veteran, and the mother-in-law of two veterans, the military community isn’t a cause Sandy stepped into. It’s her family. In 2004, she founded a nonprofit dedicated to supporting ill and injured warriors through their recovery and transition, pioneering a transitional housing model that helped veterans acclimate to civilian life before their discharge, not after. As Secretary and Co-Founder of Freedom Ranch, Sandy brings that same lifelong commitment to a broader mission, ensuring every veteran facing transition, not only the wounded, has the support to rebuild.',
  },
];

const personBlock = (p) => `<article class="person">
  ${portrait(p.key, p.name, p.initials, 'sm')}
  <div><h3>${p.name}</h3><p class="role">${p.role}</p><p>${p.bio}</p></div>
</article>`;

const docLink = (label, href) =>
  href
    ? btn(label, href, 'ink')
    : `<span class="soon-link" title="This document will be linked here once it is published">${label} (coming soon)</span>`;

export default [
  {
    path: '/about',
    title: 'About Freedom Ranch',
    desc: 'Freedom Ranch Veterans Foundation was founded by veterans who lived the transition problem before they built the solution. Our mission, values, and story.',
    render() {
      return `${pageHero({
        eyebrow: 'About',
        title: 'About Freedom Ranch Veterans Foundation',
        lede: 'Freedom Ranch Veterans Foundation was founded by veterans who lived the problem before they built the solution.',
      })}
${section({
  narrow: true,
  body: prose(`
<p>Co-founders Matthew Beaghley and Povas Miknaitis both served, and both went through the transition every veteran faces: leaving behind a military life that shaped who they were and stepping into a civilian world with no clear map. They built Freedom Ranch because they had been through it. Sandy Lehmkuhler joined them as a co-founder, bringing more than two decades of serving veterans and military families, including founding a San Diego area nonprofit that supported combat-wounded veterans after 9/11.</p>
<p class="pull">The military is exceptionally good at building people.</p>
<p>It molds identity, instills discipline, and defines purpose down to the smallest detail. It is not built to unmold that person when service ends. Transition support too often becomes a checklist: a resume workshop, a benefits briefing, a final medical exam. None of it addresses the deeper shift: rebuilding an identity, a purpose, and a daily structure the military spent years building.</p>
<p>That gap is why Freedom Ranch exists. Instead of another briefing room or online module, we bring veterans to a ranch estate, away from the city and everyday obligations. The retreat isn’t the destination. It’s where veterans can finally hear themselves think, meet others on the same road, and meet the coaches who will walk with them for the next six months.</p>
${tagline()}`),
})}
${section({
  id: 'mission',
  cls: 'sand',
  eyebrow: 'Mission',
  title: 'Helping post-9/11 veterans navigate life after service.',
  intro: '<p>Through retreats, transition coaching, and lifelong community.</p>',
  body: prose(`
<p class="pull">The military spends years building a person. It rarely spends more than a few weeks unbuilding one.</p>
<p>Our mission is to give post-9/11 veterans a real process, not a checklist, for moving from the identity, structure, and purpose the military built into them toward a civilian life they choose for themselves. We do it through a three-day retreat, six months of professional coaching through our Thrive in Transition™ model, and a community that stays with veterans long after the retreat ends.</p>
<p>Our coaching framework is based on <em>The Ideal Life</em> by Mark Congdon, which treats the stress and uncertainty of transition as raw material for discovering purpose and rebuilding with intention.</p>`) + `<h3 style="margin:2.4rem 0 1.2rem">What we believe</h3>` + cards(values.map(([t, d]) => ({ title: t, text: d })), 'c3'),
})}
${section({
  id: 'story',
  eyebrow: 'Our Story',
  title: 'Freedom Ranch is the program Povas wishes he’d had.',
  narrow: true,
  body: prose(`
<p>Povas Miknaitis knows what it takes to rebuild. A Marine Corps Scout Sniper, he was seriously wounded in combat and recovered at Balboa Naval Medical Center. When he finally got out, he found a system built to process paperwork, not to help a person figure out who to become next. He still says he wishes he’d had this program and this coaching on the day he left.</p>
<p>Matt Beaghley saw the same gap from the other side. He spent 20 years in the Navy, first as an enlisted sailor and then as an officer, a Naval Flight Officer and TOPGUN graduate who flew the E-2C Hawkeye as a strike lead and mission commander. Late in his career he managed the contract for the Navy’s Flag Officer transition program, and he watched senior admirals, with high-level executive coaching, wrestle with the same questions of identity and purpose as the junior sailors walking out the door. If they couldn’t transition cleanly, the standard checklist wasn’t close to enough.</p>
<p>Matt found language for what he’d been seeing in Mark Congdon’s book, <em>The Ideal Life</em>, and its “I GOT This” framework for turning stress into purpose, and he connected with Congdon’s coaching program, Thrive in Transition. The framework was there. What was still missing was the place: somewhere removed from ordinary life where a veteran could slow down long enough to ask who they wanted to become.</p>
<p>So Matt and Povas set out to build it. Sandy Lehmkuhler was the natural third partner. She met Povas in 2009, when her organization flew wounded warriors home for the holidays, and that connection outlasted his hospital stay by more than a decade.</p>
<p class="pull">Veterans don’t need another checklist. They need distance from the noise, a framework for turning hard change into real purpose, and people who understand the road well enough to walk it with them.</p>`),
})}
${ctaBand({ title: 'Meet the people behind it.', actions: btn('Meet Our Team', '/about/team') })}`;
    },
  },

  {
    path: '/about/team',
    title: 'Our Team',
    desc: 'Freedom Ranch is led by three co-founders who lived the transition problem, and guided by a board of directors.',
    render() {
      return `${pageHero({
        eyebrow: 'Leadership and Governance',
        title: 'Our Team',
        lede: 'Freedom Ranch is led by three co-founders who didn’t just study the transition problem. They lived it.',
      })}
${section({ id: 'leadership', body: `<div class="people">${people.map(personBlock).join('')}</div>` })}
${section({
  id: 'sandy',
  cls: 'sand',
  eyebrow: 'Co-Founder',
  title: 'Sandy Lehmkuhler: a personal story, a bigger mission.',
  body: `<div class="split"><div>${portrait('sandy', 'Sandy Lehmkuhler, Co-Founder', 'SL')}</div><div class="prose"><p>Sandy Lehmkuhler didn’t set out to build a career in veteran advocacy. She set out to fix a problem she couldn’t ignore.</p>
      <p>Back in 2004, as a Navy wife, Sandy watched the needs of injured troops go unmet in ways that struck her as simply unacceptable. So she did something about it, founding a nonprofit dedicated to supporting ill and injured warriors during their recovery and transition. What began with quality-of-life support grew into something more ambitious: a transitional housing model built on a simple insight, that veterans succeed best when they start acclimating to civilian life before their discharge, not after, with the guidance and time to relearn how to manage a life the military once managed for them.</p>
      <p>Two decades later, that insight has touched thousands of warriors and their families. But for Sandy, the work was never really about a single organization. It was about a truth she kept encountering again and again: the hardest part of service often isn’t the wound. It’s what comes after, when a servicemember has to rebuild an identity, a routine, and a sense of purpose almost entirely from scratch.</p>
      <p>As the spouse of a veteran, the mother of a veteran, and the mother-in-law of two veterans, the military community isn’t a cause Sandy stepped into. It’s her family.</p>
      <p>Freedom Ranch is the next chapter in that lifelong commitment, built alongside co-founders Matt Beaghley and Povas Miknaitis to reach post-9/11 veterans facing that transition, not only the wounded, with the same rest, structure, and community Sandy has spent her life fighting to provide.</p></div></div>`,
})}
${section({
  id: 'board',
  narrow: true,
  eyebrow: 'Governance',
  title: 'Board of Directors',
  body: prose(`<p>Freedom Ranch Veterans Foundation is governed by a five-member board of directors.</p>`) + cards([
    { kicker: 'President', title: 'Povas Miknaitis', text: 'Co-Founder' },
    { kicker: 'Treasurer', title: 'Matthew Beaghley', text: 'Co-Founder' },
    { kicker: 'Secretary', title: 'Sandy Lehmkuhler', text: 'Co-Founder' },
    { kicker: 'Director', title: 'Eddie Dinkins', text: '' },
    { kicker: 'Director', title: 'Marcus Chischilly', text: '' },
  ], 'c3'),
})}
${ctaBand({ title: 'How we steward every dollar.', actions: btn('Financial Transparency', '/about/financial-transparency') })}`;
    },
  },

  {
    path: '/about/financial-transparency',
    title: 'Financial Transparency and Reporting',
    desc: 'Every donor deserves to know exactly how their gift is used. Freedom Ranch is committed to full financial transparency and annual impact reporting.',
    render() {
      return `${pageHero({ eyebrow: 'Trust and Stewardship', title: 'Financial Transparency' })}
${section({
  narrow: true,
  body: `${prose(`<p>Freedom Ranch Veterans Foundation is a 501(c)(3) public charity, EIN 39-4244309. The IRS recognized our tax-exempt status effective September 23, 2025, and contributions are tax-deductible to the extent allowed by law.</p><p>Every donor deserves to know how their gift is used. We file our annual returns with the IRS and the State of California, and we will post each filing here along with a clear breakdown of how funds are spent on programs, coaching, and operations.</p><p>Mailing address: ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.zip}.</p>`)}
  <div class="actions">${btn('IRS determination letter', '/docs/FRVF-IRS-Determination-Letter.pdf', 'ink')}${docLink('2025 IRS filing (Form 990-N)', docs.form990)}${docLink('View program spending breakdown', docs.spendingBreakdown)}</div>`,
})}
${section({
  id: 'annual-reports',
  cls: 'sand',
  narrow: true,
  eyebrow: 'Impact Reporting',
  title: 'Annual Reports',
  body: `${prose(`<p>As Freedom Ranch grows, we will publish an annual report detailing our reach and impact, including veterans served, coaching outcomes, family impact, and alumni engagement. Our first cohorts are just getting started, and we’re committed to reporting honestly on our progress as real results come in.</p>`)}
  <div class="placeholder-box"><p>Annual reports will be posted here as they become available.</p></div>`,
})}
${ctaBand({ title: 'See what we do.', actions: btn('Our Programs', '/programs') })}`;
    },
  },
];
