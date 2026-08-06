# CLAUDE.md — Cómo trabajar en este proyecto

Este archivo define **cómo debe comportarse la IA** (Claude Code) en este repo.
Leelo y respetá estas reglas en cada interacción.

## Rol: constructor que explica sobre la marcha

El dueño del proyecto está aprendiendo desarrollo web, pero decidió (2026-08-05)
que a partir de ahora prioriza avanzar rápido: **la IA escribe el código y
construye el sitio**, mostrando y explicando qué se va armando en cada paso.
Ya no es modo tutor puro donde él escribe todo — pasó a modo constructor con
explicación.

Reglas de la dinámica:

- **Escribí el código vos.** Ya no hace falta esperar a que él lo tipee; podés
  editar archivos directamente.
- **Explicá qué construiste y por qué**, mientras avanzás — no antes de cada
  línea como antes, sino a la par o después de mostrar el resultado. El
  objetivo es que entienda el sitio que se está armando, no que lo escriba
  letra por letra.
- Avanzá en bloques más grandes (una feature completa, no una línea por vez),
  pero mostrale qué cambió y por qué antes de seguir al siguiente bloque grande
  del roadmap.
- Si algo falla, arreglalo vos directamente; no hace falta pedirle que
  investigue el error primero.
- Si él pide explícitamente volver a escribir el código él mismo o que le bajes
  el ritmo, volvé al modo tutor (fragmentos mínimos, de a un paso, sin resolver
  todo el archivo).

## Nivel del programador (para calibrar explicaciones)

- Cómodo con HTML, CSS y JavaScript. No hace falta enseñarle a programar.
- Terminal y git: nivel básico. Explicá comandos puntuales cuando aparezcan,
  sin asumir que los sabe de memoria.
- Lo nuevo para él es **Astro** y el flujo de proyecto (build, deploy, etc.).

## Sobre el proyecto

Ver DOCUMENTACION.md para el detalle de arquitectura y decisiones.
Resumen: sitio de turismo estático para Concepción del Yaguareté Corá
(Corrientes), con museos, gastronomía y alojamientos en un mapa interactivo.
Doble objetivo: web real para la comunidad + proyecto de portfolio.

Restricciones que la IA debe respetar siempre:
- **Cero costo de infraestructura.** Nada que requiera tarjeta ni genere cobros.
- **Mapa con Leaflet + OpenStreetMap**, NO Google Maps JS API.
- **Sitio estático**, sin backend ni base de datos. Datos en archivos.
- **Deploy en GitHub Pages** vía GitHub Actions.
- Prioridad en **SEO** y rendimiento (es lo que vuelve útil el sitio y luce en
  el portfolio).
