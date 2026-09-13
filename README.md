# stephensteinle.com

Personal site of Stephen Steinle. Built with [Astro](https://astro.build) and deployed from this repository.

**Live preview:** https://ssteinle.github.io/stephensteinle.com/

Website source lives under `src/`, and static assets live under `public/`. Generated output lives in `dist/` and is not committed.

The project architecture and implementation plan are in [PROJECT_PLAN.md](PROJECT_PLAN.md).

## Local development

Requires Node 24 (see `.nvmrc`).

```bash
nvm use
npm ci
npm run dev
```

The site is then at http://127.0.0.1:4321/.

```bash
npm run build    # production build → dist/
npm run preview  # serve the production build
```

GitHub Actions builds the preview site and deploys the generated `dist/` output to GitHub Pages on pushes to `main`. The current preview is [ssteinle.github.io/stephensteinle.com](https://ssteinle.github.io/stephensteinle.com/).

The future production target is `stephensteinle.com` on Cloudflare Pages.

## Updating content

Content is stored in `src/data/`: `profile.json` contains biography and CV details; `publications.json`, `research.json`, `projects.json`, and `teaching.json` feed schema-validated Astro content collections. Add entries with stable, unique `id` values. Publication and research references use those IDs. Set `selected: true` to feature a publication or project on the homepage; `draft: true` excludes a collection entry from all public pages.

The publications page and `/publications.bib` share the same records. Source verification and bibliographic discrepancies are documented in `CONTENT_SOURCES.md`.

The downloadable public CV is `public/cv/stephen-steinle-cv.pdf`. Refresh that PDF alongside CV content updates; it is a static snapshot and intentionally excludes private contact and clearance details.
