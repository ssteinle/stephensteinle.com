import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublications() {
  const entries = await getCollection('publications', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.year - a.data.year || a.id.localeCompare(b.id));
}

export function publicationBibtex({ id, data }: CollectionEntry<'publications'>) {
  const kind = data.type === 'journal' ? 'article' : data.type === 'preprint' ? 'misc' : 'inproceedings';
  const fields: Record<string, string> = {
    title: `{${data.title}}`,
    author: data.authors.join(' and '),
    year: String(data.year),
    [data.type === 'journal' ? 'journal' : 'booktitle']: data.venue,
    ...(data.pages ? { pages: data.pages.replace('-', '--') } : {}),
    ...(data.doi ? { doi: data.doi } : {}),
    url: data.url,
  };
  return `@${kind}{${id},\n${Object.entries(fields).map(([key, value]) => `  ${key} = {${value}}`).join(',\n')}\n}`;
}

export function termLabel(term: string) {
  const [year, season] = term.split('-');
  return `${season.charAt(0).toUpperCase()}${season.slice(1)} ${year}`;
}
