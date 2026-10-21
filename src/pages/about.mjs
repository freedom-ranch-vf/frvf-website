import { site, docs } from '../data/site.mjs';
import { btn, ctaBand, cards, section, pageHero, prose, portrait, tagline, eyebrow } from '../lib.mjs';

const values = [
  ['We believe transition is more than a checklist', 'A resume workshop and a final medical exam do not prepare someone to walk away from a military identity. We build a real process for the deeper work that follows.'],
  ['We believe stress can be a catalyst, not just a cost', 'Guided by the Ideal Life Framework, we help veterans convert the discomfort of transition into clarity, purpose, and forward motion, rather than something to simply endure.'],
  ['We believe distance creates clarity', 'Real reflection rarely happens in the middle of daily noise. Our retreats take place on ranch estates, away from the city, so veterans can finally hear themselves think.'],
  ['We believe no veteran should walk it alone', 'Every veteran at Freedom Ranch meets others walking the same road, and Thrive in Transition coaches who walk it with them for the six months that follow.'],
  ['We believe clarity without action is incomplete', 'Reflection is the beginning, not the end. Our coaching model turns insight into a concrete plan, backed by structured accountability.'],
  ['We believe families transition too', 'The next chapter has to work for more than the veteran alone. Our support considers the whole household.'],
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
    desc: 'Freedom Ranch Veterans Foundation was founded by veterans who lived the transition problem before they built the solution.',
    render() {
      return `${pageHero({
        eyebrow: 'About',
        title: 'About Freedom Ranch Veterans Foundation',
        lede: 'Freedom Ranch Veterans Foundation was founded by veterans who lived the problem before they built the solution.',
      })}
${section({
  narrow: true,
  body: prose(`
<p>Co-founders Matthew Beaghley and Povas Miknaitis both served, and both went through the same transition that veterans face every day: leaving behind a military life that had shaped who they were, and stepping into a civilian world with no clear map for who to become next. They didn’t build Freedom Ranch from the outside looking in. They built it because they’d been through it, and they knew firsthand how little real support exists once the uniform comes off.</p>
<p>They didn’t build it alone. Joining them as a co-founder is Sandy Lehmkuhler, who brings more than two decades of experience serving veterans and military families, including founding a major nonprofit in the San Diego area supporting combat-wounded veterans after 9/11. That work gave Sandy a front-row seat to what real recovery and support can look like, and it left her certain of one thing: transition isn’t just a challenge for the wounded. It’s a challenge nearly every servicemember faces, whether their wounds are visible or not.</p>
<p>Together, these three founders saw the same gap from different angles, and set out to close it.</p>
<p class="pull">The military is exceptionally good at building people.</p>
<p>Over the course of a career, it molds identity, instills discipline, and defines purpose down to the smallest detail. What it is not built to do is unmold that person when their service ends. Transition support too often becomes a checklist: a resume workshop, a benefits briefing, a final medical exam. Boxes get checked. But nothing on that checklist addresses the deeper shift a veteran actually has to make: rebuilding an identity, a purpose, and a daily structure that the military spent years building for them.</p>
<p>That gap is why Freedom Ranch exists, and it’s why our approach looks different from most transition programs.</p>
<p>Rather than another briefing room or online module, Freedom Ranch brings veterans to ranch estates, away from the noise of the city, everyday obligations, and the pace of civilian life. It’s in that quiet that the real work of transition can start: reconnecting with who you are outside of your job title or rank, meeting other veterans walking the same road, and meeting the coaches who will walk alongside them for the six months that follow. The retreat isn’t the destination. It’s the space where veterans can finally hear themselves think, and where the relationships that carry them through transition begin.</p>
<p>Together, these three founders built Freedom Ranch around a different definition of support: not a final checklist to close out a service member’s file, but a real process, retreats, coaching, and community, to help veterans move from who the military shaped them to be into who they choose to become next.</p>
${tagline()}`),
})}
${ctaBand({ title: 'Where it all started.', actions: btn('Learn Our Story', '/about/our-story') })}`;
    },
  },

  {
    path: '/about/our-mission',
    title: 'Our Mission',
    desc: 'Our mission is to help post-9/11 veterans navigate life after service through restorative retreats, transition coaching, wellness experiences, and lifelong community.',
    render() {
      return `${pageHero({
        eyebrow: 'Mission',
        title: 'Helping post-9/11 veterans navigate life after service.',
        lede: 'Through restorative retreats, transition coaching, wellness experiences, and lifelong community.',
      })}
${section({
  narrow: true,
  body: prose(`
<p class="pull">The military spends years building a person. It rarely spends more than a few weeks unbuilding one.</p>
<p>Freedom Ranch Veterans Foundation exists to close that gap. Our mission is to give post-9/11 veterans a real process, not a checklist, for moving from the identity, structure, and purpose the military built into them, toward a civilian life they choose for themselves. We do this through immersive retreats on ranch estates away from the noise of everyday life, six months of professional coaching delivered through our Thrive in Transition™ model, wellness experiences that strengthen body and mind, and a community that stays with veterans long after the retreat ends.</p>
<p>Our retreats and coaching are guided by the Ideal Life Framework, which treats the stress and uncertainty of transition not as something to push past, but as raw material veterans can use to discover their purpose and rebuild with intention.</p>`),
})}
${section({
  cls: 'sand',
  eyebrow: 'Values',
  title: 'What we believe',
  body: cards(values.map(([t, d]) => ({ title: t, text: d })), 'c3') + `<div style="margin-top:2.2rem">${tagline()}</div>`,
})}
${ctaBand({ title: 'See how the journey works.', actions: btn('See How It Works', '/programs/how-it-works') })}`;
    },
  },

  {
    path: '/about/our-story',
    title: 'Our Story',
    desc: 'Freedom Ranch started with an idea Matt Beaghley couldn’t shake: veterans need distance from the noise, a framework, and people who understand the road.',
    render() {
      return `${pageHero({
        eyebrow: 'Our Story',
        title: 'It started with an idea Matt Beaghley couldn’t shake.',
      })}
${section({
  narrow: true,
  body: prose(`
<p>Matt spent 20 years in the Navy, first as an enlisted sailor, then as a commissioned officer, a path that gave him a rare view of military life from both sides of the chain of command. As a Naval Flight Officer, he flew the E-2C Hawkeye, serving as a strike lead and mission commander, and earned his place as a graduate of the Navy’s TOPGUN program. Over two decades of service, he watched veteran after veteran hit the same wall on their way out: the military prepares people to leave in almost every way except the ones that matter most. Late in his career, Matt managed the contract for the Navy’s Flag Officer transition program, giving him a front-row seat to something telling: even senior admirals, backed by high-level executive coaching, struggled with the same unresolved questions of identity and purpose as junior sailors walking out the door. If the most experienced leaders in the Navy couldn’t transition cleanly with elite coaching behind them, Matt knew the standard checklist most veterans received wasn’t close to enough.</p>
<p>Matt found language for what he’d been seeing in Mark Congdon’s book, <em>The Ideal Life</em>, and its “I GOT This” framework for turning stress into purpose. He recognized immediately how directly it could apply to the transition every servicemember eventually faces, and connected with Congdon’s coaching program, Thrive in Transition, already putting that framework to work. What was still missing was the environment: a place removed from ordinary life, where a veteran could actually slow down long enough to ask who they wanted to become next.</p>
<p>Matt didn’t have to look far to find a co-founder who understood that need firsthand. Povas Miknaitis knows what it means to rebuild a life from the ground up. A Marine Corps Scout Sniper, Povas deployed to Iraq in 2008 and Afghanistan in 2009, where he was seriously wounded by an IED during a combat operation. He returned home a Purple Heart recipient, and spent the next stretch of his life in recovery at Balboa Naval Medical Center, then went back to school, and worked to find his footing in a civilian world that looked nothing like the one he’d left.</p>
<p>It was during that recovery, in 2009, that Povas first met Sandy Lehmkuhler, a nonprofit founder dedicated to supporting wounded veterans, when her organization flew wounded warriors home for the holidays. That connection outlasted his hospital stay by more than a decade. When Matt and Povas began building what would become Freedom Ranch, Sandy was a natural partner: someone who had already spent twenty years watching veterans fight to rebuild their lives after service, wounded or not.</p>
<p class="pull">Veterans don’t need another checklist. They need distance from the noise, a framework for turning hard change into real purpose, and people who understand the road well enough to walk it with them.</p>
<p>Together, the three of them built Freedom Ranch around what each of them already knew from experience.</p>`),
})}
${ctaBand({ title: 'Meet the people behind it.', actions: btn('Meet Our Leadership', '/about/leadership') })}`;
    },
  },

  {
    path: '/about/founder',
    title: 'Co-Founder Sandy Lehmkuhler',
    desc: 'Sandy Lehmkuhler, co-founder of Freedom Ranch Veterans Foundation, has spent more than two decades serving veterans and military families.',
    render() {
      return `${pageHero({ eyebrow: 'Co-Founder', title: 'Sandy Lehmkuhler', lede: 'A Personal Story. A Bigger Mission.' })}
<section class="section">
  <div class="wrap split">
    <div>${portrait('sandy', 'Sandy Lehmkuhler, Co-Founder', 'SL')}</div>
    <div class="prose">
      <p>Sandy Lehmkuhler didn’t set out to build a career in veteran advocacy. She set out to fix a problem she couldn’t ignore.</p>
      <p>Back in 2004, as a Navy wife, Sandy watched the needs of injured troops go unmet in ways that struck her as simply unacceptable. So she did something about it, founding a nonprofit dedicated to supporting ill and injured warriors during their recovery and transition. What began with quality-of-life support grew into something more ambitious: a transitional housing model built on a simple insight, that veterans succeed best when they start acclimating to civilian life before their discharge, not after, with the guidance and time to relearn how to manage a life the military once managed for them.</p>
      <p>Two decades later, that insight has touched thousands of warriors and their families. But for Sandy, the work was never really about a single organization. It was about a truth she kept encountering again and again: the hardest part of service often isn’t the wound. It’s what comes after, when a servicemember has to rebuild an identity, a routine, and a sense of purpose almost entirely from scratch.</p>
      <p>As the spouse of a veteran, the mother of a veteran, and the mother-in-law of two veterans, the military community isn’t a cause Sandy stepped into. It’s her family.</p>
      <p>Freedom Ranch is the next chapter in that lifelong commitment, built alongside co-founders Matt Beaghley and Povas Miknaitis to reach every veteran facing that transition, not only the wounded, with the same rest, structure, and community Sandy has spent her life fighting to provide.</p>
    </div>
  </div>
</section>
${ctaBand({ title: 'Help carry the mission forward.', actions: btn('Support Our Mission', site.donateUrl) })}`;
    },
  },

  {
    path: '/about/leadership',
    title: 'Leadership',
    desc: 'Freedom Ranch is led by three co-founders who didn’t just study the transition problem. They lived it.',
    render() {
      return `${pageHero({
        eyebrow: 'Executive Team',
        title: 'Leadership',
        lede: 'Freedom Ranch is led by three co-founders who didn’t just study the transition problem. They lived it.',
      })}
${section({ body: `<div class="people">${people.map(personBlock).join('')}</div>` })}
${ctaBand({ title: 'Governance and stewardship.', actions: btn('Meet Our Board', '/about/board-of-directors') })}`;
    },
  },

  {
    path: '/about/board-of-directors',
    title: 'Board of Directors',
    desc: 'Governance at Freedom Ranch Veterans Foundation: our officers and board of directors.',
    render() {
      return `${pageHero({
        eyebrow: 'Governance',
        title: 'Board of Directors',
        lede: 'Freedom Ranch is led by its officers and guided by a board of directors.',
      })}
${section({
  eyebrow: 'Officers',
  title: 'Our officers',
  body: cards(
    people.map((p) => ({ kicker: p.role.split(', ').slice(-2, -1)[0], title: p.name, text: p.role })),
    'c3'
  ),
})}
${section({
  cls: 'sand',
  narrow: true,
  title: 'Board members',
  body: `<div class="placeholder-box"><p>Our full board of directors, with biographies, will be listed here soon.</p></div>`,
})}
${ctaBand({ title: 'How we steward every dollar.', actions: btn('Financial Transparency', '/about/financial-transparency') })}`;
    },
  },

  {
    path: '/about/financial-transparency',
    title: 'Financial Transparency',
    desc: 'Every donor deserves to know exactly how their gift is used. Freedom Ranch is committed to full financial transparency.',
    render() {
      return `${pageHero({ eyebrow: 'Trust and Stewardship', title: 'Financial Transparency' })}
${section({
  narrow: true,
  body: `${prose(`<p>Every donor deserves to know exactly how their gift is used. Freedom Ranch is committed to full financial transparency, publishing our IRS Form 990 and a clear breakdown of how funds are allocated across programs, coaching, and operations. As a donor-supported nonprofit, we hold ourselves to the highest standard of stewardship, because trust is earned one honest dollar at a time.</p>`)}
  <div class="actions">${docLink('View our most recent Form 990', docs.form990)}${docLink('View program spending breakdown', docs.spendingBreakdown)}</div>`,
})}
${ctaBand({ title: 'See our reporting.', actions: btn('View Annual Reports', '/about/annual-reports') })}`;
    },
  },

  {
    path: '/about/annual-reports',
    title: 'Annual Reports',
    desc: 'Freedom Ranch will publish an annual report on our reach and impact as real results come in.',
    render() {
      return `${pageHero({ eyebrow: 'Impact Reporting', title: 'Annual Reports' })}
${section({
  narrow: true,
  body: `${prose(`<p>As Freedom Ranch grows, we will publish an annual report detailing our reach and impact, including veterans served, coaching outcomes, family impact, and alumni engagement. Our first cohorts are just getting started, and we’re committed to reporting honestly on our progress as real results come in.</p>`)}
  <div class="placeholder-box"><p>Annual reports will be posted here as they become available.</p></div>`,
})}
${ctaBand({ title: 'See what we do.', actions: btn('Our Programs', '/programs') })}`;
    },
  },
];
