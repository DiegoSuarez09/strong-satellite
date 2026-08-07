# Turismo Concepción — Documentación del proyecto

Sitio web de turismo para **Concepción del Yaguareté Corá, Corrientes, Argentina**.
Directorio de lugares (museos, gastronomía, alojamientos) con mapa interactivo.

**Doble objetivo:** web real y útil para la comunidad + proyecto de portfolio.

> Estado: en construcción. Este documento refleja lo que existe hoy y marca lo
> pendiente como tal. Se va actualizando a medida que avanza el proyecto.

---

## Objetivos

- Que la gente encuentre en Google los museos, la gastronomía y los alojamientos
  del pueblo (SEO como prioridad real, no decorativa).
- Cero costo de infraestructura: no gastar dinero en desplegar ni mantener.
- Servir como pieza de portfolio que demuestre criterio de ingeniería.
- Que el dueño aprenda desarrollo web construyéndolo él mismo.

---

## Stack y por qué

| Pieza | Elección | Motivo |
|-------|----------|--------|
| Framework | **Astro** | Sitio de contenido, no app. Entrega HTML estático con JS mínimo. Ideal para SEO y rendimiento. |
| Mapa | **Leaflet + OpenStreetMap** | Gratis, sin API key, sin límites, sin tarjeta. Evita cobros sorpresa de Google Maps. |
| Datos | **Archivos Markdown** (content collections) | Sin base de datos. Sumar un lugar = agregar un archivo. Mantiene el sitio 100% estático. |
| Hosting | **GitHub Pages** | Gratis para siempre para sitios estáticos. |
| Deploy | **GitHub Actions** | Automático en cada push. Suma CI/CD al portfolio. |

### Decisiones descartadas (y por qué)

- **Google Maps JS API:** requiere tarjeta de crédito y puede generar cobros si
  el sitio recibe tráfico. Leaflet + OSM no cobra nunca.
- **React / Next.js:** pensados para aplicaciones interactivas. Para un sitio de
  contenido traen peso y complejidad innecesarios y peor SEO por defecto. Astro
  igual permite usar componentes React en "islas" si hiciera falta.
- **Vanilla puro (sin framework):** viable, pero con varias categorías y páginas
  obliga a repetir HTML a mano y complica el SEO por página. Astro genera las
  páginas desde los datos.
- **Base de datos / backend:** innecesario para este volumen. Rompería el modelo
  estático y el costo cero.

---

## Arquitectura (planificada)

Pensado en capas:

- **Datos:** una carpeta con un archivo por lugar (nombre, coordenadas, categoría,
  descripción, horarios, foto, rating). Esquema validado.
- **Presentación:** páginas generadas desde esos datos. Home con mapa general,
  una página por categoría, y una página de detalle por lugar (clave para SEO:
  cada lugar con su URL indexable).
- **Interactividad:** el mapa Leaflet es la única "isla" que usa JavaScript en el
  cliente. El resto es HTML estático.

### Concepto clave de Astro: arquitectura de islas

La mayoría de la página se sirve como HTML estático rápido; solo los componentes
que necesitan interactividad (el mapa) se "hidratan" con JavaScript. Esto evita
mandar un framework entero al navegador de cada visitante.

### Ruteo por archivos

En Astro, cada archivo dentro de `src/pages/` se convierte en una ruta del sitio.
`src/pages/index.astro` es la home (`/`); `src/pages/museos.astro` sería `/museos`.
La estructura de carpetas ES el mapa de URLs.

### Anatomía de un archivo `.astro`

Dos partes: arriba, entre `---` (frontmatter), va JavaScript que corre al construir
la página (leer datos, importar). Abajo va el HTML, que puede usar esas variables.

---

## Categorías

Cuatro: **museo**, **gastronomía**, **alojamiento** y **punto_interes**
(agregada el 2026-08-07 a pedido del dueño, para plazas/monumentos/miradores
que no encajan en las otras tres). De arranque se cargaron los 3 museos
reales; gastronomía, alojamientos y puntos de interés quedan pendientes de
cargar con datos investigados (mismo criterio que los museos).

