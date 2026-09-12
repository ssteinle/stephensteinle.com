# stephensteinle.com

Personal site of Stephen Steinle. Built with [Astro](https://astro.build) and deployed from this repository.

**Live preview:** https://ssteinle.github.io/stephensteinle.com/

## Local development

Requires Node 24 (see `.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

The site is then at http://127.0.0.1:4321/.

```bash
npm run build    # production build → dist/
npm run preview  # serve the production build
```

Production hosting on `stephensteinle.com` via Cloudflare Pages is the later target. Until then, pushes to `main` publish to GitHub Pages.
