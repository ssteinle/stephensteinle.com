# StephenSteinle.com Project Plan

# 1. Project Goal

Build a clean, fast, professional personal website for Stephen Steinle.

The site should function as a long-term professional home for:

- Academic research
- Publications
- Research projects
- Professional experience
- Teaching
- Startup and engineering projects
- CV
- Contact information

The website should be easy to maintain through GitHub and deploy automatically from the repository:

`git@github.com:ssteinle/stephensteinle.com.git`

The intended production domain is:

`stephensteinle.com`

The site should prioritize clarity, maintainability, performance, and professional presentation over flashy design.

---

# 2. Technology Stack

Use:

- **Astro**
- **TypeScript**
- Standard HTML/CSS where possible
- Minimal JavaScript
- Markdown or Astro Content Collections for structured content
- GitHub for source control
- Cloudflare Pages for deployment

Avoid adding React, Vue, Tailwind, databases, or other major dependencies unless there is a clear technical reason.

The website is primarily static and should remain simple.

---

# 3. Design Philosophy

The site should feel like the website of a computer science researcher and engineer, not a generic software developer portfolio.

Target characteristics:

- Minimal
- Modern
- Academic
- Technically polished
- High information density without feeling cluttered
- Strong typography
- Excellent mobile support
- Very fast load times
- Easy to scan

Do not use excessive:

- Animations
- Gradients
- Glassmorphism
- Giant hero sections
- Skill percentage bars
- Decorative cards everywhere
- Marketing language
- Generic portfolio clichés

Favor content over decoration.

---

# 4. Initial Site Structure

Create the following primary navigation:

```text
Home
Research
Publications
Projects
Teaching
CV
```

Contact information can appear on the Home page and in the footer rather than requiring a dedicated Contact page.

## Content-gated navigation

All six routes are built in Phase 1. A route appears in the header navigation only once it has real content, meaning at least one non-draft entry in its backing collection.

Home and CV are always present. Research, Publications, Projects, and Teaching are gated.

The reason is that a visitor who clicks "Publications" and finds a placeholder learns something worse than they would have learned from not seeing the link. Thin, empty pages also dilute a new domain in search results. Gating costs one helper that counts non-draft entries per collection, and it means the navigation grows itself as content lands in Phase 2 with no code change.

A gated route still exists and still builds, so it can be linked directly and previewed. It is simply not advertised in the header until it is worth visiting. Gated routes must also be excluded from the sitemap while empty, so they are not submitted to search engines as placeholders.

---

# 5. Home Page

Route:

```text
/
```

The homepage should immediately establish:

1. Who Stephen is
2. What he researches
3. What he is currently working on
4. Where to find his work

## Hero / Introduction

Include:

**Stephen Steinle**

Short professional descriptor along the lines of:

> Ph.D. Researcher in Computer Science and Artificial Intelligence

Do not invent final biography text. Use clearly marked placeholder content where exact wording has not been provided.

Primary affiliation:

- University of South Florida
- Bellini College of Artificial Intelligence, Cybersecurity and Computing
- Advancing Machine and Human Reasoning Lab

Include links/icons for:

- GitHub
- Google Scholar, placeholder if URL unavailable
- LinkedIn, placeholder if URL unavailable
- Email, placeholder if unavailable
- CV

## Current Research

Include a concise section highlighting several active research areas.

Initial categories can include:

- Large Language Model Reasoning
- Cognitive Modeling of LLMs
- Document Understanding
- AI Agents

Each item should link to the Research page.

## Selected Publications

Show approximately 3 to 5 selected publications.

Each entry should support:

- Title
- Authors
- Venue
- Year
- Paper link
- Code link if applicable
- Short description if provided

## Selected Projects

Show approximately 3 projects with links to the full Projects page.

---

# 6. Research Page

Route:

```text
/research
```

The Research page should describe research programs rather than simply listing papers.

Create a reusable research-project component or content model.

## Research versus Projects

Research and Projects are not interchangeable, and the same work must not be described in both places.

- **Research** is ongoing inquiry: the questions being asked, why they matter, and what has been learned. A research area can exist with no code attached to it.
- **Projects** are artifacts: software that was built, can be run, or can be linked to. A project can exist with no research question attached to it.

Where a research area produced a piece of software, the research entry owns the narrative and links to the project. The project entry stays a short description of the artifact and does not restate the research framing.

## Schema

Each research area should support:

