import { useRef, useCallback, useEffect } from 'react';
import h337 from 'heatmap.js';

/**
 * Hook useHeatmap
 *
 * Crea una instancia de Heatmap.js sobre un contenedor superpuesto al body,
 * recibe un arreglo de puntos (x, y), expone generateHeatmap para dibujar
 * el mapa y lo superpone sin alterar el layout (position: fixed, pointer-events: none).
 */

/** Crea el div contenedor del heatmap: cubre el viewport y no afecta el layout ni los clics */
function createOverlayContainer() {
  const div = document.createElement('div');
  div.setAttribute('aria-hidden', 'true');
  div.style.cssText = [
    'position: fixed',
    'top: 0',
    'left: 0',
    'width: 100%',
    'height: 100%',
    'pointer-events: none',
    'z-index: 1',
    'overflow: hidden',
    'display: none',
    'visibility: hidden',
  ].join('; ');
  return div;
}

/**
 * @param {Object} options
 * @param {Array<{x: number, y: number}>} [options.points] - Arreglo inicial de puntos (x, y). Opcional.
 * @param {number} [options.radius=40] - Radio de cada punto en el heatmap
 * @param {number} [options.blur=0.85] - Desenfoque del heatmap (0–1)
 * @param {number} [options.maxOpacity=0.6] - Opacidad máxima del gradiente
 */
export function useHeatmap(options = {}) {
  const {
    points: initialPoints = [],
    radius = 40,
    blur = 0.85,
    maxOpacity = 0.6,
  } = options;

  // Referencia a la instancia de Heatmap.js (creada al montar)
  const heatmapInstanceRef = useRef(null);
  // Referencia al div overlay que se inserta en el body
  const containerRef = useRef(null);

  /**
   * Crea la instancia de Heatmap.js sobre el body.
   * Se ejecuta una sola vez al montar: crea un div overlay y lo usa como container.
   */
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const container = createOverlayContainer();
    document.body.appendChild(container);
    containerRef.current = container;

    const heatmapInstance = h337.create({
      container,
      radius: radius + 20,
      blur,
      maxOpacity: Math.min(maxOpacity + 0.2, 1),
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 'transparent',
    });
    heatmapInstanceRef.current = heatmapInstance;

    return () => {
      if (containerRef.current && containerRef.current.parentNode) {
        containerRef.current.parentNode.removeChild(containerRef.current);
      }
      containerRef.current = null;
      heatmapInstanceRef.current = null;
    };
  }, []);

  /**
   * Dibuja el mapa de calor con el arreglo de puntos dado.
   * Formato esperado: array de { x, y } o { x, y, value }.
   * Si no se pasan puntos, se usa el arreglo vacío (limpia el heatmap).
   *
   * @param {Array<{x: number, y: number, value?: number}>} [points] - Puntos visuales (x, y). value por defecto 1.
   * @param {{ keepVisible?: boolean }} [options] - keepVisible: no ocultar el contenedor (p. ej. para capturar PNG).
   */
  const generateHeatmap = useCallback((points = [], options = {}) => {
    const instance = heatmapInstanceRef.current;
    if (!instance) return;
    if (containerRef.current && !options.keepVisible) {
      containerRef.current.style.display = 'none';
      containerRef.current.style.visibility = 'hidden';
    }

    const dataPoints = Array.isArray(points)
      ? points.map((p) => ({
          x: Math.round(Number(p.x)),
          y: Math.round(Number(p.y)),
          value: typeof p.value === 'number' ? p.value : 1,
        }))
      : [];

    const values = dataPoints.map((d) => d.value);
    const min = values.length ? Math.min(...values) : 0;
    const max = values.length ? Math.max(...values) : 1;

    instance.setData({
      min,
      max: max || 1,
      data: dataPoints,
    });
  }, []);

  /**
   * Opcional: actualizar y redibujar con puntos iniciales al montar.
   * Si se pasaron initialPoints, se genera el heatmap con ellos.
   */
  useEffect(() => {
    if (initialPoints.length > 0 && heatmapInstanceRef.current) {
      generateHeatmap(initialPoints);
    }
  }, [initialPoints, generateHeatmap]);

  /** Limpia el mapa de calor (dibuja sin puntos). */
  const clearHeatmap = useCallback(() => {
    generateHeatmap([]);
  }, [generateHeatmap]);

  /**
   * Devuelve el mapa de calor actual como Data URL (PNG) para descargar o guardar.
   * Fuerza un repaint antes para que el canvas esté actualizado.
   * @returns {string|null} data URL o null si no hay instancia
   */
  const getHeatmapDataURL = useCallback(() => {
    const instance = heatmapInstanceRef.current;
    if (!instance) return null;
    if (typeof instance.repaint === 'function') instance.repaint();
    if (typeof instance.getDataURL === 'function') return instance.getDataURL();
    // Fallback: canvas dentro del contenedor (por si la librería no expone getDataURL)
    const container = containerRef.current;
    const canvas = container?.querySelector?.('canvas');
    return canvas && typeof canvas.toDataURL === 'function' ? canvas.toDataURL('image/png') : null;
  }, []);

  return {
    generateHeatmap,
    clearHeatmap,
    getHeatmapDataURL,
    containerRef,
    heatmapInstanceRef,
  };
}
