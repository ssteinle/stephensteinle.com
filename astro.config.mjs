import { defineConfig } from 'astro/config';

// GitHub Pages serves this repo as a project site at
// https://ssteinle.github.io/stephensteinle.com/. Local and Cloudflare builds
// stay at the domain root. The workflow sets GITHUB_PAGES=true.
const githubPages = process.env.GITHUB_PAGES === 'true';

// `site` is required, not optional. The sitemap integration emits nothing
// without it and canonical URLs have no origin to resolve against.
// See Section 17 of the project plan.
export default defineConfig({
  site: githubPages
    ? 'https://ssteinle.github.io/stephensteinle.com'
    : 'https://stephensteinle.com',
  base: githubPages ? '/stephensteinle.com' : '/',
  output: 'static',
  // Matches Cloudflare Pages, which redirects to the non-trailing-slash form.
  // Keeping these consistent is what makes canonical URLs deterministic.
  trailingSlash: 'never',
});
