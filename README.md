# Portal Estudiantil UISEK Ecuador - Accesible e Inclusivo

## 👤 Autor
**Jeremy Leon**

---

## 🌐 Previsualización

**[https://uisek-j-leon.vercel.app/](https://uisek-j-leon.vercel.app/)**

---

## 📋 Descripción

Portal web estudiantil para la Universidad Internacional SEK (UISEK) Ecuador, con enfoque en **accesibilidad e inclusión digital** (WCAG 2.1 nivel AA). Incluye:

- **Página de inicio** con hero, servicios estudiantiles, oferta académica, portales, noticias y contacto.
- **Oferta académica** (`#oferta-academica`): programas por categoría (pregrado, posgrado, online, educación continua, idiomas, webinars).
- **Admisiones** (`#admisiones`).
- **Formulario de postulación** (modal «Postular ahora») y **panel de accesibilidad** (tamaño de texto, alto contraste, reducir animaciones).
- **Experimento de eye-tracking** integrado: 3 tareas aleatorias, 90 segundos de captura, descarga del mapa de calor en PNG.

**Principios:** diseño minimalista (3 colores), mobile first, Bootstrap 5, HTML5 semántico. El enlace «Contacto» del header lleva a la sección de contacto del footer (`#contacto-footer`).

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

<table>
  <tr>
    <td align="center" width="33%">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="React"/>
      <br/><br/>
      <b>React 18</b>
    </td>
    <td align="center" width="33%">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript"/>
      <br/><br/>
      <b>TypeScript</b>
    </td>
    <td align="center" width="33%">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="48" height="48" alt="Vite"/>
      <br/><br/>
      <b>Vite</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" width="48" height="48" alt="Bootstrap"/>
      <br/><br/>
      <b>Bootstrap 5</b>
    </td>
    <td align="center" width="33%">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" width="48" height="48" alt="Bootstrap Icons"/>
      <br/><br/>
      <b>Bootstrap Icons</b>
    </td>
    <td align="center" width="33%"></td>
  </tr>
</table>

Enlaces centralizados en `src/config/links.ts`. Para el experimento de eye-tracking se usan **WebGazer** (seguimiento de mirada por webcam) y **Heatmap.js** (visualización); la exportación del mapa de calor a PNG se hace con un canvas propio en la app.

---

## 👁️ Experimento de Eye-Tracking

### Objetivo

Evaluar **dónde miran los usuarios** mientras realizan tareas concretas en el portal (formulario de inscripción, búsqueda de una carrera en la oferta académica, datos de contacto). Los datos de mirada permiten contrastar la intención del diseño con el comportamiento visual real y proponer mejoras de usabilidad basadas en evidencia.

### Cómo funciona

1. El usuario hace clic en **«Participar en experimento»** (header) o en **«Iniciar experimento»** en la sección del experimento (home).
2. Se asigna **una tarea al azar** entre tres:
   - **Formulario de inscripción:** buscar el formulario en la página, completarlo y hacer clic en «Enviar solicitud».
   - **Oferta académica:** ir a la página de oferta académica y buscar **una carrera concreta** (elegida al azar de la lista de programas, p. ej. «Derecho», «Ingeniería de Software»). La lista está en `src/config/carrerasOferta.ts`.
   - **Datos de contacto:** encontrar la sección de contacto (el enlace «Contacto» del header lleva al footer).
3. Se solicita **permiso de cámara**; al aceptar, WebGazer empieza a registrar la mirada.
4. El usuario dispone de **90 segundos** para realizar la tarea. Puede navegar por el portal (p. ej. a `#oferta-academica`); WebGazer sigue activo y el header no se duplica gracias al modo incrustado de la página de oferta.
5. Al terminar los 90 s aparece un **modal «Experimento finalizado»**: el mapa de calor no se muestra en pantalla; el usuario puede **generar y descargar** el PNG del mapa de calor y ver una **vista previa** en el mismo modal.

### Tecnología: WebGazer y mapa de calor

- **WebGazer** (`src/eye-tracking/useWebGazer.js`): estima la posición de la mirada (x, y) con la webcam en el navegador. El hook **`useWebGazer`** guarda cada predicción en **`gazeData`** (array de `{ x, y }`) y expone **`start()`**, **`stop()`**, **`end()`** y **`clearGazeData()`**. La captura dura **90 segundos** por sesión.

- **Mapa de calor:**  
  - En pantalla no se dibuja el heatmap durante la navegación.  
  - Al finalizar, el PNG se genera con un **canvas propio** en `App.tsx` (función **`exportHeatmapToPNG`**): se normalizan las coordenadas al viewport, se dibuja un mapa de calor (gradiente azul → verde → amarillo → rojo) y se devuelve un data URL para descarga.  
  - El hook **`useHeatmap`** (`src/eye-tracking/useHeatmap.js`) usa Heatmap.js para el contenedor oculto del experimento; la exportación a PNG evita dependencias problemáticas (p. ej. `ImageData.data` de solo lectura en algunos navegadores).

- **Componente** **`EyeTrackingExperiment`** (`src/eye-tracking/EyeTrackingExperiment.jsx`): orquesta WebGazer y la tarea; al iniciar asigna la tarea aleatoria (y, si es «Oferta académica», una carrera al azar con **`getCarreraAlAzar()`** desde `src/config/carrerasOferta.ts`).

### Navegación durante el experimento

Si la tarea es «Oferta académica», el usuario puede ir a `#oferta-academica`. La app mantiene un **único layout** (header de App + bloque del experimento + contenido de la página): la página de oferta se renderiza con la prop **`embedded`** para no mostrar su propia barra de navegación y evitar headers duplicados. WebGazer sigue registrando la mirada en esa página.

### Interpretación del heatmap

- **Zonas calientes (rojo/naranja):** más fijaciones / mayor atención.
- **Zonas frías (azul):** menos atención.
- Sirve para comprobar si los elementos clave de cada tarea (formulario, carrera en oferta, contacto) reciben la atención esperada y para proponer mejoras de jerarquía visual y ubicación.

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
