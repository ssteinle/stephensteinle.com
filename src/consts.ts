/** Site-wide constants. Single source of truth for metadata and navigation. */

export const SITE = {
  title: 'Stephen Steinle',
  /** Used as the homepage <title>. See Section 17. */
  homeTitle: 'Stephen Steinle | AI & Computer Science Researcher',
  description:
    'Stephen Steinle is a computer science Ph.D. student at the University of South Florida researching strategic reasoning, natural language processing, and cognitive modeling.',
  /** Must match `site` in astro.config.mjs. */
  origin: 'https://stephensteinle.com',
  ogImage: '/og-default.png',
  locale: 'en_US',
} as const;

export const AFFILIATION = {
  university: 'University of South Florida',
  college: 'Bellini College of Artificial Intelligence, Cybersecurity and Computing',
  lab: 'Advancing Machine and Human Reasoning Lab',
} as const;

/**
 * Name variants used to highlight Stephen in author lists. See Section 7.
 *
 * Publication entries record whatever form the venue printed; this constant
 * absorbs the variation so no display name is ever rewritten to match a
 * hardcoded string.
 */
export const AUTHOR_SELF = [
  'Stephen Steinle',
  'S. Steinle',
  'Steinle, S.',
  'Steinle, Stephen',
] as const;

/** Collections that gate a nav route. `null` means the route is always shown. */
export type NavGate = 'research' | 'publications' | 'projects' | 'teaching' | null;

export interface NavRoute {
  label: string;
  href: string;
  gate: NavGate;
}

/**
 * Primary navigation. See Section 4.
 *
 * Every route is built. A gated route is hidden from the header until its
 * collection holds at least one non-draft entry, which is wired up in Slice 3.
 */
export const NAV_ROUTES: readonly NavRoute[] = [
  { label: 'Home', href: '/', gate: null },
  { label: 'Research', href: '/research', gate: 'research' },
  { label: 'Publications', href: '/publications', gate: 'publications' },
  { label: 'Projects', href: '/projects', gate: 'projects' },
  { label: 'Teaching', href: '/teaching', gate: 'teaching' },
  { label: 'CV', href: '/cv', gate: null },
];

export interface SocialLink {
  label: string;
  href: string;
}

/** Public profiles verified against the resume and Google Scholar. */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'Email', href: 'mailto:ssteinle@usf.edu' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=lN4H6FoAAAAJ&hl=en' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/stephen-steinle' },
  { label: 'GitHub', href: 'https://github.com/ssteinle' },
];