Agregar una categoría implica tocar **dos archivos sincronizados a mano**:
el enum `categoria` en `content.config.ts` (que valida los `.md`) y el array
`CATEGORIAS` en `src/lib/categorias.ts` (que controla botones de filtro,
íconos y qué página `/[categoria]` se genera). No hay validación cruzada
entre ambos.

### Los 3 museos (datos base)

- **Museo Histórico Manuel Belgrano** — en la primera iglesia del pueblo.
  Horarios 9-11 y 16-18. Rating 4.7.
- **Museo del Campo** — tradiciones rurales, sede de la Fiesta del Puestero.
  Rating 4.5.
- **Museo de La Pilarcita** — +400 muñecas, entrada libre, lunes cerrado.
  Rating 4.4.

### Listado completo de lugares por cargar

Relevamiento que trajo el dueño el 2026-08-07 (46 lugares en total). Se tacha
cada uno a medida que su `.md` queda cargado en `src/content/museos/`.

**Museos y centro de interpretación:**
- [x] Museo Histórico General Manuel Belgrano (`belgrano.md`)
- [x] Museo La Pilarcita (`la-pilarcita.md`)
- [x] Museo de Campo (`del-campo.md`)
- [x] Museo de la Policía de Corrientes y Centro de Interpretación de Poblados
      Históricos (`museo-policia.md`) — sin foto ni rating verificados.
- [x] Centro de Interpretación de Iberá (`centro-interpretacion-ibera.md`) —
      sin horario oficial confirmado ni foto/rating; queda con nota para
      consultar en la Oficina de Informes Turísticos.

**Puntos de interés** (categoría `punto_interes`, agregada 2026-08-07) — 19/20
cargados vía el método de Google Maps:
- [x] Predio Terminal de Ómnibus (`terminal-omnibus.md`)
- [x] Oficina de Informes Turísticos (`oficina-informes-turisticos.md`)
- [x] Hospital Inmaculada Concepción del Yaguareté Corá (`hospital-inmaculada-concepcion.md`) — sin foto (Google Maps no tiene ninguna cargada).
- [x] Policía / Comisaría de Concepción del Yaguareté Corá (`comisaria-concepcion.md`) — coordenadas aproximadas (no se pudo abrir su ficha completa en Maps, se estimaron por posición relativa a la Municipalidad).
- [ ] **Policía Rural de Concepción del Yaguareté Corá** — no se encontró una ficha propia en Google Maps (el único "Destacamento Rural" que aparece está a 30 km, en otra localidad). Pendiente de datos manuales o de descartar.
- [x] Bomberos Voluntarios de Concepción del Yaguareté Corá (`bomberos-voluntarios.md`) — **atención:** Google Maps lo marca como "cerrado permanentemente"; confirmar si sigue en funcionamiento antes de dar el dato por bueno.
- [x] Banco de Corrientes y Cajero Link (`banco-de-corrientes.md`)
- [x] Municipalidad de Concepción del Yaguareté Corá (`municipalidad.md`)
- [x] Sucursal Correo Argentino (`correo-argentino.md`)
- [x] Farmacia Red Farmacentro (`farmacia-red-farmacentro.md`)
- [x] Farmacia Concepción (`farmacia-concepcion.md`)
- [x] Parroquia Inmaculada Concepción (`parroquia-inmaculada-concepcion.md`)
- [x] Plazoleta Manuel Ramírez (`plazoleta-manuel-ramirez.md`) — coordenadas aproximadas.
- [x] Paseo Sosa Osvaldo Cordero (`paseo-osvaldo-sosa.md`)
- [x] Plaza San Martín (`plaza-san-martin.md`)
- [x] Plaza Tambor de Tacuarí (`plaza-tambor-de-tacuari.md`)
- [x] Club Social y Deportivo Concepción (`club-social-deportivo.md`)
- [x] Cancha de Fútbol Municipal (`cancha-futbol-municipal.md`)
- [x] Predio Camping Municipal (`camping-municipal.md`)
- [x] Predio del Peón Rural (`predio-peon-rural.md`) — encontrado de casualidad buscando "Policía Rural"; muy bien documentado (77 reseñas), gratuito, junto a los Esteros del Iberá.

