import { useState, useRef, useEffect } from 'react';
import { useWebGazer } from './useWebGazer';
import { useHeatmap } from './useHeatmap';
import { getCarreraAlAzar } from '../config/carrerasOferta';

const DURATION_SECONDS = 90;

const TAREAS = [
  {
    id: 1,
    titulo: 'Formulario de inscripción',
    descripcion: 'Busca el formulario de inscripción en la página, complétalo y haz clic en «Enviar solicitud».',
  },
  {
    id: 2,
    titulo: 'Oferta académica',
    descripcion: 'Ve a la página de oferta académica y busca la carrera que se te indique.',
  },
  {
    id: 3,
    titulo: 'Datos de contacto',
    descripcion: 'Encuentra la sección de contacto o cómo comunicarse con la universidad.',
  },
];

export function EyeTrackingExperiment({
  onExperimentEnd,
  onCloseResultsOverlay,
  resultsApiRef,
  pointsForExportRef,
}) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'requesting' | 'capturing' | 'showing_results'
  const [secondsLeft, setSecondsLeft] = useState(DURATION_SECONDS);
  const [tareaActual, setTareaActual] = useState(null); // una de TAREAS, asignada al azar al iniciar
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const isMountedRef = useRef(true);

  const {
    gazeData,
    isCapturing,
    error,
    start,
    stop,
    end,
    clearGazeData,
  } = useWebGazer();

  const {
    generateHeatmap,
    clearHeatmap,
    getHeatmapDataURL,
    containerRef,
  } = useHeatmap({
    radius: 50,
    blur: 0.85,
    maxOpacity: 0.6,
  });

  // Ref para leer el gazeData más reciente en el callback del temporizador (evita closure obsoleta)
  const gazeDataRef = useRef(gazeData);
  useEffect(() => {
    gazeDataRef.current = gazeData;
  }, [gazeData]);

  // Puntos guardados al terminar; el heatmap NO se genera aquí para no interferir con el panel
  const pointsToShowRef = useRef([]);

  const finishExperiment = () => {
    const points = Array.isArray(gazeDataRef.current) ? [...gazeDataRef.current] : [];
    pointsToShowRef.current = points;
    if (pointsForExportRef) pointsForExportRef.current = points;
    setPhase('showing_results');
    setSecondsLeft(DURATION_SECONDS);
    onExperimentEnd?.(points);
    setTimeout(() => {
      end();
    }, 0);
  };

  const handleStartExperiment = async () => {
    if (isCapturing) return;
    clearGazeData();
    clearHeatmap();
    const tareaElegida = TAREAS[Math.floor(Math.random() * TAREAS.length)];
    const tareaConCarrera = tareaElegida.id === 2
      ? { ...tareaElegida, carreraBuscar: getCarreraAlAzar() }
      : tareaElegida;
    setTareaActual(tareaConCarrera);
    setPhase('requesting'); // Primero: solicitar permiso de cámara (feedback visible)
    setSecondsLeft(DURATION_SECONDS);

    try {
      await start(); // Aquí se pide el permiso de la cámara (getUserMedia)
      setPhase('capturing');
      // Cuenta regresiva visible para el usuario
      countdownRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      // Tras 90 s: detener captura y mostrar panel de resultados
      timerRef.current = setTimeout(() => {
        if (countdownRef.current) clearInterval(countdownRef.current);
        if (isMountedRef.current) finishExperiment();
      }, DURATION_SECONDS * 1000);
    } catch {
      setPhase('idle');
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  // Si el usuario navega o se desmonta durante la captura, limpiar
  useEffect(() => {
    if (phase === 'capturing' && !isCapturing && error) {
      setPhase('idle');
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [phase, isCapturing, error]);

  // API para el panel: generar heatmap solo al descargar; mostramos el contenedor off-screen un instante para que el canvas se pinte
  useEffect(() => {
    if (!resultsApiRef) return;
    resultsApiRef.current = {
      prepareAndGetHeatmapDataURL: () => {
        const points = pointsToShowRef.current;
        const container = containerRef.current;
        if (!container) return Promise.resolve(null);
        if (!points.length) return Promise.resolve(getHeatmapDataURL() || null);

        const prevDisplay = container.style.display;
        const prevVisibility = container.style.visibility;
        const prevPosition = container.style.position;
        const prevLeft = container.style.left;
        const prevTop = container.style.top;
        const prevWidth = container.style.width;
        const prevHeight = container.style.height;
        const prevZIndex = container.style.zIndex;

        // Mostrar contenedor fuera de vista pero “visible” para que el canvas se pinte (evita canvas en blanco)
        container.style.display = 'block';
        container.style.visibility = 'visible';
        container.style.position = 'fixed';
        container.style.left = '-99999px';
        container.style.top = '0';
        container.style.width = `${window.innerWidth}px`;
        container.style.height = `${window.innerHeight}px`;
        container.style.zIndex = '-1';

        generateHeatmap(points, { keepVisible: true });

        return new Promise((resolve) => {
          const restoreAndResolve = (dataURL) => {
            container.style.display = prevDisplay;
            container.style.visibility = prevVisibility;
            container.style.position = prevPosition;
            container.style.left = prevLeft;
            container.style.top = prevTop;
            container.style.width = prevWidth;
            container.style.height = prevHeight;
            container.style.zIndex = prevZIndex;
            resolve(dataURL || null);
          };
          // Dar tiempo al navegador para pintar el canvas antes de toDataURL
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTimeout(() => {
                const dataURL = getHeatmapDataURL();
                restoreAndResolve(dataURL);
              }, 80);
            });
          });
        });
      },
      closeResults: () => {
        clearHeatmap();
        setTareaActual(null);
        setPhase('idle');
        onCloseResultsOverlay?.();
      },
    };
    return () => {
      resultsApiRef.current = null;
    };
  }, [resultsApiRef, getHeatmapDataURL, generateHeatmap, clearHeatmap, onCloseResultsOverlay]);

  return (
    <section className="p-4" aria-labelledby="eye-tracking-heading">
      <h2 id="eye-tracking-heading">Experimento de eye-tracking</h2>

      {/* Tarea asignada al azar al iniciar */}
      <div
        id="eye-tracking-task"
        className="p-4 mb-4 rounded border-2 border-primary bg-light"
        role="region"
        aria-label="Tarea del experimento"
        style={{ borderWidth: '2px' }}
      >
        <p className="mb-2 small text-uppercase text-primary fw-bold">Tu tarea durante el experimento</p>
        {tareaActual ? (
          <>
            <p className="mb-0 fs-5 fw-semibold">
              <strong>{tareaActual.titulo}.</strong>{' '}
              {tareaActual.carreraBuscar ? (
                <>Ve a la página «Oferta académica» y busca la carrera: <strong>{tareaActual.carreraBuscar}</strong>.</>
              ) : (
                tareaActual.descripcion
              )}
            </p>
            <p className="mb-0 mt-2 small text-muted">
              Al terminar los 90 segundos, podrás <strong>descargar</strong> el mapa de calor (no se muestra en pantalla).
            </p>
          </>
        ) : (
          <>
            <p className="mb-2 small text-muted">
              Al hacer clic en «Iniciar experimento» se te asignará <strong>una tarea al azar</strong> entre:
            </p>
            <ul className="mb-0 ps-3 small">
              {TAREAS.map((t) => (
                <li key={t.id}>{t.titulo}</li>
              ))}
            </ul>
            <p className="mb-0 mt-2 small text-muted">
              Tendrás 90 segundos para realizarla. Luego podrás descargar el mapa de calor.
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {phase === 'idle' && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleStartExperiment}
          aria-describedby="eye-tracking-task"
        >
          Iniciar experimento
        </button>
      )}

      {phase === 'requesting' && (
        <div className="alert alert-info mb-3" role="status" aria-live="polite">
          <strong>Solicitando acceso a la cámara…</strong>
          <p className="mb-0 mt-2 small">
            Por favor, permita el uso de la cámara cuando el navegador lo pida. Así WebGazer podrá inicializarse y registrar la mirada.
          </p>
        </div>
      )}

      {phase === 'capturing' && (
        <div className="mb-3">
          <p className="text-muted mb-2">
            Registrando mirada… {secondsLeft} s restantes.
          </p>
          <p className="small text-primary fw-semibold mb-1">
            Recuerda: {tareaActual
              ? tareaActual.carreraBuscar
                ? `Oferta académica: busca la carrera «${tareaActual.carreraBuscar}».`
                : `${tareaActual.titulo}. ${tareaActual.descripcion}`
              : 'realiza tu tarea asignada.'}
          </p>
          <p className="small text-muted">
            Puntos capturados: {gazeData.length}
          </p>
        </div>
      )}

      {/* El panel "Experimento finalizado" + Descargar se renderiza en App.tsx para que siempre sea visible */}
    </section>
  );
}

export default EyeTrackingExperiment;
