// GitHub Pages sirve el sitio bajo un subdirectorio (/strong-satellite/,
// configurado como `base` en astro.config.mjs). Los links con "/museos" a
// secas ignoran ese prefijo, así que hay que armarlos con esta función.
export function ruta(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}${path}`;
}
