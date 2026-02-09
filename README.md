# Portal Estudiantil UISEK – Eye-Tracking

**Autor:** Jeremy León  
**Proyecto académico – 2026**

🔗 **Previsualización:** https://uisek-j-leon.vercel.app/

---

## 🎯 Objetivo del ejercicio

Analizar el **comportamiento visual de los usuarios** al interactuar con el Portal Estudiantil UISEK, utilizando técnicas de **eye-tracking con webcam** y **mapas de calor**, con el fin de evaluar la **usabilidad**, la **jerarquía visual** y la **accesibilidad** de la interfaz web.

---

## 🧪 ¿Qué se hizo?

- Se utilizó una **interfaz web real** del Portal Estudiantil UISEK.
- Se integró **WebGazer.js** para capturar la mirada del usuario mediante la webcam.
- Se implementó **Heatmap.js** para generar un **mapa de calor** a partir de los puntos de fijación visual.
- Se definió una **tarea concreta** para el usuario.
- La captura de la mirada tuvo una duración de **90 segundos**.
- Al finalizar el experimento, el sistema genera y permite descargar el **mapa de calor** como imagen (PNG).

El proyecto está desarrollado en **React**, el cual genera **HTML, CSS y JavaScript estándar**, cumpliendo con los requisitos técnicos del ejercicio.

---

## 🧠 Tarea asignada al usuario

Durante el experimento, el usuario debía realizar una de las siguientes tareas (asignada automáticamente):

- Encontrar el formulario de inscripción.
- Localizar una carrera dentro de la oferta académica.
- Identificar la información de contacto institucional.

---

## 👥 Prueba con usuarias

El experimento se realizó con **dos usuarias que nunca habían utilizado previamente la plataforma**.

- **Usuaria 1:** no presentó problemas de accesibilidad ni de interacción. Navegó de forma fluida utilizando mouse y teclado, completando la tarea asignada sin dificultades.

- **Usuaria 2:** presentó dificultades de accesibilidad debido a que no comprendía completamente el funcionamiento del equipo y **no podía utilizar el mouse pad**. Interactuó con la plataforma utilizando únicamente el **teclado** (Tab y Enter).

Este escenario evidenció la importancia de contar con una **navegación accesible por teclado**, un **orden lógico del foco** y elementos interactivos claramente identificables.

---

## 🔥 Análisis de las zonas de atención visual

A partir de los mapas de calor obtenidos se observaron los siguientes patrones:

- Las **zonas centrales de la pantalla** concentran la mayor atención visual.
- Los elementos relacionados directamente con la tarea reciben más fijaciones.
- Las áreas secundarias o periféricas presentan menor atención.

Los resultados indican que la jerarquía visual del portal guía adecuadamente la mirada del usuario, aunque algunos elementos clave pueden reforzarse visualmente.

---

## 📐 Relación con principios de usabilidad

Los resultados del eye-tracking se relacionan con las siguientes heurísticas de usabilidad:

- **Visibilidad del estado del sistema:** mensajes claros durante el inicio, la captura y la finalización del experimento.
- **Reconocimiento antes que recuerdo:** los elementos importantes son visibles y fáciles de identificar.
- **Diseño minimalista:** la atención se concentra en las zonas esperadas.
- **Accesibilidad y flexibilidad de uso:** se evidencia la necesidad de soporte completo por teclado.

---

## 🛠️ Propuestas de mejora

1. **Reforzar visualmente los llamados a la acción (CTA)**  
   Mejorar contraste, tamaño o ubicación para captar atención más rápidamente.

2. **Mejorar la accesibilidad por teclado**  
   Optimizar el orden de tabulación, foco visible y navegación sin mouse.

---

## ▶️ Evidencia de ejecución (video)

El siguiente video muestra **todo el flujo del experimento**:  
calibración de WebGazer, captura de la mirada y generación del mapa de calor.

<video src="./public/eye-tracking-evidencia.mp4" controls width="100%"></video>

> 📁 El archivo se encuentra en la carpeta `public/` del repositorio.

---

## 🚀 Ejecución local

```bash
npm install
npm run dev
