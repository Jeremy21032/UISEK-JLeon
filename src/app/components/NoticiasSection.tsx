import React from 'react';
import { IMAGES, FORMS } from '@/config/links';

export function NoticiasSection() {
  return (
    <section className="py-5" id="noticias" aria-labelledby="titulo-noticias">
      <div className="container-fluid p-0">
        <div className="row g-0 flex-column flex-lg-row">
          {/* Contenido - Primero en mobile */}
          <div className="col-lg-6 bg-dark text-white d-flex align-items-center order-1 order-lg-1">
            <div className="px-4 py-5 w-100" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h2 id="titulo-noticias" className="mb-3 mb-md-4" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: '300', lineHeight: '1.2' }}>
                Únete a nuestro equipo docente
              </h2>
              <p className="mb-4" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6' }}>
                Forma parte de una institución comprometida con la excelencia académica 
                y el desarrollo profesional continuo. Contribuye al futuro de nuevas generaciones.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <a 
                  href={FORMS.postulacion} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-100 w-sm-auto"
                  style={{ minHeight: '48px', padding: '0.5rem 1.5rem' }}
                  aria-label="Abrir formulario de postulación docente en Google Forms (se abre en nueva pestaña)"
                >
                  Formulario de postulación
                  <i className="bi bi-box-arrow-up-right ms-2" aria-hidden="true"></i>
                </a>
                <a 
                  href="#ficha" 
                  className="btn btn-outline-light w-100 w-sm-auto"
                  style={{ minHeight: '48px', padding: '0.5rem 1.5rem' }}
                >
                  Ficha de datos
                </a>
              </div>
            </div>
          </div>

          {/* Imagen - Segundo en mobile */}
          <div className="col-lg-6 order-2 order-lg-2" style={{ minHeight: '300px' }}>
            <img
              src={IMAGES.noticiasEquipo}
              alt="Equipo de profesionales trabajando en colaboración en oficinas de UISEK"
              className="w-100 h-100"
              style={{ objectFit: 'cover', minHeight: '300px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}