**Gastronomía** — datos sacados de Google Maps (rating, dirección, horario,
coordenadas y foto de portada), ver método abajo:
- [x] Comedor los Tres Hermanos (`comedor-tres-hermanos.md`)
- [x] Hamburguesería Williams (`hamburgueseria-williams.md`)
- [x] INGA Café y Helados (`inga-cafe-helados.md`)
- [x] Yacaru Porã de Reina Sandoval (`yacaru-pora.md`) — historia propia,
      fuente LA NACION en vez de Google Maps.
- [x] Restaurante Estilo (`restaurante-estilo.md`)
- [x] Pizzería el Gauchito (`pizzeria-el-gauchito.md`)
- [x] Alfajores AVA (`alfajores-ava.md`)
- [x] Cassiabreak (`casia-break.md`) — sin foto ni rating (el negocio no
      tiene ninguno cargado en Google Maps todavía).

**Hospedajes, cabañas y posadas** — 11/13 cargados vía Google Maps:
- [x] La Cabaña de Letty (`cabana-letty.md`)
- [x] Cabañas Don Oriol (`cabanas-don-oriol.md`)
- [x] La Alondra'i (`la-alondra-i.md`)
- [x] Pousada Nido de Pájaros (`posada-nido-pajaros.md`)
- [x] Cabañas Puerto Iberá (`cabanas-puerto-ibera.md`)
- [x] Cabañas Iberá (`cabanas-ibera.md`)
- [x] Hospedaje Ñangapiri Tujá (`nangapiri-tuja.md`)
- [x] Hospedaje Sueños Dulces (`suenos-dulces.md`)
- [x] Hospedaje Arami (`hospedaje-aramy.md`)
- [x] Hospedaje Gauchito Gil (de Roberto Pérez) (`hospedaje-gauchito-gil.md`)
- [ ] **Hospedaje Nica** — no se encontró ficha propia en Google Maps.
- [ ] **Hospedaje el Jacarandá** — no se encontró ficha propia en Google Maps
      (aparece un "El Jacaranda Alojamiento Diario" sin reseñas ni dirección
      clara; no se pudo confirmar que sea el mismo lugar).
- [x] Hospedaje Teresita (de Chino López) (`hospedaje-teresita.md`)

**Pendiente de decidir antes de cargar puntos de interés** (ver conversación
2026-08-07): el schema exige `rating` como campo obligatorio (pensado para
atractivos turísticos), pero varios puntos de interés son infraestructura de
servicio (hospital, comisaría, bomberos, banco, correo, municipalidad) sin
rating real de Google en muchos casos. Evaluar si `rating`/`resenas` pasan a
opcionales, o si esos casos puntuales llevan un valor "sin calificar".

---

## Funciones previstas

- Mapa interactivo con filtros por categoría.
- Página de detalle por lugar con botón "abrir en Google Maps" (link directo a
  la app de mapas del visitante, NO la API JS de pago).
- **PDF descargable** con mapa + fichas, para que el turista lo guarde o imprima.
- SEO: meta tags por página, Open Graph (para compartir en WhatsApp), sitemap,
  datos estructurados schema.org.
- Accesibilidad (teclado, contraste, alt text) y objetivo Lighthouse ~100.

---

## Identidad visual

- Verde `#1e6b52` / verde oscuro `#134736` (naturaleza correntina).
- Arena `#f4efe4` (fondo). Tierra `#8a5a2b` (acentos).
- Texto `#2a2a26`, gris `#6b6b63`.
- Tono cálido y local, no corporativo genérico.
- Idioma español (Argentina), voseo en la UI.

---

## Notas de contenido

Muchos museos y comercios cierran al mediodía por la siesta y el calor. Mostrar
horarios de forma clara y considerar un aviso general para los visitantes.

---

