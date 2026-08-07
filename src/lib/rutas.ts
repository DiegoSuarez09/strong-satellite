// GitHub Pages sirve el sitio bajo un subdirectorio (/strong-satellite/,
// configurado como `base` en astro.config.mjs). Los links con "/museos" a
// secas ignoran ese prefijo, así que hay que armarlos con esta función.
export function ruta(path: string): string {
	// BASE_URL siempre trae "/" al final (ej: "/strong-satellite/"); se lo
	// sacamos para no terminar con "//" al pegarlo con el path recibido.
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}${path}`;
}
