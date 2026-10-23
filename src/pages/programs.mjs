import { btn, ctaBand, cards, section, pageHero, prose, faq, tagline } from '../lib.mjs';

const faqs = [
  ['Is there a cost to attend?', 'Freedom Ranch is donor-funded, so veterans who complete the program bear no cost, only the commitment to follow through. Once accepted, participants pay a $500 accountability deposit, refunded in full when you complete the six-month coaching program.'],
  ['Am I eligible if I haven’t separated yet?', 'Yes. Freedom Ranch welcomes applications from active-duty servicemembers within 18 months of their separation date, as well as veterans within 18 months of having already transitioned out.'],
  ['What does the retreat involve?', 'A three-day, immersive experience on a private estate with a small cohort of 12 fellow veterans, combining four to five hours of daily coaching and group activities with time for personal reflection and recreation.'],
  ['What happens after the retreat?', 'Every veteran continues into six months of one-on-one coaching, beginning on-site and continuing virtually, followed by ongoing access to the Freedom Ranch alumni community.'],
  ['Can spouses or family members attend the retreat?', 'Yes, for select retreats. Freedom Ranch offers both family retreats, where spouses and children are welcome to attend, and retreats designed specifically for single veterans. When you apply, you’ll be matched to the retreat format that fits your situation.'],
  ['How are cohorts selected?', 'Cohorts are grouped primarily by age rather than rank or role, since we’ve found veterans connect more naturally, and open up more honestly, with others navigating a similar life stage. Rank doesn’t factor into cohort placement at all.'],
  ['When and where is the first retreat?', 'Our first retreat is planned for March 2027 at Native Falls in Temecula, California. Future retreats will be held on private estates across Southern California.'],
  ['What if I don’t complete the program?', 'The $500 accountability deposit is designed to reflect real follow-through. If a veteran withdraws from the program, the deposit is forfeited. That said, we understand life happens: extenuating circumstances, like a medical or family emergency, are reviewed individually, and we’ll work with veterans to find a way to reaccommodate them wherever possible.'],
];

export const faqItems = faqs;

