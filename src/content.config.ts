import { defineCollection, reference, z } from 'astro:content';
import { file } from 'astro/loaders';

const publications = defineCollection({
  loader: file('src/data/publications.json'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number().int(),
    type: z.enum(['conference', 'journal', 'preprint']),
    url: z.string().url(),
    doi: z.string().optional(),
    pdf: z.string().url().optional(),
    code: z.string().url().optional(),
    pages: z.string().optional(),
    note: z.string().optional(),
    summary: z.string(),
    selected: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const research = defineCollection({
  loader: file('src/data/research.json'),
  schema: z.object({
    title: z.string(),
    question: z.string(),
    description: z.string(),
    publications: z.array(reference('publications')).default([]),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    context: z.string(),
    technologies: z.array(z.string()),
    repository: z.string().url().optional(),
    publication: reference('publications').optional(),
    research: reference('research').optional(),
    selected: z.boolean().default(false),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

const teaching = defineCollection({
  loader: file('src/data/teaching.json'),
  schema: z.object({
    course: z.string(),
    role: z.string(),
    institution: z.string(),
    term: z.string().regex(/^\d{4}-(spring|summer|fall)$/),
    draft: z.boolean().default(false),
  }),
});

export const collections = { publications, research, projects, teaching };
