import React, { useState } from 'react';
import { IMAGES } from '@/config/links';

interface NavigationProps {
  onOpenEyeTracking?: () => void;
}

export function Navigation({ onOpenEyeTracking }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header role="banner">
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top" aria-label="Navegación principal">
        <div className="container-fluid px-3 px-lg-4 py-1">
          <a className="navbar-brand" href="#home" aria-label="Ir al inicio de Universidad Internacional SEK">
            <img 
              src={IMAGES.logoAzul}
              alt="Universidad Internacional SEK Ecuador"
              className="logo-img"
            />
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="navbarNav"
            aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            style={{ minHeight: '48px', minWidth: '48px' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto gap-1 gap-lg-3">
              <li className="nav-item">
                <a className="nav-link py-2 py-lg-0" href="#home" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link py-2 py-lg-0" href="#admisiones" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Admisiones</a>
              </li>
              <li className="nav-item">
                <a className="nav-link py-2 py-lg-0" href="#home" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Universidad</a>
              </li>
              <li className="nav-item">
                <a className="nav-link py-2 py-lg-0" href="#oferta-academica" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Oferta académica</a>
              </li>
              <li className="nav-item">
                <a className="nav-link py-2 py-lg-0" href="#home" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Estudiantes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link py-2 py-lg-0" href="#contacto-footer" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Contacto</a>
              </li>
              {onOpenEyeTracking && (
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-primary nav-link py-2 py-lg-0 d-flex align-items-center"
                    style={{ minHeight: '44px', fontWeight: '600' }}
                    onClick={() => {
                      setIsOpen(false);
                      onOpenEyeTracking();
                    }}
                    aria-label="Participar en el experimento de eye-tracking"
                  >
                    Participar en experimento
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}