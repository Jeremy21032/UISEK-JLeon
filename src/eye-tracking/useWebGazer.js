import { useState, useEffect, useCallback, useRef } from 'react';
import webgazer from 'webgazer';

/**
 * Hook useWebGazer
 *
 * Inicializa WebGazer.js, solicita acceso a la webcam, captura las coordenadas
 * (x, y) de la mirada y las guarda en gazeData. Permite iniciar y detener la captura.
 */
export function useWebGazer() {
  // Estado con los puntos de mirada capturados: array de { x, y }
  const [gazeData, setGazeData] = useState([]);

  // Indica si WebGazer ya se inicializó y la webcam está activa
  const [isReady, setIsReady] = useState(false);

  // true mientras la captura está activa (entre start y stop)
  const [isCapturing, setIsCapturing] = useState(false);

  // Mensaje de error si falla el acceso a la cámara o la inicialización
  const [error, setError] = useState(null);

  // Referencia para saber si ya se llamó a begin() con éxito (y así usar resume() en lugar de begin())
  const hasBegunRef = useRef(false);

  /**
   * Callback que WebGazer ejecuta en cada predicción de mirada.
   * Recibe el objeto data con .x y .y en coordenadas de pantalla.
   */
  const handleGaze = useCallback((data, _elapsedTime) => {
    if (data && typeof data.x === 'number' && typeof data.y === 'number') {
      setGazeData((prev) => [...prev, { x: data.x, y: data.y }]);
    }
  }, []);

  /**
   * Inicia la captura de mirada:
   * - La primera vez solicita acceso a la webcam (begin()) y registra el listener.
   * - Si ya se había pausado, reanuda con resume().
   */
  const start = useCallback(async () => {
    setError(null);

    try {
      // Siempre registramos el listener al iniciar (también al reanudar tras stop)
      webgazer.setGazeListener(handleGaze);

      if (!hasBegunRef.current) {
        // begin() solicita acceso a la webcam e inicia el seguimiento; devuelve una Promise
        await webgazer.begin((err) => {
          setError(err?.message ?? 'No se pudo acceder a la cámara');
        });
        hasBegunRef.current = true;
      } else {
        await webgazer.resume();
      }
      setIsCapturing(true);
      setIsReady(true);
    } catch (err) {
      setError(err?.message ?? 'Error al iniciar WebGazer');
      setIsCapturing(false);
    }
  }, [handleGaze]);

  /**
   * Detiene la captura: pausa WebGazer y limpia el listener.
   * La cámara sigue en el DOM hasta que se llame end().
   */
  const stop = useCallback(() => {
    webgazer.pause();
    webgazer.clearGazeListener();
    setIsCapturing(false);
  }, []);

  /**
   * Cierra WebGazer: quita del DOM el video y el punto de mirada (sin tocar el stream
   * para evitar errores que puedan afectar a React). Tras end(), al volver a iniciar se llama begin() de nuevo.
   */
  const end = useCallback(() => {
    try {
      webgazer.clearGazeListener();
      webgazer.pause();
      if (typeof webgazer.end === 'function') {
        webgazer.end();
      }
      hasBegunRef.current = false;
    } catch (_) {
      // evita que cualquier error de WebGazer desmonte la app
    }
    setIsCapturing(false);
  }, []);

  /**
   * Limpia el array de puntos guardados (gazeData). No inicia ni detiene la captura.
   */
  const clearGazeData = useCallback(() => {
    setGazeData([]);
  }, []);

  useEffect(() => {
    return () => {
      try {
        webgazer.pause();
        webgazer.clearGazeListener();
        if (typeof webgazer.end === 'function') webgazer.end();
      } catch (_) {}
    };
  }, []);

  return {
    gazeData,
    isReady,
    isCapturing,
    error,
    start,
    stop,
    end,
    clearGazeData,
  };
}
