// Lista de categorías que existen en el sitio. Cada `id` tiene que coincidir
// exacto con un valor del enum `categoria` en src/content.config.ts — son dos
// listas separadas que no se validan entre sí automáticamente.
// Este array maneja el orden y el contenido de: los botones de filtro de la
// home, las páginas /[categoria] y los íconos usados en tarjetas/mapa/detalle.
export const CATEGORIAS = [
	{ id: 'museo', label: 'Museos', icono: '🏛️' },
	{ id: 'gastronomia', label: 'Gastronomía', icono: '🍽️' },
	{ id: 'alojamiento', label: 'Alojamientos', icono: '🛏️' },
	{ id: 'punto_interes', label: 'Puntos de interés', icono: '🗺️' },
] as const;

// Tipo derivado del array de arriba: 'museo' | 'gastronomia' | 'alojamiento' | 'punto_interes'.
// Así, si mañana se agrega o saca una categoría acá, este tipo se actualiza solo.
export type CategoriaId = (typeof CATEGORIAS)[number]['id'];

// Busca el label legible de una categoría a partir de su id.
// El "?? id" es un respaldo: si el id no está en la lista, muestra el id tal
// cual en vez de romper.
export function etiquetaCategoria(id: string): string {
	return CATEGORIAS.find((c) => c.id === id)?.label ?? id;
}

// Igual que la de arriba, pero para el ícono. Si la categoría no está en la
// lista, cae en el pin genérico 📍.
export function iconoCategoria(id: string): string {
	return CATEGORIAS.find((c) => c.id === id)?.icono ?? '📍';
}