## Recap — lo hecho hasta ahora

1. **Definición del proyecto:** stack, objetivos, categorías, hosting y modelo
   de datos decididos y justificados (ver tablas de arriba).
2. **Entorno:** Node.js actualizado a la versión 24 (LTS) en Windows. La versión
   previa (20) no alcanzaba para el creador de Astro, que pide Node 22+.
3. **Proyecto Astro inicializado** con `npm create astro@latest`, plantilla
   mínima (vacía, a propósito, para construir entendiendo cada pieza).
   - Nombre de carpeta generado: `strong-satellite` (provisorio, se puede
     renombrar; no afecta el funcionamiento).
   - Dependencias instaladas y verificadas (`npm install` → 0 vulnerabilidades).
4. **Servidor de desarrollo corriendo** con `npm run dev` en `localhost:4321`.
   Página de bienvenida de Astro visible en el navegador.
5. **Ciclo de trabajo verificado:** editar un `.astro` → guardar → el navegador
   recarga solo (hot reload del dev server).
6. **Ruteo por archivos:** cada archivo en `src/pages/` es una ruta. Se creó
   `src/pages/museos.astro` (`/museos`) como práctica junto al `index.astro`
   existente (`/`).
7. **Layout compartido:** `src/layouts/Layout.astro` centraliza el `<html>`/
   `<head>` común (favicon, viewport, generator) y expone un `<slot />` para
   que cada página inyecte su contenido. `index.astro` y `museos.astro` ya lo
   usan.
8. **Content collection de museos:** `src/content.config.ts` define la
   colección `museos` con loader `glob` (lee `src/content/museos/**/*.md`) y
   schema `zod` con 10 campos: `nombre`, `categoria` (enum museo/gastronomia/
   alojamiento), `descripcion`, `horario`, `rating`, `lat`, `lng`, `foto`
   (opcional), `direccion` (opcional), `entrada` (opcional) y `fuente` (URL
   opcional, para citar de dónde sale el dato). Nota técnica: en Astro 7 el
   helper `z` se importa desde `astro/zod`, no desde `astro:content` (ese
   re-export quedó deprecado).
9. **Datos de los 3 museos** en `src/content/museos/` (`belgrano.md`,
   `del-campo.md`, `la-pilarcita.md`), investigados en fuentes oficiales
   (Instituto de Cultura de Corrientes, Ministerio de Turismo de Corrientes) el
   2026-08-05: descripción, horario y (para Belgrano) dirección real, con link
   a la fuente en cada archivo.
   - **Coordenadas:** las originales apuntaban ~15 km al sur del pueblo real
     (placeholder erróneo). Se corrigieron una vez con Nominatim/OSM (zona
     aproximada) y después se reemplazaron por coordenadas de precisión GPS
     (7 decimales) que trajo el usuario desde un archivo con datos de Google
     Places — verificadas en el mapa, caen justo sobre el pueblo.
   - **Fotos:** se linkean en vivo a URLs de Google Places
     (`lh3.googleusercontent.com/place-photos/...`), verificadas manualmente
     (devuelven JPEG real). Decisión consciente del dueño: no descargarlas al
     repo. Riesgo aceptado: si Google invalida esas URLs en el futuro, la
     ficha se queda sin foto (cae al ícono de categoría, no rompe la página) y
     hay que reemplazarlas.
   - **Horarios con fuentes en conflicto:** para "Museo del Campo" y "Museo de
     La Pilarcita", el archivo con datos de Google Places trae horarios
     ligeramente distintos a los de la fuente oficial (Instituto de Cultura).
     Se priorizó la fuente oficial citada en `fuente`, excepto en "Museo del
     Campo" (que no tenía horario oficial) donde se usó el dato aproximado de
     Google con una aclaración de que no está confirmado. Convendría llamar al
     Instituto de Cultura (0379 423-0640 / 431-8800) para confirmar los tres.
   - **Campo `resenas`** (opcional, cantidad de reseñas de Google) sumado al
     schema para mostrar "4.7 ★ (47)" en tarjetas, detalle y popup del mapa.
