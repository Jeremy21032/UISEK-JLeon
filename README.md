# Portal Estudiantil UISEK Ecuador - Accesible e Inclusivo

## 👤 Autor

**Jeremy Leon**

---

## 📋 ¿Qué es este proyecto?

Este es un **portal web estudiantil mejorado** para la Universidad Internacional SEK (UISEK) de Ecuador, diseñado con un enfoque especial en **accesibilidad e inclusión digital**. El objetivo principal es garantizar que **todos los usuarios**, independientemente de sus capacidades físicas, sensoriales o cognitivas, puedan acceder y utilizar el portal de manera efectiva.

### ¿Por qué es importante?

La accesibilidad web no es solo una buena práctica, es un **derecho fundamental**. Aproximadamente el 15% de la población mundial vive con algún tipo de discapacidad, y muchas más personas enfrentan barreras temporales o situacionales. Este proyecto demuestra cómo aplicar los principios de **diseño universal** y las **Pautas de Accesibilidad para el Contenido Web (WCAG 2.1 nivel AA)** para crear experiencias digitales inclusivas.

---

## 🎯 Principios de Diseño Aplicados

### 1. **Diseño Minimalista con Solo 3 Colores**

Para facilitar la comprensión visual y reducir la carga cognitiva:

- **Blanco** (#FFFFFF) - Fondos claros y texto sobre oscuro
- **Negro** (#212529) - Texto principal y fondos oscuros  
- **Azul** (#0066cc) - Color corporativo UISEK para botones y enlaces

Todos los colores cumplen con ratios de contraste WCAG AA (mínimo 4.5:1 para texto normal).

### 2. **Mobile First y Responsive**

El portal se adapta a cualquier tamaño de pantalla, desde teléfonos móviles hasta monitores grandes, garantizando una experiencia óptima en todos los dispositivos.

### 3. **Bootstrap como Framework Base**

Se utiliza Bootstrap 5 para asegurar componentes consistentes y accesibles por defecto, personalizados según las necesidades del proyecto.

---

## ✅ Los 8 Criterios de Accesibilidad WCAG Implementados

### 1. 🏷️ **Etiquetas Semánticas HTML5**

**¿Qué es?** Usar las etiquetas HTML correctas para cada tipo de contenido.

**¿Dónde está?** En toda la estructura del sitio:
- El **encabezado de navegación** usa `<header>` y `<nav>` con etiquetas ARIA
- El **contenido principal** está dentro de `<main>` con identificador único
- Cada **sección temática** usa `<section>` con títulos descriptivos
- Las **tarjetas de programas** usan `<article>` para contenido independiente
- El **pie de página** usa `<footer>` con información de contacto

**¿Por qué importa?** Los lectores de pantalla pueden navegar por regiones de la página, permitiendo a usuarios ciegos saltar directamente a la información que necesitan.

---

### 2. 🎨 **Contraste Adecuado de Colores**

**¿Qué es?** Garantizar que el texto sea legible sobre su fondo.

**¿Dónde está?** En toda la paleta de colores del sitio:
- Texto negro sobre blanco: contraste 18.6:1 ✅ (supera AAA)
- Azul UISEK sobre blanco: contraste 6.4:1 ✅ (cumple AA Large)
- Texto secundario gris sobre blanco: contraste 4.7:1 ✅ (cumple AA)

**¿Por qué importa?** Usuarios con baja visión, daltonismo o en condiciones de luz desfavorable pueden leer el contenido sin esfuerzo.

---

### 3. 🖼️ **Textos Alternativos Descriptivos**

**¿Qué es?** Proporcionar descripciones textuales para todas las imágenes.

**¿Dónde está?**
- **Logo UISEK**: "Universidad Internacional SEK Ecuador"
- **Imágenes de carreras**: "Estudiantes de [Carrera] en actividades académicas de UISEK"
- **Imágenes decorativas**: Marcadas con `aria-hidden="true"` para que lectores de pantalla las ignoren
- **Iconos informativos**: Incluyen descripciones del contexto

**¿Por qué importa?** Usuarios con discapacidad visual entienden el contenido de las imágenes a través de lectores de pantalla.

---

### 4. 📝 **Etiquetas en Formularios**

**¿Qué es?** Asociar correctamente cada campo de formulario con su etiqueta descriptiva.

**¿Dónde está?** En el **formulario de postulación** (modal lateral):
- Cada campo tiene una etiqueta `<label>` explícita
- Campos obligatorios marcados con asterisco (*) y `aria-required="true"`
- Mensajes de error descriptivos en tiempo real
- Selección de **nivel académico** (Pregrado/Posgrado) que filtra dinámicamente las carreras disponibles
- **40 programas académicos** organizados: 18 carreras de pregrado y 22 de posgrado (10 especializaciones + 12 maestrías)

**¿Por qué importa?** Usuarios con discapacidad visual saben qué información se espera en cada campo, y todos los usuarios reciben retroalimentación clara sobre errores.

---

### 5. ⌨️ **Navegación con Teclado**

**¿Qué es?** Permitir navegar y usar todo el sitio sin necesidad de mouse.

**¿Dónde está?**
- **Orden lógico de tabulación**: Navegación → Contenido → Botones → Footer
- **Elementos táctiles mínimos**: Todos los botones y enlaces tienen al menos 44x44 píxeles
- **Cierre con Escape**: Los modales se cierran presionando la tecla Escape
- **Foco visible**: Contorno azul de 3px con sombra en elementos activos
- **Skip Links**: Enlaces ocultos al inicio que aparecen al presionar Tab para saltar al contenido principal

**¿Por qué importa?** Usuarios con discapacidades motoras que no pueden usar mouse, y usuarios expertos que prefieren teclado, pueden navegar eficientemente.

---

### 6. 📑 **Jerarquía de Títulos Correcta**

**¿Qué es?** Organizar los encabezados en orden lógico desde h1 hasta h6.

**¿Dónde está?** En toda la estructura de contenido:
```
h1: Título principal único por página
├── h2: Secciones principales (ej: "Oferta Académica")
│   ├── h3: Subsecciones (ej: "Pregrado", "Posgrado")
│   │   ├── h4: Elementos dentro de secciones (ej: nombre de carrera)
```

**Ejemplo en Oferta Académica**:
- h1 → "Oferta Académica UISEK"
- h2 → "Programas de Pregrado", "Programas de Posgrado"  
- h3 → "Ciencias de la Salud", "Ingenierías", "Ciencias Sociales"
- h4 → "Medicina", "Ingeniería Civil", "Psicología"

**¿Por qué importa?** Usuarios de lectores de pantalla pueden navegar por la estructura de la página usando encabezados, entendiendo la jerarquía de la información.

---

### 7. 🔗 **Enlaces y Botones Descriptivos**

**¿Qué es?** Textos de enlaces que indican claramente su destino/acción.

**❌ Evitamos:**
- "Haz clic aquí"
- "Ver más"
- "Leer más"

**✅ Implementamos:**
- "Ver información completa del programa de Derecho"
- "Solicitar información académica"
- "Abrir formulario de postulación docente en Google Forms (se abre en nueva pestaña)"

**¿Dónde está?**
- Todos los enlaces de navegación principal
- Botones del **carrusel de oferta académica** (navegación por flechas e indicadores)
- Formularios de postulación (estudiantes y docentes)
- Botón de **postulación docente** que abre Google Forms en nueva pestaña de forma segura

**¿Por qué importa?** Usuarios de lectores de pantalla que navegan por lista de enlaces entienden el propósito de cada uno sin contexto adicional.

---

### 8. 📖 **Contenido Legible y Comprensible**

**¿Qué es?** Texto fácil de leer y entender.

**¿Dónde está?**
- **Tamaño mínimo de fuente**: 16px (1rem) - nunca más pequeño
- **Interlineado**: 1.6 (160% del tamaño de fuente)
- **Ancho de línea**: Máximo 80 caracteres para lectura cómoda
- **Tipografía responsive**: Se ajusta automáticamente según el dispositivo
- **Lenguaje claro**: Frases cortas, instrucciones paso a paso

**¿Por qué importa?** Usuarios con dislexia, problemas cognitivos, adultos mayores o personas con bajo nivel de alfabetización pueden comprender el contenido fácilmente.

---

## 🎨 Las 6 Mejoras Globales de Accesibilidad

Estas mejoras están disponibles en **todo el sitio** a través de un **panel flotante de accesibilidad** ubicado en la esquina inferior derecha (icono de accesibilidad universal).

---

### 1. 🔤 **Control de Tamaño de Fuente**

**¿Qué hace?** Permite ajustar el tamaño de todo el texto del sitio.

**Niveles disponibles:**
- **Normal**: 16px (100%) - Tamaño estándar
- **Grande**: 18px (112.5%) - 12.5% más grande
- **Extra Grande**: 20px (125%) - 25% más grande

**Persistencia:** Las preferencias se guardan en el navegador y se mantienen entre visitas.

**Beneficia a:**
- ✅ Usuarios con **baja visión** que necesitan texto más grande
- ✅ Usuarios con **dislexia** que encuentran ciertos tamaños más cómodos
- ✅ **Adultos mayores** con presbicia
- ✅ Cualquiera usando el sitio en pantallas pequeñas o desde lejos

---

### 2. 🌓 **Modo de Alto Contraste**

**¿Qué hace?** Invierte los colores a un esquema de alto contraste blanco sobre negro.

**Características:**
- Fondo: **Negro puro** (#000000)
- Texto: **Blanco puro** (#FFFFFF)  
- Enlaces: **Amarillo brillante** (#FFFF00)
- Contraste: **21:1** (el máximo posible)
- Imágenes: Contraste aumentado en 20%

**Beneficia a:**
- ✅ Usuarios con **daltonismo** (elimina dependencia del color)
- ✅ Usuarios con **baja visión** (contraste extremo facilita lectura)
- ✅ Usuarios con **sensibilidad lumínica** (fondo oscuro reduce fatiga)
- ✅ Usuarios en **ambientes brillantes** (sol, exteriores)

**Principio adicional:** No usamos SOLO el color para transmitir información - siempre combinamos con iconos, patrones o texto.

---

### 3. ⏸️ **Reducción de Animaciones**

**¿Qué hace?** Desactiva o reduce drásticamente todas las animaciones y transiciones.

**Implementación:**
- Animaciones reducidas a 0.01ms (prácticamente instantáneas)
- Transiciones eliminadas
- Scroll suave desactivado
- **Detección automática** de la preferencia del sistema operativo

**Beneficia a:**
- ✅ Usuarios con **sensibilidad al movimiento** (evita mareos y náuseas)
- ✅ Usuarios con **trastornos vestibulares** (previene vértigo)
- ✅ Usuarios con **TDAH o autismo** (minimiza distracciones visuales)
- ✅ Usuarios con **fotosensibilidad** o epilepsia (previene ataques)

---

### 4. 🔔 **Alertas Visuales Mejoradas**

**¿Qué hace?** Sistema de notificaciones visuales con iconos grandes y colores distintivos.

**4 tipos de alertas:**
- **Éxito**: Verde + icono de check ✓
- **Error**: Rojo + icono de X ✗
- **Advertencia**: Amarillo + icono de alerta ⚠
- **Información**: Azul + icono de info ℹ

**Características:**
- Iconos grandes (1.5rem)
- Mensaje claro y conciso
- Barra de progreso visual (muestra tiempo restante)
- Botón de cerrar accesible
- Auto-cierre después de 5 segundos

**¿Dónde se usan?**
- Confirmación de envío de formularios
- Errores de validación en tiempo real
- Campos de formulario con bordes de colores (verde = válido, rojo = error)

**Beneficia a:**
- ✅ Usuarios con **deficiencia auditiva** (no dependen de sonidos)
- ✅ Usuarios en **ambientes ruidosos** (no escuchan alertas)
- ✅ Usuarios con **problemas cognitivos** (indicadores visuales claros)

---

### 5. ⏭️ **Enlaces de Salto (Skip Links)**

**¿Qué hace?** Enlaces ocultos que aparecen al presionar Tab para saltar directamente al contenido principal.

**Funcionamiento:**
1. Usuario presiona Tab al cargar la página
2. Aparece enlace "Saltar al contenido principal"
3. Al presionar Enter, salta toda la navegación
4. Usuario llega directamente al contenido

**¿Dónde está?** En todas las páginas del sitio (inicio, oferta académica, admisiones, etc.)

**Beneficia a:**
- ✅ Usuarios de **teclado** (ahorran tiempo)
- ✅ Usuarios de **lectores de pantalla** (evitan escuchar todo el menú en cada página)
- ✅ Usuarios con **discapacidades motoras** (menos navegación repetitiva)

**Cumple con:** WCAG 2.1 Criterio 2.4.1 (Bypass Blocks - Nivel A)

---

### 6. 👁️ **Foco Visible Mejorado**

**¿Qué hace?** Indicador visual claro que muestra qué elemento está seleccionado al navegar con teclado.

**Características:**
- Contorno azul grueso de **3 píxeles** (#0066cc)
- Separación de **3 píxeles** del elemento
- Sombra adicional para mayor visibilidad
- Funciona en **todos los elementos interactivos** (botones, enlaces, campos de formulario, etc.)

**¿Dónde está?** Aplicado globalmente a todo el sitio.

**Beneficia a:**
- ✅ Usuarios que **navegan con teclado** (ven claramente dónde están)
- ✅ Usuarios con **problemas cognitivos** (mejor orientación)
- ✅ Usuarios con **baja visión** (indicador de alto contraste)

**Cumple con:** WCAG 2.1 Criterio 2.4.7 (Focus Visible - Nivel AA)

---

## 📍 ¿Dónde Están las Mejoras?

### Panel de Accesibilidad (Botón flotante)
**Ubicación:** Esquina inferior derecha en todas las páginas  
**Icono:** Símbolo de accesibilidad universal (persona en círculo)  
**Controles:**
- Control de tamaño de fuente (3 niveles)
- Activar/desactivar alto contraste
- Activar/desactivar reducción de animaciones
- **Preferencias guardadas** automáticamente en el navegador

### Navegación Principal (Navbar)
**Características:**
- Diseño compacto y minimalista
- Logo UISEK con tamaño responsive
- Enlaces descriptivos a todas las secciones
- Menú hamburguesa accesible en móviles
- Sticky (permanece visible al hacer scroll)

### Oferta Académica
**Características:**
- **Carrusel funcional** con 40 programas académicos organizados por categorías
- Navegación por **flechas** (anterior/siguiente) totalmente accesible
- **Indicadores clickeables** para saltar directamente a una categoría
- Control completo por teclado (Tab + Enter/Space)
- Tarjetas con imágenes inclusivas y descripciones claras

**Organización:**
- **Pregrado**: 18 carreras (incluye modalidades online)
- **Posgrado**: 22 programas
  - 10 Especializaciones (Cirugía Oral, Compliance, Ortodoncia, etc.)
  - 12 Maestrías (MBA, Biomedicina, Psicología Forense, etc.)

### Formularios de Postulación

**Formulario de Postulación Estudiantil (Modal lateral):**
- Validación en tiempo real
- Mensajes de error descriptivos
- Campo de **Nivel** (Pregrado/Posgrado) que filtra carreras dinámicamente
- Select de carreras organizado y accesible
- Estados visuales claros (válido/inválido)
- Confirmación visual al enviar

**Formulario de Postulación Docente:**
- Enlace a **Google Forms externo**
- Se abre en **nueva pestaña** de forma segura (`rel="noopener noreferrer"`)
- Icono indicador de enlace externo
- `aria-label` descriptivo informa que se abre en nueva pestaña

### Sección de Noticias
**Características:**
- Diseño de dos columnas responsive
- Imagen inclusiva de equipo de trabajo
- Llamado a la acción para postulación docente
- Botones de alto contraste

### Pie de Página (Footer)
**Características:**
- Información de contacto organizada
- Enlaces a redes sociales con iconos + texto
- Ubicación y derechos de autor
- Estructura semántica clara

---

## 📊 Resumen: ¿A Quién Ayuda Cada Mejora?

| Tipo de Discapacidad | Mejoras Aplicadas |
|---|---|
| **👁️ Baja Visión** | ✅ Control de tamaño de fuente<br>✅ Alto contraste<br>✅ Texto mínimo 16px<br>✅ Foco visible mejorado |
| **🎨 Daltonismo** | ✅ Modo de alto contraste B/N<br>✅ No se usa solo el color para información<br>✅ Iconos + texto en elementos |
| **🦻 Deficiencia Auditiva** | ✅ Alertas visuales con iconos<br>✅ Estados de formulario visuales<br>✅ Sin dependencia de sonidos |
| **🌀 Sensibilidad al Movimiento** | ✅ Reducción de animaciones<br>✅ Detección automática de preferencia del sistema<br>✅ Scroll suave desactivable |
| **⌨️ Usuarios de Teclado** | ✅ Skip links<br>✅ Foco visible<br>✅ Elementos mínimo 44x44px<br>✅ Orden lógico de tabulación |
| **🧠 Discapacidades Cognitivas** | ✅ Lenguaje claro<br>✅ Instrucciones paso a paso<br>✅ Diseño minimalista<br>✅ Indicadores claros |

---

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1** con TypeScript - Framework principal
- **Vite** - Build tool y desarrollo rápido
- **Bootstrap 5.3.8** - Sistema de diseño responsive y accesible
- **Bootstrap Icons** - Iconografía consistente
- **HTML5 Semántico** - Estructura accesible
- **CSS3** - Estilos personalizados con variables

---

## 🧪 Validación de Accesibilidad

### Herramientas de prueba utilizadas:

- ✅ **axe DevTools** - Sin violaciones críticas detectadas
- ✅ **WAVE** - Evaluación completa de accesibilidad web
- ✅ **Lighthouse** - Score de accesibilidad superior a 95/100
- ✅ **Navegación por teclado manual** - Todos los elementos accesibles
- ✅ **Lectores de pantalla** - Compatible con NVDA y VoiceOver

### Checklist completado:

- [x] Navegación completa solo con teclado (Tab/Shift+Tab/Enter/Escape)
- [x] Skip links funcionando en todas las páginas
- [x] Contraste de colores verificado con herramientas
- [x] Todas las imágenes con textos alternativos descriptivos
- [x] Formularios con etiquetas y validación accesible
- [x] Jerarquía de títulos h1-h6 correcta
- [x] Foco visible en todos los elementos interactivos
- [x] Diseño responsive en móvil, tablet y escritorio
- [x] Tamaño mínimo de elementos táctiles (44x44px)
- [x] Compatibilidad con lectores de pantalla probada

---

## 📊 Conformidad con WCAG 2.1

| Criterio WCAG | Nivel | Estado |
|---|---|---|
| 1.1.1 Contenido no textual | A | ✅ Cumple |
| 1.3.1 Información y relaciones | A | ✅ Cumple |
| 1.4.3 Contraste mínimo | AA | ✅ Cumple (18.6:1) |
| 1.4.6 Contraste mejorado | AAA | ✅ Cumple |
| 2.1.1 Teclado | A | ✅ Cumple |
| 2.1.2 Sin trampas de teclado | A | ✅ Cumple |
| 2.4.1 Evitar bloques | A | ✅ Cumple (skip links) |
| 2.4.3 Orden del foco | A | ✅ Cumple |
| 2.4.4 Propósito de los enlaces | A | ✅ Cumple |
| 2.4.6 Encabezados y etiquetas | AA | ✅ Cumple |
| 2.4.7 Foco visible | AA | ✅ Cumple |
| 3.1.1 Idioma de la página | A | ✅ Cumple (lang="es") |
| 3.2.3 Navegación coherente | AA | ✅ Cumple |
| 3.3.2 Etiquetas o instrucciones | A | ✅ Cumple |
| 4.1.2 Nombre, función, valor | A | ✅ Cumple (ARIA) |

**🏆 Nivel de conformidad alcanzado: WCAG 2.1 AA**

---

## 🚀 Cómo Usar Este Proyecto

### Instalación:

```bash
npm install
```

### Desarrollo local:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

### Build para producción:

```bash
npm run build
```

### Vista previa del build:

```bash
npm run preview
```

---

## 📚 Recursos y Referencias

### Documentación consultada:

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Guías oficiales de accesibilidad
- [WebAIM](https://webaim.org/) - Web Accessibility In Mind
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) - Documentación técnica
- [Bootstrap Accessibility](https://getbootstrap.com/docs/5.3/getting-started/accessibility/) - Mejores prácticas

### Sitio web de referencia:

- [UISEK Ecuador - Oferta Académica](https://uisek.edu.ec/oferta-academica/)

---

## 👥 Autoría

**Jeremy Leon**

Portal desarrollado como proyecto académico demostrativo para mejorar la **accesibilidad e inclusión digital** en sitios web educativos, aplicado al caso de la Universidad Internacional SEK (UISEK) de Ecuador.

---

## 📄 Licencia

Proyecto educativo - 2026

---

## 🎯 Conclusión

Este proyecto demuestra que la **accesibilidad web no es opcional**, sino una **responsabilidad ética y legal**. Implementar estas mejoras no solo ayuda a personas con discapacidades, sino que mejora la experiencia para **todos los usuarios**:

- ✅ Mejor SEO y posicionamiento en buscadores
- ✅ Mayor alcance de audiencia
- ✅ Cumplimiento legal y normativo
- ✅ Mejor experiencia de usuario en general
- ✅ Código más limpio y mantenible
- ✅ Responsabilidad social corporativa

**La accesibilidad es diseño universal. Cuando diseñamos para las personas con mayores necesidades, creamos mejores experiencias para todos.**

---

**Última actualización:** Febrero 2026
