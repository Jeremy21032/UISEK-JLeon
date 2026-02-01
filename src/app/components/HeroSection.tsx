import React from 'react';
import { IMAGES } from '@/config/links';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="min-vh-100" aria-label="Bienvenida a UISEK">
      <div className="container-fluid h-100 p-0">
        <div className="row g-0 flex-column-reverse flex-lg-row min-vh-100">
          {/* Contenido - Primero en mobile */}
          <div className="col-lg-6 bg-dark text-white d-flex align-items-center">
            <div className="px-4 py-5 w-100" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="mb-3 mb-md-4">
                <span className="badge bg-primary px-3 py-2" style={{ fontSize: '0.875rem' }}>
                  Admisiones abiertas 2026
                </span>
              </div>
              
              <h1 className="mb-3 mb-md-4" style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: '300', lineHeight: '1.2' }}>
                Construye tu futuro con UISEK
              </h1>
              
              <p className="mb-4" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7' }}>
                Agenda una visita a la Universidad Internacional SEK, explora cada rincón 
                del campus y recibe asesoría personalizada. Descubre nuestras instalaciones 
                de primer nivel y obtén orientación completa sobre las carreras que ofrecemos 
                para encontrar la opción perfecta que impulse tu desarrollo profesional.
              </p>
              
              <button 
                onClick={onOpenModal}
                className="btn btn-primary btn-lg w-100 w-sm-auto"
                style={{ minHeight: '48px' }}
                aria-label="Abrir formulario de postulación"
              >
                Postular ahora
                <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          {/* Imagen - Segundo en mobile */}
          <div className="col-lg-6" style={{ minHeight: '300px' }}>
            <img
              src={IMAGES.hero}
              alt="Grupo de estudiantes universitarios colaborando en el campus de UISEK con laptops y materiales de estudio"
              className="w-100 h-100"
              style={{ objectFit: 'cover', minHeight: '300px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}