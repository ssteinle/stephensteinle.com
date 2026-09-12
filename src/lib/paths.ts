/**
 * Prefix an in-site path with Astro's configured `base`.
 *
 * Local and Cloudflare builds use `/`. GitHub Pages project sites live under
 * `/stephensteinle.com`, so root-absolute hrefs such as `/research` would 404
 * there unless they go through this helper.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  // With `trailingSlash: 'never'`, BASE_URL is `/stephensteinle.com` and has
  // no trailing slash. Join with one so `/research` does not become
  // `/stephensteinle.comresearch`.
  if (path === '/' || path === '') {
    return base === '/' ? '/' : base.replace(/\/+$/, '');
  }
  const suffix = path.replace(/^\/+/, '');
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${suffix}`;
}

/** Strip a trailing slash so current-route checks match `trailingSlash: 'never'`. */
export function normalizePath(path: string): string {
  if (path === '/' || path === '') return '/';
  return path.replace(/\/+$/, '') || '/';
}
