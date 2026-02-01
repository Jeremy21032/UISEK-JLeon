# Portal Estudiantil UISEK Ecuador - Accesible e Inclusivo

## 👤 Autor

**Jeremy Leon**

---

## 🌐 Previsualización

**[https://uisek-j-leon.vercel.app/](https://uisek-j-leon.vercel.app/)**

---

## 📋 Descripción

Portal web estudiantil para la Universidad Internacional SEK (UISEK) Ecuador, con enfoque en **accesibilidad e inclusión digital** (WCAG 2.1 nivel AA). Incluye página de inicio, oferta académica, admisiones, formularios de postulación y panel de accesibilidad (tamaño de texto, alto contraste, reducir animaciones).

**Principios:** diseño minimalista (3 colores), mobile first, Bootstrap 5, HTML5 semántico.

---

## ✅ Accesibilidad implementada

| Criterio | Implementación |
|----------|----------------|
| Etiquetas semánticas | `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` |
| Contraste | Paleta cumple WCAG AA/AAA (ej. texto/fondo 18.6:1) |
| Imágenes | Todas con `alt` descriptivo; decorativas con `aria-hidden` |
| Formularios | Labels asociados, `aria-required`, validación en tiempo real |
| Teclado | Tab ordenado, skip links, foco visible 3px, Escape cierra modales |
| Títulos | Jerarquía h1–h6 correcta |
| Enlaces/botones | Textos descriptivos; sin “clic aquí” |
| Legibilidad | Fuente mínima 16px, line-height 1.6, ancho de línea ≤75ch |

**Panel de accesibilidad** (esquina inferior derecha): tamaño de fuente (3 niveles), alto contraste, reducir animaciones. Preferencias guardadas en el navegador.

---

## 🛠️ Tecnologías

| Icono | Tecnología |
|:---:|---|
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | React 18 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | TypeScript |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Vite |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white) | Bootstrap 5 |
| ![Bootstrap Icons](https://img.shields.io/badge/Bootstrap_Icons-7952B3?style=flat-square&logo=bootstrap&logoColor=white) | Bootstrap Icons |

Enlaces centralizados en `src/config/links.ts`.

---

## 🚀 Uso del proyecto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

---

## 🌐 Despliegue (Vercel)

- **Con repositorio:** [vercel.com](https://vercel.com) → Add New → Project → importar repo. Build y output se detectan (Vite).
- **CLI:** `npm i -g vercel` → `vercel` → `vercel --prod` para producción.

El proyecto incluye `vercel.json` con la configuración necesaria.

---

## 📚 Referencias

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [UISEK Ecuador](https://uisek.edu.ec/)

---

## 📄 Licencia

Proyecto educativo - 2026
