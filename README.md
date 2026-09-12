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
