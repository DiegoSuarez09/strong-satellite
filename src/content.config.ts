import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const museos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/museos' }),
  schema: z.object({
    nombre: z.string(),
    categoria: z.enum(['museo', 'gastronomia', 'alojamiento']),
    descripcion: z.string(),
    horario: z.string(),
    rating: z.number(),
    lat: z.number(),
    lng: z.number(),
    foto: z.string().optional(),
  }),
});

export const collections = { museos };
