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

Tres desde el inicio: **museo**, **gastronomía**, **alojamiento**.
De arranque se cargan los 3 museos reales; gastronomía y alojamientos se suman
después con el mismo formato.

### Los 3 museos (datos base)

- **Museo Histórico Manuel Belgrano** — en la primera iglesia del pueblo.
  Horarios 9-11 y 16-18. Rating 4.7.
- **Museo del Campo** — tradiciones rurales, sede de la Fiesta del Puestero.
  Rating 4.5.
- **Museo de La Pilarcita** — +400 muñecas, entrada libre, lunes cerrado.
  Rating 4.4.

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

### Comandos aprendidos

- `node --version` — ver versión de Node instalada.
- `npm create astro@latest` — crear un proyecto Astro nuevo (asistente interactivo).
- `npm install` — instalar/verificar las dependencias del proyecto.
- `npm run dev` — levantar el servidor de desarrollo (se frena con `q` + Enter
  o `Ctrl+C`).
- `npm run build` — (pendiente de usar) compilar el sitio final para producción.

---

## Próximos pasos

- [ ] Recorrer y afianzar la estructura de carpetas.
- [ ] Definir la estructura de páginas y armar la primera propia.
- [ ] Modelar los datos de un lugar (esquema) y cargar los 3 museos.
- [ ] Home con el mapa Leaflet (primera isla).
- [ ] Páginas por categoría y de detalle.
- [ ] SEO (meta tags, Open Graph, sitemap, schema.org).
- [ ] PDF descargable.
- [ ] Configurar `astro.config.mjs` para GitHub Pages (`site` y `base`) y el
      workflow de GitHub Actions.
- [ ] Pulido: responsive, accesibilidad, Lighthouse, README con capturas.
