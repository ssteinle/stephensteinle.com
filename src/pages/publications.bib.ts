import type { APIRoute } from 'astro';
import { getPublications, publicationBibtex } from '~/lib/content';

export const GET: APIRoute = async () => new Response(
  (await getPublications()).map(publicationBibtex).join('\n\n') + '\n',
  { headers: { 'Content-Type': 'application/x-bibtex; charset=utf-8' } },
);