```typescript
z.object({
  title: z.string(),
  status: z.enum(['active', 'ongoing', 'concluded']),
  summary: z.string(),
  questions: z.array(z.string()).default([]),
  publications: z.array(reference('publications')).default([]),
  projects: z.array(reference('projects')).default([]),
  collaborators: z.array(z.string()).default([]),
  image: z.string().optional(),
  order: z.number().optional(),
  draft: z.boolean().default(false),
})
```

Cross-links to publications and projects must use Astro's `reference()` helper rather than plain strings. A reference to a slug that does not exist fails the build; a plain string silently becomes a dead link. This applies in both directions, including the `project` field on publications in Section 7.

Initial categories may include:

- LLM reasoning and cognitive control
- Document understanding and reading-order reconstruction
- Strategic reasoning with LLMs
- Human and machine reasoning
- AI agents

Do not fabricate research descriptions.

Use placeholders or clearly marked TODO comments when source material has not yet been provided.

---

# 7. Publications Page

Route:

```text
/publications
```

This page should be data driven.

Do not hard-code publication HTML independently for every paper.

Use an Astro Content Collection as the data source.

## Schema

Define the collection with an explicit Zod schema:

```typescript
z.object({
  title: z.string(),
  authors: z.array(z.string()),
  venue: z.string(),
  year: z.number(),
  type: z.enum(['conference', 'workshop', 'journal', 'preprint']),
  date: z.coerce.date().optional(),
  url: z.string().url().optional(),
  pdf: z.string().optional(),
  doi: z.string().optional(),
  code: z.string().url().optional(),
  bibtex: z.string().optional(),
  project: reference('projects').optional(),
  abstract: z.string().optional(),
  selected: z.boolean().default(false),
  draft: z.boolean().default(false),
})
```

Notes on specific fields:

- `authors` is an array of individual names, never a single prose string. Name highlighting depends on comparing discrete entries, and a prose string forces brittle substring matching.
- `type` is an enum rather than free text so that a typo becomes a build error instead of a silently missing group.
- `date` is optional and exists only as a sort key for ordering within a single year. Where only a year is known, leave it unset rather than inventing a month.
- `draft` excludes the entry from production builds. See Section 21a.
- `project` is a content reference, not a raw string. See Section 8.

## Author name highlighting

Highlight Stephen Steinle's name in author lists.

Match against a single shared constant of known name variants rather than ad-hoc string checks scattered through components:

```typescript
const AUTHOR_SELF = ['Stephen Steinle', 'S. Steinle', 'Steinle, S.'];
```

Publication entries should use whatever form the venue printed. The constant absorbs the variation so that the display name is never rewritten to match a hardcoded string.

## Grouping

The UI groups publications by year, descending. Grouping is static and requires no client-side JavaScript.

Interactive filtering is explicitly out of scope for Phase 1 and is tracked in Section 24 alongside publication search.

## PDF hosting policy

Prefer linking to a DOI or arXiv record over hosting a PDF on this site.

Self-hosting a published paper can breach the copyright transfer or license agreement for that venue. Where a PDF is self-hosted, it must be the version the venue's policy permits, which is typically the accepted manuscript rather than the published version.

When in doubt, link out. The `url` and `doi` fields should carry the canonical pointer; `pdf` is for cases that have been individually checked.

## Content discipline

Initial known publications can be added only when bibliographic information is verified.

Do not guess missing metadata. Leave optional fields unset rather than approximating them.

---

# 8. Projects Page

Route:

```text
/projects
```

Projects are artifacts: software that was built, can be run, or can be linked to. They may come out of either research or engineering work.

A project entry describes the thing that exists. It does not carry the research narrative, which belongs on the Research page per the boundary defined in Section 6. Where both apply, the research entry links down to the project and the project links back.

## Schema

```typescript
z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(['active', 'maintained', 'archived', 'private']),
  technologies: z.array(z.string()).default([]),
  repository: z.string().url().optional(),
  website: z.string().url().optional(),
  publication: reference('publications').optional(),
  research: reference('research').optional(),
  image: z.string().optional(),
  selected: z.boolean().default(false),
  draft: z.boolean().default(false),
})
```

`selected` drives the "Selected Projects" block on the homepage, matching the field of the same name on publications in Section 7. Use one name for one concept across collections.

As in Section 6, cross-links use `reference()` so that a renamed slug fails the build rather than producing a dead link.

`repository` and `website` are both optional, since a `private` project may have neither.

