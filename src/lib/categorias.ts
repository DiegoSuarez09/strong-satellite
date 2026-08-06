export const CATEGORIAS = [
	{ id: 'museo', label: 'Museos', icono: '🏛️' },
	{ id: 'gastronomia', label: 'Gastronomía', icono: '🍽️' },
	{ id: 'alojamiento', label: 'Alojamientos', icono: '🛏️' },
] as const;

export type CategoriaId = (typeof CATEGORIAS)[number]['id'];

export function etiquetaCategoria(id: string): string {
	return CATEGORIAS.find((c) => c.id === id)?.label ?? id;
}

export function iconoCategoria(id: string): string {
	return CATEGORIAS.find((c) => c.id === id)?.icono ?? '📍';
}