10. **Home con mapa Leaflet interactivo** (`src/pages/index.astro`): botones de
    categoría a la izquierda, mapa arriba, fichas debajo. Los botones cambian
    tanto la capa de marcadores visible en el mapa como la lista de fichas
    (todo con una capa fina de JS vainilla, sin framework de UI).
    - **Dos bugs de Leaflet + Vite/Astro resueltos:** (1) Astro convierte las
      imágenes importadas en objetos con metadata en vez de strings de URL —
      hay que importarlas con el sufijo `?url` para que Vite devuelva el string
      plano. (2) `L.Icon.Default` de Leaflet siempre antepone una ruta
      auto-detectada a la URL del ícono, incluso si ya le pasás una completa —
      hay que hacer `delete L.Icon.Default.prototype._getIconUrl` antes de
      fijar las URLs con `mergeOptions`. Sin estos dos ajustes los marcadores
      se ven como ícono roto.
    - El popup de cada marcador (al hacer click en el mapa) muestra nombre,
      rating con reseñas y horario, no solo el nombre.
11. **Componente `TarjetaLugar.astro`** (`src/components/`): la tarjeta de
    lugar (foto con rating superpuesto, meta con íconos de horario/entrada)
    estaba duplicada en `/museos` y en la home; se extrajo a un componente
    único que ambas páginas importan.
12. **Deploy a GitHub Pages funcionando**, publicado en
    `https://diegosuarez09.github.io/strong-satellite/`. El primer intento
    del workflow falló porque `withastro/action@v3` usa Node 20 por default y
    Astro pide Node ≥22.12 — se resolvió agregando `node-version: 22` al paso
    del Action.
13. **Página dinámica por categoría** (`src/pages/[categoria].astro`),
    reemplaza a `museos.astro`. Con `getStaticPaths()` genera una URL por
    cada entrada de `CATEGORIAS` (`/museo`, `/gastronomia`, `/alojamiento`,
    `/punto_interes`) sin escribir un archivo por categoría a mano — mismo
    patrón que ya usaba `[slug].astro` para el detalle de cada lugar.
    - **Bug de raíz que motivó el cambio:** `museos.astro` hacía
      `getCollection('museos')` y listaba todo sin filtrar por `categoria`
      ('museos' ahí era el nombre de la colección/carpeta de datos, no un
      filtro). Con una sola categoría cargada no se notaba, pero en cuanto se
      sumaran gastronomía/alojamientos iba a mezclar todo bajo el título
      "Museos". La página nueva filtra explícitamente por categoría.
    - El nav de `Layout.astro` y el link "← Volver" de `[slug].astro` (antes
      apuntaban fijo a `/museos`) ahora se generan/resuelven a partir de
      `CATEGORIAS` y de la categoría propia del lugar, respectivamente.
    - Código comentado en todo el proyecto a pedido del dueño (2026-08-07),
      para que sirva de referencia además de funcionar.
14. **Método de carga de datos vía Google Maps** (descubierto 2026-08-07,
    con los 8 de gastronomía): en vez de que el dueño busque coordenadas a
    mano, la IA usa control de navegador (Chrome) para buscar cada lugar en
    Google Maps y sacar de la ficha: rating, reseñas, dirección, horario,
    teléfono, coordenadas exactas (del URL del pin) y hasta la URL de la
    foto de portada (mismo criterio que las fotos de museos: se enlaza en
    vivo a `googleusercontent.com`, no se descarga). Mucho más rápido y
    preciso que buscar a mano o que la IA adivine por búsqueda web. `fuente`
    en estos casos cita el link de búsqueda de Google Maps usado (no hay
    fuente "oficial" para negocios chicos). Método reusado para cargar los
    43 lugares de las 4 categorías (recap punto 15).