Design this so projects can easily be added later through Markdown/content files without modifying layout code.

Possible categories:

- Research software
- AI agents
- Experimental systems
- Open-source projects
- Applied AI projects

Do not assume every project should be public.

---

# 9. Teaching Page

Route:

```text
/teaching
```

The page splits into current and previous teaching.

## Schema

```typescript
z.object({
  course: z.string(),
  institution: z.string(),
  term: z.string().regex(/^\d{4}-(spring|summer|fall)$/),
  role: z.string(),
  materials: z.string().url().optional(),
  draft: z.boolean().default(false),
})
```

`term` is a sortable machine-readable value such as `2026-fall`, not a display string such as `Fall 2026`.

Both the display label and the current/previous split are derived from `term`. A display string would require sorting entries by hand and manually moving each course from one list to the other every semester; a sortable term makes both automatic.

Initial known course:

```yaml
course: Introduction to AI Math
institution: University of South Florida
term: 2026-fall
role: Teaching Assistant
```

Do not expose information such as office hours or room location unless explicitly added to the site's content later.

---

# 10. CV

Route:

```text
/cv
```

Provide:

- An HTML CV rendered on the page itself
- A prominent "Download CV" link to the PDF

Do not embed the PDF in an iframe or object element. Embedded PDFs render poorly in mobile Safari, force a large download before anything is readable, and are frequently inaccessible to screen readers, which conflicts with the accessibility requirements in Section 16. An HTML CV is more accessible, indexable by search engines, and readable on a phone, which is where most of this page's traffic will come from.

The PDF remains the canonical artifact for download and printing.

Store the current CV at something like:

```text
/public/cv/stephen-steinle-cv.pdf
```

If no CV is currently available, create the route and a placeholder explaining that the file still needs to be added.

Do not generate a fictional CV. The HTML CV is populated from real content in Phase 2; in Phase 1 it is a marked placeholder.

---

# 11. Shared Layout

Create reusable components for:

```text
Header
Navigation
Footer
PublicationEntry
ProjectCard
ResearchArea
TeachingEntry
SocialLinks
SectionHeading
ThemeToggle
BaseHead
```

Create one global site layout.

Avoid page-specific duplicated navigation or metadata.

---

# 12. Content Architecture

Separate content from presentation.

The goal is for future updates to look like:

```text
src/content/publications/paper-name.md
```

rather than manually editing HTML.

Recommended structure:

```text
src/
├── components/
├── content/
│   ├── publications/
│   ├── projects/
│   ├── research/
│   └── teaching/
├── layouts/
├── pages/
└── styles/
```

All four collections are defined with explicit Zod schemas in a single content config, using the field definitions in Sections 6, 7, 8, and 9. Every collection carries the `draft` flag required by Section 21a.

Schemas are not optional here. They are what turns a typo in a content file into a build error rather than a silently malformed page, and they are what makes `reference()` cross-links verifiable.

---

# 13. Styling

Implement a restrained design system.

## Tokens

Keep theme tokens and layout tokens separate. Only the theme tokens are redefined per color scheme; mixing a width into that set means layout values get needlessly duplicated across both palettes and risks them drifting apart.

Theme tokens, defined once per color scheme:

```css
--background
--surface
--text
--text-muted
--border
--accent
--accent-muted
--link
--link-visited
--focus-ring
```

Layout tokens, defined once and scheme-independent:

```css
--max-width        /* page shell */
--max-width-prose  /* long-form reading column */
--space-unit
```

Both `--accent-muted` and `--focus-ring` exist because a single accent value rarely satisfies contrast requirements against both a light and a dark background, and because the visible focus state required by Section 16 needs a token that is guaranteed to contrast with whichever surface it lands on.

## Widths

```text
--max-width:        900 to 1100px
--max-width-prose:  narrower reading measure
```

Long-form text uses `--max-width-prose`. Dense listings such as publications may use the full `--max-width`.

## Typography

Typography should be highly readable.

Use a system font stack for Phase 1. This costs zero network requests, cannot cause a layout shift or a flash of unstyled text, and renders natively on every platform.

Do not load fonts from the Google Fonts CDN. It adds a third-party origin to the critical path and creates an avoidable data-protection question for a site with EU visitors.

If a web font is later judged necessary, it must be self-hosted from the site's own origin as a subset, with `font-display: swap` and a matching system fallback to limit layout shift. Treat that as a deliberate later change, not a Phase 1 task.

