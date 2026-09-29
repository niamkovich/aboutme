import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional().default(false),
    ogImage: z.string().optional(),
    /** Posts aren't translated — this sets that post's <html lang>. Belarusian
     *  is the site's main language; set 'en' only for a post actually written
     *  in English. Site chrome (nav, breadcrumbs) always stays Belarusian. */
    lang: z.enum(['be', 'en']).default('be'),
  }),
});

export const collections = { blog };