15. **Relevamiento completo cargado** (2026-08-07): 43 de 46 lugares del
    listado que trajo el dueño (ver checklist en "Listado completo de
    lugares por cargar"). Quedaron 3 sin ficha propia en Google Maps
    (Policía Rural, Hospedaje Nica, Hospedaje el Jacarandá).
    - **Bug encontrado y corregido en el botón "Abrir en Google Maps"**
      (`[slug].astro`): armaba el link solo con `query=lat,lng`, lo que abre
      un pin genérico sin ficha del negocio. Se cambió a `nombre + dirección`
      cuando hay dirección cargada (Google engancha bien con la ficha real);
      si no hay dirección, se usa el fallback anterior (`lat,lng` puro) para
      no arriesgar que el texto del nombre lleve a otro lugar con el mismo
      nombre en otro pueblo (pasó con "Hospedaje Gauchito Gil").
    - **Bug de CSS encontrado y corregido en la home** (`index.astro`): la
      regla `.lugares { display: grid }` tenía la misma especificidad que el
      `display: none` que el navegador aplica por defecto al atributo
      `hidden`, y el CSS del autor le gana al del navegador en un empate —
      entonces las 4 listas de fichas se veían todas apiladas sin importar
      el botón de categoría activo (no se notaba con pocos lugares, saltó a
      la vista con 43 cargados). Se agregó `.lugares[hidden] { display: none; }`
      explícito para resolverlo.

### Comandos aprendidos

- `node --version` — ver versión de Node instalada.
- `npm create astro@latest` — crear un proyecto Astro nuevo (asistente interactivo).
- `npm install` — instalar/verificar las dependencias del proyecto.
- `npm run dev` — levantar el servidor de desarrollo (se frena con `q` + Enter
  o `Ctrl+C`).
- `npm run build` — compilar el sitio final para producción (a `dist/`).
- `npm run preview` — servir localmente el resultado de `npm run build`, para
  probar el sitio tal como queda publicado (con el `base` de GitHub Pages
  incluido), antes de subirlo.

---

## Próximos pasos

- [x] Recorrer y afianzar la estructura de carpetas.
- [x] Definir la estructura de páginas y armar la primera propia.
- [x] Modelar los datos de un lugar (esquema) y cargar los 3 museos, con datos
      investigados en fuentes oficiales (falta horario de Museo del Campo,
      ver recap).
- [x] Fichas de detalle debajo del mapa, leyendo la colección `museos` con
      `getCollection`.
- [x] Home con el mapa Leaflet (primera isla) mostrando los puntos de la
      colección `museos`, con filtro por categoría (botones a la izquierda).
- [x] Página de detalle por lugar (`/museos/[slug]`, con `getStaticPaths`),
      con botón a Google Maps.
- [x] **Cargar gastronomía, alojamientos y puntos de interés** (pedido del
      dueño el 2026-08-05). 46 lugares relevados, 43 cargados (ver checklist
      completo en "Listado completo de lugares por cargar" más arriba); 3
      pendientes por no tener ficha propia en Google Maps (Policía Rural,
      Hospedaje Nica, Hospedaje el Jacarandá). Sigue pendiente renombrar la
      carpeta `src/content/museos/` a algo más genérico, ya tiene más que
      museos.
- [x] Páginas propias por categoría (`/[categoria]`, con `getStaticPaths`,
      reemplaza a la vieja `museos.astro`).
- [ ] SEO (meta tags, Open Graph, sitemap, schema.org).
- [ ] PDF descargable.
- [x] Configurar `astro.config.mjs` para GitHub Pages (`site` y `base`) y el
      workflow de GitHub Actions (`.github/workflows/deploy.yml`, usa
      `withastro/action`). Sitio publicado en
      `https://diegosuarez09.github.io/strong-satellite/`.
      **Nota técnica:** como el sitio no vive en la raíz del dominio, todos
      los links internos (nav, tarjetas, botón "volver") se arman con el
      helper `ruta()` de `src/lib/rutas.ts`, que antepone
      `import.meta.env.BASE_URL`. Un link nuevo escrito como `href="/museos"`
      a mano se rompe en producción — siempre usar `ruta('/museos')`.
- [ ] Pulido: responsive, accesibilidad, Lighthouse, README con capturas.