Avoid unnecessary font dependencies.

---

# 14. Dark Mode

## Three-state theme model

The theme is a three-state value, not a boolean:

```text
system   (default)
light
dark
```

A boolean cannot express "follow the system," so once a user touched a two-state toggle they could never return to automatic. Store the string, and treat an absent stored value as `system`.

When the state is `system`, the theme follows `prefers-color-scheme` and must keep following it if the user changes their OS setting while the page is open.

## Pre-paint theme script

The stored theme must be applied by a small inline script in `<head>`, before first paint, that reads the value and sets an attribute on the document element.

This is required. Applying the theme after hydration, or from an external script file, produces a flash of the wrong theme on every page load. The script must be inline and synchronous, and it must run before any stylesheet-dependent content renders.

This script is the one sanctioned exception to the no-client-JavaScript rule in Section 18, alongside the navigation toggle in Section 15. No other client-side JavaScript is in scope for Phase 1.

## Visual requirements

The site must remain readable and visually consistent in both modes. Both palettes need to satisfy the contrast requirements in Section 16 independently; a palette that passes in light mode says nothing about dark mode.

---

# 15. Responsive Design

Support at minimum:

- Desktop
- Tablet
- Mobile

Navigation should collapse cleanly on smaller screens.

Prefer a CSS-only collapse, which keeps the site at zero client-side JavaScript outside the theme script in Section 14. If a CSS-only approach cannot meet the keyboard and focus requirements in Section 16, a minimal vanilla JavaScript toggle is acceptable as the second and final sanctioned exception to the rules in Section 18. It must not pull in a framework.

Do not allow publication titles, links, code blocks, or long author lists to overflow horizontally. Long author lists and DOI strings are the realistic overflow risks on this site and should be tested explicitly at the narrowest supported width.

---

# 16. Accessibility

Follow basic WCAG accessibility principles.

Requirements:

- Semantic HTML
- Keyboard accessible navigation
- Visible focus states
- Good contrast
- Alt text support for images
- Correct heading hierarchy
- ARIA only where semantic HTML is insufficient

---

# 17. SEO and Metadata

## Required Astro configuration

Set the production origin in `astro.config.mjs`:

```js
site: 'https://stephensteinle.com'
```

This is not optional. Astro's sitemap integration emits nothing without `site`, and canonical URLs have no origin to resolve against. Configure this during the first implementation slice, before any metadata work.

## Per-page metadata

Each page should have:

- Title
- Description
- Canonical URL
- Open Graph metadata, including `og:image`
- Twitter/social metadata

## Required static assets

```text
robots.txt
sitemap.xml
favicon
404 page
Open Graph fallback image
```

Use Astro's sitemap integration.

The Open Graph fallback image should be a single static 1200x630 image stored in `/public`. Without it, every link shared on LinkedIn or a similar platform renders as a blank placeholder. Individual pages may override it later, but the fallback must exist from Phase 1.

Homepage title should eventually resemble:

```text
Stephen Steinle | AI & Computer Science Researcher
```

Do not keyword-stuff.

---

# 18. Performance

## Rules, not scores

The numeric Lighthouse targets previously stated here have been dropped.

They were never referenced by the acceptance criteria in Section 26, so nothing measured them, and a static site with no client-side JavaScript clears them without effort. Publishing an unmeasured number invites the belief that performance has been verified when it has not. The rules below are what actually determine the outcome.

## Rules

- Ship no client-side JavaScript except the two sanctioned exceptions: the pre-paint theme script in Section 14, and the mobile navigation toggle in Section 15 if it cannot be done in CSS alone.
- Ship no UI framework runtime. See the stack constraints in Section 2.
- Load no third-party origins on the critical path. This includes font CDNs, per Section 13.
- Optimize all images through Astro's image pipeline, with explicit dimensions to prevent layout shift.
- Keep the CV PDF out of the page payload. It is a download, not an embed. See Section 10.

The largest realistic performance risks on this site are unoptimized figures and an embedded PDF, both of which are addressed by rules above rather than by a score threshold.

## Optional verification

If a number is wanted, run Lighthouse against the production build and record the result in the pull request. This is optional and is not an acceptance criterion.

---

# 19. Deployment

Deployment target:

**Cloudflare Pages**

## Why Pages, deliberately

Cloudflare now directs new projects to Workers with Static Assets, and has stated that future investment, optimization, and feature work goes to Workers rather than Pages. Pages is not deprecated and existing projects continue to be supported.

