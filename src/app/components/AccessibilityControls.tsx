import React, { useState, useEffect } from 'react';

interface AccessibilityControlsProps {
  onFontSizeChange?: (size: 'normal' | 'large' | 'xlarge') => void;
}

export function AccessibilityControls({ onFontSizeChange }: AccessibilityControlsProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar preferencias guardadas al montar
  useEffect(() => {
    const savedFontSize = localStorage.getItem('accessibility-font-size') as 'normal' | 'large' | 'xlarge' | null;
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true';
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion') === 'true';

    if (savedFontSize) {
      setFontSize(savedFontSize);
      document.documentElement.classList.add(`font-size-${savedFontSize}`);
    }
    
    if (savedHighContrast) {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast-mode');
    }

    if (savedReducedMotion) {
      setReducedMotion(true);
      document.documentElement.classList.add('reduced-motion');
    }

    // Detectar preferencia del sistema para movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches && !savedReducedMotion) {
      setReducedMotion(true);
      document.documentElement.classList.add('reduced-motion');
    }
  }, []);

  // Mejora 1: Control de tamaño de fuente global
  const handleFontSizeChange = (size: 'normal' | 'large' | 'xlarge') => {
    // Remover clases anteriores
    document.documentElement.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
    
    // Agregar nueva clase
    document.documentElement.classList.add(`font-size-${size}`);
    
    setFontSize(size);
    localStorage.setItem('accessibility-font-size', size);
    
    if (onFontSizeChange) {
      onFontSizeChange(size);
    }

    // Anunciar cambio para lectores de pantalla
    announceToScreenReader(`Tamaño de texto cambiado a ${size === 'normal' ? 'normal' : size === 'large' ? 'grande' : 'extra grande'}`);
  };

  // Mejora 2: Modo de alto contraste (para daltonismo y baja visión)
  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('high-contrast-mode');
      localStorage.setItem('accessibility-high-contrast', 'true');
      announceToScreenReader('Modo de alto contraste activado');
      // Cerrar el modal para ver el cambio inmediatamente
      setIsOpen(false);
    } else {
      document.documentElement.classList.remove('high-contrast-mode');
      localStorage.setItem('accessibility-high-contrast', 'false');
      announceToScreenReader('Modo de alto contraste desactivado');
      // Cerrar el modal para ver el cambio inmediatamente
      setIsOpen(false);
    }
  };

  // Mejora 3: Reducción de animaciones (para sensibilidad al movimiento)
  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('reduced-motion');
      localStorage.setItem('accessibility-reduced-motion', 'true');
      announceToScreenReader('Animaciones reducidas activadas');
    } else {
      document.documentElement.classList.remove('reduced-motion');
      localStorage.setItem('accessibility-reduced-motion', 'false');
      announceToScreenReader('Animaciones reducidas desactivadas');
    }
  };

  // Resetear todas las preferencias
  const resetPreferences = () => {
    document.documentElement.classList.remove('font-size-large', 'font-size-xlarge', 'high-contrast-mode', 'reduced-motion');
    setFontSize('normal');
    setHighContrast(false);
    setReducedMotion(false);
    localStorage.removeItem('accessibility-font-size');
    localStorage.removeItem('accessibility-high-contrast');
    localStorage.removeItem('accessibility-reduced-motion');
    announceToScreenReader('Preferencias de accesibilidad restablecidas');
  };

  // Función auxiliar para anuncios a lectores de pantalla
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <>
      {/* Botón flotante para abrir panel */}
      <button
        type="button"
        className="position-fixed bg-primary text-white border-0 rounded-circle d-flex align-items-center justify-content-center focus-visible-outline"
        style={{
          bottom: '20px',
          right: '20px',
          width: '56px',
          height: '56px',
          zIndex: 1030,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir panel de accesibilidad"
        aria-expanded={isOpen}
        title="Opciones de accesibilidad"
      >
        <i className="bi bi-universal-access" style={{ fontSize: '1.5rem' }} aria-hidden="true"></i>
      </button>

      {/* Panel de controles de accesibilidad */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark accessibility-overlay"
            style={{ opacity: 0.5, zIndex: 1040 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          ></div>

          {/* Panel */}
          <aside
            className="position-fixed bg-white shadow-lg accessibility-panel"
            style={{
              bottom: '90px',
              right: '20px',
              width: '320px',
              maxHeight: '600px',
              zIndex: 1050,
              borderRadius: '8px',
              overflowY: 'auto'
            }}
            role="dialog"
            aria-labelledby="accessibility-title"
            aria-modal="false"
          >
            <div className="p-4">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h5 id="accessibility-title" className="mb-1" style={{ fontSize: '1.25rem' }}>
                    <i className="bi bi-universal-access text-primary me-2" aria-hidden="true"></i>
                    Accesibilidad
                  </h5>
                  <p className="small text-muted mb-0">
                    Personaliza tu experiencia
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar panel de accesibilidad"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                ></button>
              </div>

              {/* Controles */}
              <div className="border-bottom pb-4 mb-4">
                <h6 className="mb-3" style={{ fontSize: '1rem' }}>
                  <i className="bi bi-type text-primary me-2" aria-hidden="true"></i>
                  Tamaño de texto
                </h6>
                <div className="btn-group w-100" role="group" aria-label="Seleccionar tamaño de texto">
                  <button
                    type="button"
                    className={`btn ${fontSize === 'normal' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => handleFontSizeChange('normal')}
                    aria-pressed={fontSize === 'normal'}
                    style={{ minHeight: '44px' }}
                  >
                    <span style={{ fontSize: '0.9rem' }}>A</span>
                  </button>
                  <button
                    type="button"
                    className={`btn ${fontSize === 'large' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => handleFontSizeChange('large')}
                    aria-pressed={fontSize === 'large'}
                    style={{ minHeight: '44px' }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>A</span>
                  </button>
                  <button
                    type="button"
                    className={`btn ${fontSize === 'xlarge' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => handleFontSizeChange('xlarge')}
                    aria-pressed={fontSize === 'xlarge'}
                    style={{ minHeight: '44px' }}
                  >
                    <span style={{ fontSize: '1.3rem' }}>A</span>
                  </button>
                </div>
              </div>

              {/* Alto Contraste */}
              <div className="border-bottom pb-4 mb-4">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="flex-grow-1">
                    <h6 className="mb-1" style={{ fontSize: '1rem' }}>
                      <i className="bi bi-circle-half text-primary me-2" aria-hidden="true"></i>
                      Alto contraste
                    </h6>
                    <p className="small text-muted mb-0">
                      Mejora la legibilidad para daltonismo y baja visión
                    </p>
                  </div>
                  <div className="form-check form-switch ms-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="high-contrast-switch"
                      checked={highContrast}
                      onChange={toggleHighContrast}
                      style={{ minWidth: '44px', minHeight: '24px' }}
                    />
                    <label className="form-check-label visually-hidden" htmlFor="high-contrast-switch">
                      Activar modo de alto contraste
                    </label>
                  </div>
                </div>
              </div>

              {/* Reducir Animaciones */}
              <div className="border-bottom pb-4 mb-4">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="flex-grow-1">
                    <h6 className="mb-1" style={{ fontSize: '1rem' }}>
                      <i className="bi bi-pause-circle text-primary me-2" aria-hidden="true"></i>
                      Reducir movimiento
                    </h6>
                    <p className="small text-muted mb-0">
                      Minimiza animaciones y transiciones
                    </p>
                  </div>
                  <div className="form-check form-switch ms-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="reduced-motion-switch"
                      checked={reducedMotion}
                      onChange={toggleReducedMotion}
                      style={{ minWidth: '44px', minHeight: '24px' }}
                    />
                    <label className="form-check-label visually-hidden" htmlFor="reduced-motion-switch">
                      Activar reducción de animaciones
                    </label>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="bg-light p-3 rounded mb-3">
                <h6 className="mb-2" style={{ fontSize: '1rem' }}>
                  <i className="bi bi-info-circle text-primary me-2" aria-hidden="true"></i>
                  Otras características
                </h6>
                <ul className="small mb-0 ps-3">
                  <li>Navegación por teclado (Tab)</li>
                  <li>Compatible con lectores de pantalla</li>
                  <li>Indicadores visuales claros</li>
                  <li>Textos alternativos en imágenes</li>
                </ul>
              </div>

              {/* Botón de reset */}
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={resetPreferences}
                style={{ minHeight: '44px' }}
              >
                <i className="bi bi-arrow-clockwise me-2" aria-hidden="true"></i>
                Restablecer preferencias
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Estilos globales de accesibilidad */}
      <style>{`
        /* Tamaños de fuente ajustables - GLOBAL */
        html.font-size-large {
          font-size: 112.5%; /* 18px */
        }

        html.font-size-xlarge {
          font-size: 125%; /* 20px */
        }

        /* Modo de alto contraste - para daltonismo y baja visión */
        html.high-contrast-mode {
          --bs-body-bg: #000000 !important;
          --bs-body-color: #FFFFFF !important;
        }

        html.high-contrast-mode body {
          background-color: #000000 !important;
          color: #FFFFFF !important;
        }

        /* Fondos claros → Negro con texto blanco */
        html.high-contrast-mode .bg-white,
        html.high-contrast-mode .bg-light {
          background-color: #000000 !important;
          color: #FFFFFF !important;
        }

        /* Fondos oscuros → Blanco con texto negro */
        html.high-contrast-mode .bg-dark {
          background-color: #FFFFFF !important;
          color: #000000 !important;
        }

        /* Todos los textos oscuros → Blanco */
        html.high-contrast-mode .text-dark,
        html.high-contrast-mode .text-muted,
        html.high-contrast-mode .text-secondary {
          color: #FFFFFF !important;
        }

        /* Textos blancos en secciones oscuras → Negro */
        html.high-contrast-mode .bg-dark .text-white,
        html.high-contrast-mode .bg-dark h1,
        html.high-contrast-mode .bg-dark h2,
        html.high-contrast-mode .bg-dark h3,
        html.high-contrast-mode .bg-dark h4,
        html.high-contrast-mode .bg-dark p {
          color: #000000 !important;
        }

        /* Textos blancos en general → Solo invertir si están en fondo oscuro que ahora es blanco */
        html.high-contrast-mode .text-white {
          color: #000000 !important;
        }

        /* Botones primarios → Amarillo brillante sobre negro */
        html.high-contrast-mode .btn-primary {
          background-color: #FFFF00 !important;
          border-color: #FFFF00 !important;
          color: #000000 !important;
        }

        html.high-contrast-mode .btn-primary:hover {
          background-color: #FFFF00 !important;
          filter: brightness(0.9);
        }

        /* Botones claros → Borde blanco con texto blanco */
        html.high-contrast-mode .btn-light {
          background-color: #000000 !important;
          border-color: #FFFFFF !important;
          color: #FFFFFF !important;
        }

        html.high-contrast-mode .btn-light:hover {
          background-color: #FFFFFF !important;
          color: #000000 !important;
        }

        /* Botones outline claros → Borde blanco */
        html.high-contrast-mode .btn-outline-light,
        html.high-contrast-mode .btn-outline-secondary {
          border-color: #FFFFFF !important;
          color: #FFFFFF !important;
          background-color: transparent !important;
        }

        html.high-contrast-mode .btn-outline-light:hover,
        html.high-contrast-mode .btn-outline-secondary:hover {
          background-color: #FFFFFF !important;
          color: #000000 !important;
        }

        /* Botones oscuros en fondos que se invierten */
        html.high-contrast-mode .bg-white .btn-dark,
        html.high-contrast-mode .bg-light .btn-dark {
          background-color: #FFFFFF !important;
          border-color: #FFFFFF !important;
          color: #000000 !important;
        }

        /* Enlaces → Amarillo brillante siempre */
        html.high-contrast-mode .text-primary,
        html.high-contrast-mode a:not(.btn) {
          color: #FFFF00 !important;
        }

        html.high-contrast-mode a:hover:not(.btn) {
          color: #FFFF00 !important;
          text-decoration: underline !important;
        }

        /* Bordes → Blanco */
        html.high-contrast-mode .border,
        html.high-contrast-mode .border-bottom,
        html.high-contrast-mode .border-dark,
        html.high-contrast-mode .border-secondary {
          border-color: #FFFFFF !important;
        }

        /* Imágenes → Mayor contraste */
        html.high-contrast-mode img {
          filter: contrast(1.2) brightness(1.1);
        }

        /* Navbar */
        html.high-contrast-mode .navbar {
          background-color: #000000 !important;
          border-bottom: 2px solid #FFFFFF !important;
        }

        html.high-contrast-mode .navbar .nav-link {
          color: #FFFFFF !important;
        }

        html.high-contrast-mode .navbar .nav-link:hover {
          color: #FFFF00 !important;
        }

        /* Footer */
        html.high-contrast-mode footer {
          background-color: #000000 !important;
          color: #FFFFFF !important;
          border-top: 2px solid #FFFFFF !important;
        }

        /* Cards y artículos */
        html.high-contrast-mode article,
        html.high-contrast-mode .card {
          background-color: #000000 !important;
          color: #FFFFFF !important;
          border: 1px solid #FFFFFF !important;
        }

        /* Formularios */
        html.high-contrast-mode .form-control,
        html.high-contrast-mode .form-select {
          background-color: #000000 !important;
          color: #FFFFFF !important;
          border: 2px solid #FFFFFF !important;
        }

        html.high-contrast-mode .form-control:focus,
        html.high-contrast-mode .form-select:focus {
          background-color: #000000 !important;
          color: #FFFFFF !important;
          border-color: #FFFF00 !important;
          box-shadow: 0 0 0 0.25rem rgba(255, 255, 0, 0.25) !important;
        }

        /* Elementos con opacity → Remover para máximo contraste */
        html.high-contrast-mode [style*="opacity"] {
          opacity: 1 !important;
        }

        /* Modal */
        html.high-contrast-mode .modal-content {
          background-color: #000000 !important;
          color: #FFFFFF !important;
          border: 2px solid #FFFFFF !important;
        }

        html.high-contrast-mode .modal-header {
          border-bottom: 1px solid #FFFFFF !important;
        }

        html.high-contrast-mode .btn-close {
          filter: invert(1) brightness(2);
        }

        /* Panel de accesibilidad mismo */
        html.high-contrast-mode aside[role="dialog"] {
          background-color: #000000 !important;
          color: #FFFFFF !important;
          border: 2px solid #FFFFFF !important;
        }

        /* Iconos bi (Bootstrap Icons) */
        html.high-contrast-mode .bi {
          color: inherit !important;
        }

        /* Skip link */
        html.high-contrast-mode .skip-link {
          background-color: #FFFF00 !important;
          color: #000000 !important;
        }

        /* Elementos pequeños de texto */
        html.high-contrast-mode .small,
        html.high-contrast-mode small {
          color: inherit !important;
        }

        /* OVERLAY Y PANEL DE ACCESIBILIDAD EN MODO ALTO CONTRASTE */
        /* Overlay → Negro semi-transparente para que no bloquee totalmente la vista */
        html.high-contrast-mode .accessibility-overlay {
          background-color: #000000 !important;
          opacity: 0.8 !important;
        }

        /* Panel → Negro con borde blanco brillante y mayor contraste */
        html.high-contrast-mode .accessibility-panel {
          background-color: #000000 !important;
          color: #FFFFFF !important;
          border: 3px solid #FFFFFF !important;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5) !important;
        }

        /* Textos dentro del panel de accesibilidad */
        html.high-contrast-mode .accessibility-panel h2,
        html.high-contrast-mode .accessibility-panel h3,
        html.high-contrast-mode .accessibility-panel p,
        html.high-contrast-mode .accessibility-panel li {
          color: #FFFFFF !important;
        }

        /* Sección de información del panel */
        html.high-contrast-mode .accessibility-panel .bg-light {
          background-color: #1a1a1a !important;
          border: 1px solid #FFFFFF !important;
        }

        /* Botón flotante de accesibilidad en modo alto contraste */
        html.high-contrast-mode .focus-visible-outline {
          background-color: #FFFF00 !important;
          color: #000000 !important;
          border: 2px solid #FFFFFF !important;
        }

        /* Switch en modo alto contraste */
        html.high-contrast-mode .form-check-input {
          background-color: #FFFFFF !important;
          border-color: #FFFFFF !important;
        }

        html.high-contrast-mode .form-check-input:checked {
          background-color: #FFFF00 !important;
          border-color: #FFFF00 !important;
        }

        /* Reducción de animaciones - para sensibilidad al movimiento */
        html.reduced-motion,
        html.reduced-motion *,
        html.reduced-motion *::before,
        html.reduced-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }

        /* Respetar preferencia del sistema */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
}