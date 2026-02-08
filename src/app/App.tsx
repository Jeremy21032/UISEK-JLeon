import React, { useEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { Navigation } from '@/app/components/Navigation';
import { Footer } from '@/app/components/Footer';
import { PostulacionModal } from '@/app/components/PostulacionModal';
import { AccessibilityControls } from '@/app/components/AccessibilityControls';
import { HeroSection } from '@/app/components/HeroSection';
import { ServiciosEstudiantiles } from '@/app/components/ServiciosEstudiantiles';
import { OfertaAcademica } from '@/app/components/OfertaAcademica';
import { Portales } from '@/app/components/Portales';
import { NoticiasSection } from '@/app/components/NoticiasSection';
import { ContactoSection } from '@/app/components/ContactoSection';
import { OfertaAcademicaPage } from '@/app/pages/OfertaAcademicaPage';
import { AdmisionesPage } from '@/app/pages/AdmisionesPage';
import { EyeTrackingExperiment } from '@/eye-tracking/EyeTrackingExperiment';

/** Gradiente azul → verde → amarillo → rojo (como heatmap.js) */
function heatGradient(t: number): [number, number, number, number] {
  if (t <= 0.25) {
    const s = t / 0.25;
    return [0, 0, 255, Math.round(255 * s)];
  }
  if (t <= 0.55) {
    const s = (t - 0.25) / 0.3;
    return [0, Math.round(255 * s), 255, 255];
  }
  if (t <= 0.85) {
    const s = (t - 0.55) / 0.3;
    return [Math.round(255 * s), 255, Math.round(255 * (1 - s)), 255];
  }
  const s = (t - 0.85) / 0.15;
  return [255, 255, 0, 255];
}

/** Genera un PNG del mapa de calor dibujando en un canvas propio. */
function exportHeatmapToPNG(points: Array<{ x: number; y: number; value?: number }>): Promise<string | null> {
  try {
    if (!points?.length || typeof document === 'undefined') return Promise.resolve(null);

    console.log('[Mapa de calor] Recibidos', points.length, 'puntos. Muestra (primeros 5):', points.slice(0, 5), '| viewport:', window.innerWidth, 'x', window.innerHeight);

    const w = Math.max(300, Math.floor(window.innerWidth || 800));
    const h = Math.max(300, Math.floor(window.innerHeight || 600));
    const radius = 80;
    const sigma = radius * 0.4;
    const sigma2 = sigma * sigma;

    const dataPoints = points
      .map((p) => ({
        x: Number(p.x),
        y: Number(p.y),
        value: typeof (p as { value?: number }).value === 'number' ? (p as { value: number }).value : 1,
      }))
      .filter((d) => Number.isFinite(d.x) && Number.isFinite(d.y));
    if (!dataPoints.length) return Promise.resolve(null);

    const minX = Math.min(...dataPoints.map((d) => d.x));
    const maxX = Math.max(...dataPoints.map((d) => d.x));
    const minY = Math.min(...dataPoints.map((d) => d.y));
    const maxY = Math.max(...dataPoints.map((d) => d.y));
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    const pad = 0.05;
    const scaleX = (w * (1 - 2 * pad)) / rangeX;
    const scaleY = (h * (1 - 2 * pad)) / rangeY;
    const scale = Math.min(scaleX, scaleY, 1.5);
    const offsetX = w * pad + (w - 2 * w * pad - rangeX * scale) / 2;
    const offsetY = h * pad + (h - 2 * h * pad - rangeY * scale) / 2;

    const values = dataPoints.map((d) => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values) || 1;
    const valueRange = maxVal - minVal;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return Promise.resolve(null);

    const intensity = new Float32Array(w * h);
    const r2 = radius * radius;

    for (const p of dataPoints) {
      const v = valueRange === 0 ? 1 : (p.value - minVal) / valueRange;
      const px = Math.round(offsetX + (p.x - minX) * scale);
      const py = Math.round(offsetY + (p.y - minY) * scale);
      const x0 = Math.max(0, px - radius);
      const x1 = Math.min(w, px + radius + 1);
      const y0 = Math.max(0, py - radius);
      const y1 = Math.min(h, py + radius + 1);
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const dx = x - px;
          const dy = y - py;
          const d2 = dx * dx + dy * dy;
          if (d2 > r2) continue;
          intensity[y * w + x] += Math.exp(-d2 / (2 * sigma2)) * v;
        }
      }
    }

    let maxInt = 0;
    for (let i = 0; i < intensity.length; i++) if (intensity[i] > maxInt) maxInt = intensity[i];
    if (maxInt <= 0) maxInt = 1;

    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;
    const opacity = 0.85;
    const bgR = 28;
    const bgG = 28;
    const bgB = 32;

    for (let i = 0; i < intensity.length; i++) {
      const t = Math.min(1, intensity[i] / maxInt);
      const [r, g, b, a] = heatGradient(t);
      const o = t <= 0.001 ? 0 : Math.round(255 * opacity * Math.max(0.2, a / 255));
      const j = i * 4;
      if (o === 0) {
        data[j] = bgR;
        data[j + 1] = bgG;
        data[j + 2] = bgB;
        data[j + 3] = 255;
      } else {
        const blend = o / 255;
        data[j] = Math.round(r * blend + bgR * (1 - blend));
        data[j + 1] = Math.round(g * blend + bgG * (1 - blend));
        data[j + 2] = Math.round(b * blend + bgB * (1 - blend));
        data[j + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const url = canvas.toDataURL('image/png');
    return Promise.resolve(url?.startsWith('data:') ? url : null);
  } catch {
    return Promise.resolve(null);
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEyeTrackingExperiment, setShowEyeTrackingExperiment] = useState(false);
  const [showEyeTrackingResultsOverlay, setShowEyeTrackingResultsOverlay] = useState(false);
  const [heatmapPreviewURL, setHeatmapPreviewURL] = useState<string | null>(null);
  const [heatmapGenerating, setHeatmapGenerating] = useState(false);
  const [lastExperimentPoints, setLastExperimentPoints] = useState<Array<{ x: number; y: number; value?: number }>>([]);
  const eyeTrackingResultsRef = useRef<{ prepareAndGetHeatmapDataURL: () => Promise<string | null>; closeResults: () => void } | null>(null);
  const eyeTrackingPointsRef = useRef<Array<{ x: number; y: number; value?: number }>>([]);

  useEffect(() => {
    // Detectar cambios en el hash de la URL
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
      
      // Scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Ejecutar al cargar
    handleHashChange();

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Páginas sueltas solo cuando el experimento NO está activo (así al navegar con experimento activo, WebGazer sigue en marcha)
  if (currentPage === 'oferta-academica' && !showEyeTrackingExperiment) {
    return (
      <>
        <OfertaAcademicaPage />
        <AccessibilityControls />
      </>
    );
  }
  if (currentPage === 'admisiones' && !showEyeTrackingExperiment) {
    return (
      <>
        <AdmisionesPage />
        <AccessibilityControls />
      </>
    );
  }

  // Layout completo: home o experimento activo en cualquier página (para que WebGazer siga en #oferta-academica, etc.)
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Skip Links - Mejora de accesibilidad global */}
      <a 
        href="#main-content" 
        className="skip-link position-absolute bg-primary text-white px-4 py-2 text-decoration-none"
        style={{ 
          top: '-100px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          zIndex: 9999,
          transition: 'top 0.3s'
        }}
        onFocus={(e) => e.currentTarget.style.top = '10px'}
        onBlur={(e) => e.currentTarget.style.top = '-100px'}
      >
        Saltar al contenido principal
      </a>

      <Navigation
        onOpenEyeTracking={() => {
          setShowEyeTrackingExperiment(true);
          setTimeout(() => {
            document.getElementById('experimento-eye-tracking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }}
      />
      <main id="main-content" role="main">
        {/* Experimento montado cuando está activo para que WebGazer siga en cualquier página (#oferta-academica, etc.) */}
        {showEyeTrackingExperiment && (
          <section className="py-4 border-bottom bg-light" id="experimento-eye-tracking" aria-labelledby="titulo-experimento">
            <div className="container">
              <h2 id="titulo-experimento" className="h5 mb-3">
                Experimento de eye-tracking
              </h2>
              <div id="eye-tracking-content">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm mb-3"
                  onClick={() => setShowEyeTrackingExperiment(false)}
                  aria-expanded="true"
                  aria-controls="eye-tracking-content"
                >
                  Cerrar experimento
                </button>
                <EyeTrackingExperiment
                  onExperimentEnd={(points) => {
                    const arr = points ?? [];
                    eyeTrackingPointsRef.current = arr;
                    setLastExperimentPoints(arr);
                    flushSync(() => setShowEyeTrackingResultsOverlay(true));
                  }}
                  onCloseResultsOverlay={() => setShowEyeTrackingResultsOverlay(false)}
                  resultsApiRef={eyeTrackingResultsRef}
                  pointsForExportRef={eyeTrackingPointsRef}
                />
              </div>
            </div>
          </section>
        )}

        {/* Contenido según página: home o oferta/admisiones cuando experimento activo */}
        {currentPage === 'oferta-academica' && <OfertaAcademicaPage embedded />}
        {currentPage === 'admisiones' && <AdmisionesPage />}
        {currentPage === 'home' && (
          <>
            <HeroSection onOpenModal={() => setIsModalOpen(true)} />
            {!showEyeTrackingExperiment && (
              <section className="py-5 border-top" id="experimento-eye-tracking" aria-labelledby="titulo-experimento">
                <div className="container">
                  <h2 id="titulo-experimento" className="h5 mb-3">
                    Experimento de eye-tracking
                  </h2>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setShowEyeTrackingExperiment(true)}
                    aria-expanded="false"
                    aria-controls="eye-tracking-content"
                  >
                    Participar en experimento de eye-tracking
                  </button>
                </div>
              </section>
            )}
            <ServiciosEstudiantiles />
            <OfertaAcademica />
            <Portales />
            <NoticiasSection />
            <ContactoSection />
          </>
        )}
      </main>
      <Footer />
      <PostulacionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Panel de resultados: Portal a document.body para quedar por encima de WebGazer y todo lo demás */}
      {showEyeTrackingResultsOverlay && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-labelledby="eye-tracking-results-title"
          aria-modal="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            zIndex: 2147483647,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.85)',
            padding: 16,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              color: '#212529',
              maxWidth: 420,
              width: '100%',
              padding: 24,
              borderRadius: 8,
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              boxSizing: 'border-box',
            }}
          >
            <h3 id="eye-tracking-results-title" style={{ margin: '0 0 12px 0', fontSize: '1.25rem', color: '#198754', fontWeight: 'bold' }}>
              Experimento finalizado
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: 14, lineHeight: 1.5, color: '#212529' }}>
              Genera y descarga el mapa de calor (PNG). Rojo/naranja = más miradas; azul = menos.
            </p>
            {heatmapGenerating && (
              <p style={{ margin: '0 0 12px 0', fontSize: 14, color: '#0d6efd' }}>Generando mapa de calor…</p>
            )}
            {heatmapPreviewURL && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ margin: '0 0 8px 0', fontSize: 13, color: '#495057' }}>Vista previa del mapa de calor:</p>
                <div style={{ position: 'relative', maxHeight: '50vh', overflow: 'auto', borderRadius: 8, border: '1px solid #dee2e6', background: '#1a1a1e' }}>
                  <img
                    src={heatmapPreviewURL}
                    alt="Mapa de calor del experimento"
                    style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '50vh', objectFit: 'contain' }}
                    onError={() => setHeatmapPreviewURL(null)}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-light"
                    style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                    onClick={() => setHeatmapPreviewURL(null)}
                    aria-label="Cerrar vista previa"
                  >
                    Cerrar vista previa
                  </button>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ minHeight: 44, cursor: heatmapGenerating ? 'wait' : 'pointer' }}
                disabled={heatmapGenerating}
                onClick={async () => {
                  const points = lastExperimentPoints.length > 0 ? lastExperimentPoints : (eyeTrackingPointsRef.current ?? []);
                  if (points.length === 0) {
                    alert('No se capturaron puntos de mirada durante el experimento. Asegúrate de permitir la cámara y de mirar la pantalla. Vuelve a iniciar el experimento.');
                    return;
                  }
                  setHeatmapGenerating(true);
                  try {
                    const dataURL = await exportHeatmapToPNG(points);
                    if (dataURL && (dataURL.startsWith('data:') || dataURL.startsWith('blob:'))) {
                      setHeatmapPreviewURL(dataURL);
                      try {
                        const a = document.createElement('a');
                        a.href = dataURL;
                        a.download = `mapa-calor-uisek-${new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '-')}.png`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      } catch (_) {}
                      if (dataURL.startsWith('blob:')) URL.revokeObjectURL(dataURL);
                    } else {
                      alert('No se pudo generar la imagen del mapa de calor. Vuelve a intentar.');
                    }
                  } finally {
                    setHeatmapGenerating(false);
                  }
                }}
              >
                {heatmapGenerating ? 'Generando…' : 'Generar y descargar mapa de calor (PNG)'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                style={{ minHeight: 44, cursor: 'pointer' }}
                onClick={() => {
                  setHeatmapPreviewURL(null);
                  setLastExperimentPoints([]);
                  eyeTrackingResultsRef.current?.closeResults?.();
                }}
              >
                Volver a iniciar
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Controles de accesibilidad globales */}
      <AccessibilityControls />

      {/* Estilos globales de accesibilidad */}
      <style>{`
        /* Skip link visible en foco */
        .skip-link:focus {
          top: 10px !important;
        }

        /* Foco visible mejorado - GLOBAL */
        *:focus-visible {
          outline: 3px solid #0066cc !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2) !important;
        }

        /* Elementos interactivos siempre accesibles */
        button, a, input, select, textarea {
          min-height: 44px;
        }

        /* Indicadores visuales para estados (deficiencia auditiva) */
        .form-control:focus,
        .form-select:focus {
          border-color: #0066cc !important;
          box-shadow: 0 0 0 0.25rem rgba(0, 102, 204, 0.25) !important;
        }

        .form-control:invalid {
          border-color: #dc3545 !important;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e") !important;
          background-repeat: no-repeat !important;
          background-position: right calc(0.375em + 0.1875rem) center !important;
          background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem) !important;
        }

        .form-control:valid {
          border-color: #198754 !important;
        }
      `}</style>
    </div>
  );
}

export default App;