Pages is chosen here anyway, for a specific reason: this site is purely static, needs no bindings or server-side rendering, and Pages has the more mature Git-connected build and preview workflow, which is the only feature this project actually uses.

This is recorded so the choice reads as deliberate rather than accidental. If the site later needs server-side logic, migrating to Workers Static Assets is the expected path, and Cloudflare supports `_headers` and `_redirects` on both, so the move is not costly.

Do not use Workers Sites, which is deprecated.

## Build configuration

Configure Astro for a static build.

Expected build command:

```bash
npm run build
```

Expected output directory:

```text
dist
```

## Node version

Pin the Node version in `.nvmrc`, and set the matching version in the Cloudflare Pages project settings.

Cloudflare's default build image Node version drifts over time and will not necessarily match the local development version. An unpinned version produces builds that pass locally and fail remotely, for reasons that are not visible in the diff.

## Deployment behavior

Cloudflare should deploy automatically when commits are pushed to the main branch.

Do not commit secrets.

---

# 20. Development Workflow

Primary branch:

```text
main
```

Typical workflow:

```bash
npm install
npm run dev
npm run build
```

Before completing any implementation slice in Section 22:

1. Run the production build.
2. Resolve TypeScript/build errors.
3. Confirm the TODO gate and internal link check pass, per Section 21a.
4. Check desktop and mobile layouts.
5. Verify navigation, including which routes are gated.
6. Verify both themes, with no flash on load.

Each slice in Section 22 has its own exit criteria on top of this list. Do not begin the next slice with the build failing.

---

# 21. Repository Hygiene

Include:

```text
README.md
.gitignore
.nvmrc
LICENSE if appropriate
```

`.nvmrc` pins the Node version required by Section 19.

On licensing, a personal site usually wants two different answers: a permissive license for the site's code, and reserved rights for the written content and figures. If a LICENSE file is added, make clear which of the two it covers. Note also that this does not extend to publication PDFs, whose terms belong to their venues per Section 7.

README should explain:

- Purpose of the repository
- Tech stack
- Local development
- Build process
- Deployment architecture
- Where content lives and how to add a publication, project, research area, or course

Do not commit:

```text
node_modules/
dist/
.env
```

---

# 21a. Content Integrity Enforcement

This document repeats some version of "do not fabricate" in Sections 5, 6, 7, 10, and 22. Repetition is not a control. Placeholder content leaks into production because nothing stops it, so the rule needs a mechanism rather than another restatement.

## The rule

Do not fabricate professional history, publications, URLs, awards, affiliations, research results, or biographical detail.

Where real content is unavailable, use a clearly marked placeholder. Where metadata is unavailable, leave the optional field unset rather than approximating it.

## Mechanism 1: the draft flag

Every content collection carries `draft: z.boolean().default(false)`.

Entries with `draft: true` are excluded from production builds and from the collection counts that drive navigation gating in Section 4. They remain visible in `npm run dev` so that work in progress can be previewed.

This makes unverified content structurally incapable of reaching the deployed site, which is a stronger guarantee than remembering to check.

## Mechanism 2: the TODO build gate

Placeholders use a single consistent marker so that they are greppable:

```text
TODO:
```

The production build fails if `TODO:` appears in any rendered output in `dist`. Add this as a script that runs after `astro build`:

```json
"build": "astro build && npm run check:todo"
```

A placeholder is then either behind a draft flag, or it breaks the build. It cannot quietly ship.

This is what makes the "no fabricated biographical details" acceptance criterion in Section 26 actually checkable, rather than an assertion nobody can verify.

## Scope note

Phase 1 deliberately ships placeholder content, so the gate is expected to be active during development. The requirement is that placeholders are marked and drafted, not that they are absent. The gate becomes a release gate rather than a development obstacle.

---

# 22. Phase 1 Implementation

The first implementation should focus on architecture and layout rather than filling every page with final content.

Build:

Work in four slices. Each slice ends with a passing `npm run build` and is independently reviewable.

A single sixteen-item list gives no checkpoint until everything is done, which means a foundational mistake in the layout or the token system is not discovered until it has been replicated across six pages.

## Slice 1: Foundation

1. Astro project scaffold, with `site` configured per Section 17 and the Node version pinned per Section 19
2. Global layout, single shared shell
3. Design tokens and base typography per Section 13
4. Dark mode, including the pre-paint script per Section 14
5. Header, navigation, and footer
6. Homepage

