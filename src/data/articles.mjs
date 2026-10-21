import { readCollection } from './content.mjs';
// Resources & Newsroom articles now live in /content/articles (one Markdown file each).
// Categories: Transition, Community, Leadership, Family, Wellness, News/Press
// body is an array of paragraphs (plain HTML allowed).

export const categories = ['Transition', 'Community', 'Leadership', 'Family', 'Wellness', 'News/Press'];

export const articleIntro =
  'Every veteran we work with is navigating some version of the same truth: the discomfort of transition isn’t a sign that something has gone wrong. It’s often the raw material for what comes next. The stress, the restlessness, the unanswered questions aren’t obstacles to work around. They’re the starting point.';

export const articles = readCollection('articles').sort((a, b) => (a.date < b.date ? 1 : -1));

export const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
