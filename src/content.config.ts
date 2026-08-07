import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'; // En Astro 7 el helper `z` se importa desde acá (astro:content lo dejó deprecado).
import { glob } from 'astro/loaders';

// Colección "museos": a pesar del nombre, hoy guarda TODOS los lugares del
// sitio (museos, gastronomía, alojamientos, puntos de interés), diferenciados
// por el campo `categoria`. Queda pendiente renombrar la carpeta/colección
// a algo más genérico como "lugares" (ver DOCUMENTACION.md).
const museos = defineCollection({
	// El loader "glob" le dice a Astro que lea cada archivo .md dentro de
	// src/content/museos/ como una entrada de esta colección.
	loader: glob({ pattern: '**/*.md', base: './src/content/museos' }),

	// El schema valida, con Zod, que cada .md tenga estos campos con el tipo
	// correcto. Si un archivo no cumple, el build falla con un error claro
	// en vez de romper silenciosamente en producción.
	schema: z.object({
		nombre: z.string(),
		// enum: la categoría tiene que ser EXACTAMENTE uno de estos valores.
		// Agregar una categoría nueva implica sumarla acá y también a
		// CATEGORIAS en src/lib/categorias.ts (son dos listas separadas que
		// hay que mantener sincronizadas a mano).
		categoria: z.enum(['museo', 'gastronomia', 'alojamiento', 'punto_interes']),
		descripcion: z.string(),
		horario: z.string(),
		// Ambos opcionales: pensados para atractivos turísticos (museos,
		// gastronomía, alojamientos), pero varios "puntos de interés" son
		// infraestructura de servicio (hospital, comisaría, banco...) sin un
		// rating real de Google que tenga sentido mostrar.
		rating: z.number().optional(),
		resenas: z.number().optional(),
		lat: z.number(),
		lng: z.number(),
		foto: z.string().optional(), // URL de foto (hoy, enlazada en vivo a Google Places)
		direccion: z.string().optional(),
		entrada: z.string().optional(), // ej: "Libre y gratuita"
		fuente: z.url().optional(), // link a la fuente del dato, para citar de dónde sale
	}),
});

// Registra la colección con el nombre "museos" para que el resto del sitio
// pueda pedirla con getCollection('museos').
export const collections = { museos };