Exit criteria: the build passes, the homepage renders correctly at desktop and mobile widths, and both themes are correct with no flash on load.

## Slice 2: Content layer

7. Content Collections with the Zod schemas from Sections 6, 7, 8, and 9
8. Publications page, grouped by year
9. Author name highlighting

Exit criteria: the build passes, a publication can be added by creating one content file, and a broken `reference()` fails the build.

## Slice 3: Remaining routes

10. Research page
11. Projects page
12. Teaching page
13. CV page
14. Content-gated navigation per Section 4
15. Responsive styling verified across all routes

Exit criteria: the build passes, every route resolves, and gated routes are absent from the navigation while their collections are empty.

## Slice 4: Metadata and release

16. Per-page metadata, Open Graph image, favicon, 404 page
17. Sitemap and robots.txt
18. Internal link check and TODO build gate per Section 21a
19. README

Exit criteria: the full acceptance criteria in Section 26 pass.

## Content discipline during Phase 1

Use realistic placeholders where information is unavailable, marked and drafted per Section 21a.

Do not fabricate professional history, publications, URLs, awards, affiliations, or research results.

---

# 23. Phase 2

After the core site exists:

- Add verified publication metadata
- Add research descriptions
- Add professional biography
- Add project descriptions
- Add photographs/figures
- Add CV
- Add Google Scholar
- Add LinkedIn
- Add ORCID if applicable
- Add analytics if desired
- Connect custom domain

## Blockers to confirm before Phase 2

- **Domain registration.** Confirm whether `stephensteinle.com` is already registered and, if so, whether its nameservers can be pointed at Cloudflare. If the domain is not yet owned, connecting it is not a task but a prerequisite, and the `site` value in Section 17 is provisional until it is resolved.
- **Google Scholar, LinkedIn, and ORCID URLs.** These are placeholders per Section 5 and must be supplied rather than guessed.
- **CV PDF.** Section 10 creates the route with a placeholder; the file itself is a Phase 2 input.

## Analytics note

If analytics are added, prefer Cloudflare Web Analytics. It is free on Pages, requires no cookie banner, and adds no third-party origin to the critical path, which keeps it consistent with the rules in Section 18.

---

# 24. Potential Future Features

Architect the site so these can be added later without requiring them now:

- Blog / research notes
- Talks and presentations
- News
- BibTeX downloads
- Publication search
- Publication filtering by year, type, or topic, deferred from Section 7
- Project demos
- Interactive research visualizations
- Academic timeline
- RSS feed

The `bibtex` field in the Section 7 schema and the `date` sort key exist so that BibTeX downloads and finer-grained ordering are additive later rather than a schema migration.

Do not implement these during Phase 1 unless they are trivial consequences of the existing architecture. Anything here that requires client-side JavaScript also requires revisiting the rules in Section 18 as a deliberate decision.

---

# 25. Non-Goals

Do not build:

- Authentication
- User accounts
- CMS backend
- Database
- Admin dashboard
- Comments
- E-commerce
- Complex server infrastructure

These are unnecessary for the initial personal site.

---

# 26. Acceptance Criteria

Phase 1 is complete when the following pass.

## Automated

These must be checkable by running a command, not by opinion:

- `npm run build` succeeds with no TypeScript or build errors
- The TODO build gate passes, so no `TODO:` marker reaches `dist`, per Section 21a
- An internal link check over `dist` reports zero broken links
- Every content reference resolves, so no `reference()` points at a missing slug
- Every route in Section 4 is present in `dist`
- `sitemap.xml` and `robots.txt` are generated and contain absolute URLs, which confirms `site` is configured per Section 17

The previous criteria "there are no obviously broken links" and "there are no fabricated biographical details" were both unverifiable as written. The first is now the link check; the second is now the TODO gate plus the draft flag, since anything unverified is either drafted out of the build or breaks it.

## Manual

- Layout works on mobile and desktop, with no horizontal overflow at the narrowest supported width
- Light, dark, and system themes all work, with no flash of the wrong theme on load
- Keyboard navigation reaches every interactive element with a visible focus state
- Gated routes are absent from the navigation while their collections are empty
- The site deploys to Cloudflare Pages from a push to main

## Architectural

- Publications, projects, research, and teaching content are data driven
- Adding a publication requires adding one content file and no layout changes
- README explains local development, the build, and the deployment architecture

The result should be a polished foundation that can be incrementally populated with Stephen's real content.