export default [
  {
    path: '/programs',
    title: 'Programs',
    desc: 'Freedom Ranch is built around three connected pillars: the retreat, the coaching, and the community.',
    render() {
      return `${pageHero({
        eyebrow: 'Program Overview',
        title: 'Three connected pillars, one lasting change.',
        lede: 'Freedom Ranch is built around three connected pillars, each designed to support veterans at a different stage of transition.',
      })}
${section({
  body: cards(
    [
      { kicker: 'Pillar 01', title: 'The Retreat', text: 'A three-day immersive experience on ranch estates, away from the noise of everyday life, for small cohorts of veterans to rest, reflect, and reconnect with what matters most. Veterans meet their coach and fellow cohort members in person, building the foundation of trust that carries into the months ahead.', link: ['Retreat details', '/programs/veteran-retreats'] },
      { kicker: 'Pillar 02', title: 'The Coaching', text: 'Coaching begins on-site during the retreat, then continues virtually for six months afterward through our Thrive in Transition™ model. Guided by the Ideal Life Framework, this ongoing relationship turns reflection into a real plan, backed by structured accountability every step of the way.', link: ['About the coaching', '/programs/coaching'] },
      { kicker: 'Pillar 03', title: 'The Community', text: 'The peer relationships built on-site don’t end when the retreat does. Veterans stay connected to their cohort, coaches, and mentors well beyond the program, so the support that starts in person keeps going long after everyone heads home.', link: ['What happens after', '#community'] },
    ],
    'c3'
  ) + `<p style="margin-top:2rem;font-family:var(--serif);font-size:1.4rem;max-width:40rem">Together, these three pillars are designed to create lasting change, not just a memorable weekend.</p>`,
})}
${section({
  id: 'community',
  cls: 'sand',
  narrow: true,
  eyebrow: 'Alumni Community',
  title: 'The relationships don’t end when the coaching does.',
  body: prose(`
<p>Once a veteran completes the retreat and the six months of coaching that follow, they become part of the Freedom Ranch alumni community, a growing network of veterans, coaches, and mentors who understand exactly what this transition takes because they’ve lived it too. This is where the bonds formed on-site keep growing: staying connected to your cohort, checking in with the coach who walked you through it, and meeting veterans from other retreats who are further down, or just starting, the same road.</p>
<p class="pull">Transition doesn’t have a finish line. Neither does this community.</p>
<p>Freedom Ranch alumni have a place to belong long after the retreat ends, because no veteran should have to keep rebuilding alone once the formal program is over.</p>`),
})}
${ctaBand({ title: 'Four steps from application to alumni.', actions: btn('See How It Works', '/programs/how-it-works') })}`;
    },
  },

  {
    path: '/programs/how-it-works',
    title: 'How It Works',
    desc: 'Every veteran’s path through Freedom Ranch follows four steps: apply, retreat, coaching, and community.',
    render() {
      return `${pageHero({
        eyebrow: 'Journey Overview',
        title: 'How it works',
        lede: 'Every veteran’s path through Freedom Ranch follows the same four steps, but no two journeys look exactly alike.',
      })}
${section({
  narrow: true,
  body: `<ol class="steps">
  <li><h3>Apply</h3><p>It starts with a short application. We ask about your service, your transition, and what you’re hoping to gain, not to check a box, but because your answers help us build the right cohort around you. Our team reviews every application personally and follows up with next steps.</p></li>
  <li><h3>Retreat</h3><p>Selected veterans join a small cohort of 12 for three days on a ranch estate, away from the city, the job search, and the noise of everyday obligations. This isn’t a conference or a workshop. It’s space, real space, to rest, reflect, and reconnect with who you are outside of rank or job title. You’ll meet fellow veterans walking the same road, and you’ll meet the coach who will walk it with you next.</p></li>
  <li><h3>Coaching</h3><p>The work doesn’t end when the retreat does. Coaching begins on-site and continues virtually for six months afterward through our Thrive in Transition™ model. Guided by the Ideal Life Framework, your coach helps turn what you discovered at the retreat into a real, actionable plan, and holds you accountable to it.</p></li>
  <li><h3>Community</h3><p>Six months of coaching builds momentum. What comes next is meant to sustain it. Veterans join the Freedom Ranch alumni community, staying connected to their cohort, their coach, and a growing network of mentors and supporters who understand exactly what this journey takes.</p></li>
</ol>
<div class="callout"><h3>Accountability from day one</h3><p>Freedom Ranch is donor-funded, so veterans who complete the program bear no cost, only the commitment to follow through. Once accepted, participants pay a $500 accountability deposit, refunded in full when you complete the six-month coaching program. It’s an important step: this program works best when veterans show up not just for the retreat, but for the follow-through after it. That deposit is our way of asking for the same commitment we’re making to you.</p></div>
<p style="font-family:var(--serif);font-size:1.35rem">Four steps. One mission: helping you move from where the military left off to where you choose to go next.</p>
${tagline()}`,
})}
${ctaBand({ title: 'Ready to take the first step?', actions: btn('Apply Now', '/apply') })}`;
    },
  },

  {
    path: '/programs/veteran-retreats',
    title: 'Veteran Retreats',
    desc: 'Freedom Ranch retreats take place on large private estates in Southern California, chosen for real space, privacy, and distance from daily noise.',
    render() {
      return `${pageHero({
        eyebrow: 'Retreat Details',
        title: 'Real space. Real privacy. Real distance.',
      })}
${section({
  narrow: true,
  body: prose(`
<p>Our first retreat is planned for March 2027 at Native Falls in Temecula, California. Every Freedom Ranch retreat takes place on a large private estate, chosen specifically because it offers veterans something a conference center or hotel never could: real space, real privacy, and real distance from the noise of daily life.</p>
<p>Our venue partners are veteran supporters who open their properties because they believe in this mission. Our estates offer private tennis courts, resort-style pools and spas, and on-site accommodations built for a small group to stay together throughout the retreat. Depending on the estate, veterans may have access to golf, pickleball, tennis, and other recreational amenities alongside the structured retreat schedule, giving cohorts a natural way to unwind, connect, and compete together between sessions.</p>
<p>This isn’t incidental. Recreation built into the retreat gives veterans an easy, low-pressure way to bond with fellow cohort members, the same kind of shared activity and friendly competition many remember from service, now redirected toward building new relationships in a new chapter.</p>`),
})}
${section({
  cls: 'sand',
  narrow: true,
  eyebrow: 'A Typical Day',
  title: 'Structured work, real rest.',
  body: prose(`
<p>Each day at Freedom Ranch balances structured work with real rest. Veterans spend roughly four to five hours a day in coaching sessions and group activities, guided by the Ideal Life Framework and led by our Thrive in Transition™ coaches. The remainder of each day is intentionally left open for reflection, giving veterans time to sit with what surfaces in session and think through their own transition priorities without being rushed to the next thing.</p>
<p>Alongside our core coaching team, veterans also gain access to specialized coaches who address specific pieces of the transition puzzle. One example is a coach who works with veterans on their money mindset, the beliefs and habits around money that quietly shape decisions long after the paycheck changes. For many veterans stepping into civilian financial life for the first time, untangling that mindset is just as critical as the emotional and identity work at the core of the retreat.</p>`),
})}
${section({
  narrow: true,
  eyebrow: 'Where We Meet',
  title: 'Estates opened by supporters.',
  body: prose(`<p>Freedom Ranch retreats are made possible in part through our Host a Retreat program, in which estate owners across Southern California and beyond contribute their properties in kind. This allows us to direct more of every donor dollar toward coaching and direct veteran support, rather than venue costs.</p>`),
})}
${ctaBand({ title: 'Find your place in the next cohort.', actions: btn('Apply for a Retreat', '/apply') })}`;
    },
  },

  {
    path: '/programs/coaching',
    title: 'Six-Month Coaching',
    desc: 'Every Freedom Ranch veteran continues into six months of one-on-one coaching through our Thrive in Transition™ model.',
    render() {
      return `${pageHero({
        eyebrow: 'Six-Month Coaching',
        title: 'The retreat is the beginning.',
        lede: 'The six months that follow are where real change takes shape.',
      })}
${section({
  narrow: true,
  body: prose(`
<p>Every veteran who completes a Freedom Ranch retreat continues into six months of one-on-one coaching through our Thrive in Transition™ model. Sessions begin on-site during the retreat and continue virtually afterward, so the relationship built in person doesn’t reset once the veteran heads home. Guided by the Ideal Life Framework, coaching turns the clarity gained at the retreat into a concrete plan, backed by structured accountability along the way.</p>
<p>Our coaching framework is based on <em>The Ideal Life</em> by Mark Congdon, whose “I GOT This” approach turns the stress of transition into purpose and a plan.</p>
<p>Coaching isn’t one-size-fits-all. Each veteran’s plan is built around their own goals, whether that means career direction, financial mindset, family and relationships, or personal wellness. What stays consistent is the commitment: a dedicated coach who checks in, holds veterans accountable, and helps them keep moving forward, long after the noise of the retreat has faded.</p>`),
})}
${ctaBand({ title: 'Support that outlasts the retreat.', actions: btn('Learn About Our Community', '/programs#community') })}`;
    },
  },

  {
    path: '/programs/eligibility-and-faq',
    title: 'Eligibility & FAQ',
    desc: 'Who can apply to Freedom Ranch, what the retreat involves, what it costs, and answers to common questions.',
    render() {
      return `${pageHero({ eyebrow: 'Eligibility & FAQs', title: 'Who can apply, and what to expect.' })}
${section({
  narrow: true,
  eyebrow: 'Who Can Apply',
  title: 'Within 18 months of transition.',
  body: prose(`<p>Freedom Ranch is designed for post-9/11 veterans who are within 18 months of transition, whether still on active duty and approaching separation, or already out and adjusting to civilian life. This window is intentional: it’s when the questions of identity, purpose, and direction are freshest, and when the right support can make the biggest difference.</p>`),
})}
${section({
  cls: 'sand',
  narrow: true,
  eyebrow: 'Frequently Asked Questions',
  title: 'Questions, answered.',
  body: faq(faqs),
})}
${ctaBand({ title: 'Still deciding? Start with the application.', actions: btn('Apply Now', '/apply') })}`;
    },
  },
];
