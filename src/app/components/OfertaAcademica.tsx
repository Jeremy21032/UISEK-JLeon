import React, { useState, useEffect } from 'react';
import { IMAGES } from '@/config/links';

export function OfertaAcademica() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const ofertas = [
    {
      titulo: 'Derecho',
      campus: 'Campus Quito',
      modalidades: ['Presencial diurna', 'Presencial nocturna'],
      idioma: 'ES',
      imagen: IMAGES.carreras.derecho
    },
    {
      titulo: 'Psicología',
      campus: 'Campus Quito',
      modalidades: ['Presencial diurna', 'Híbrida'],
      idioma: 'ES',
      imagen: IMAGES.carreras.psicologia
    },
    {
      titulo: 'Comunicación',
      campus: 'Campus Quito',
      modalidades: ['Presencial diurna'],
      idioma: 'ES',
      imagen: IMAGES.carreras.comunicacion
    },
    {
      titulo: 'Administración',
      campus: 'Campus Quito',
      modalidades: ['Presencial diurna', 'Presencial nocturna'],
      idioma: 'ES',
      imagen: IMAGES.carreras.administracion
    },
    {
      titulo: 'Arquitectura',
      campus: 'Campus Quito',
      modalidades: ['Presencial diurna'],
      idioma: 'ES',
      imagen: IMAGES.carreras.arquitectura
    },
    {
      titulo: 'Ingeniería',
      campus: 'Campus Quito',
      modalidades: ['Presencial diurna', 'Híbrida'],
      idioma: 'ES',
      imagen: IMAGES.carreras.software
    }
  ];

  // Agrupar ofertas: 1 en mobile, 3 en desktop
  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(ofertas.length / itemsPerSlide);

  // Funciones para controlar el carrusel
  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const renderCard = (oferta: typeof ofertas[0]) => (
    <article 
      className="card border-0 overflow-hidden shadow-sm h-100"
      style={{ borderRadius: '16px' }}
    >
      {/* Imagen de fondo */}
      <div 
        className="position-relative"
        style={{ height: '450px' }}
      >
        <img 
          src={oferta.imagen} 
          alt={`Herramientas y equipos relacionados con ${oferta.titulo}`}
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
        
        {/* Overlay superior con título y bookmark */}
        <div className="position-absolute top-0 start-0 w-100 p-4">
          <div className="d-flex justify-content-between align-items-start">
            <h4 className="text-white fw-bold mb-0" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)', fontSize: '1.5rem' }}>
              {oferta.titulo}
            </h4>
            <button 
              className="btn btn-link text-white p-0"
              aria-label={`Guardar programa de ${oferta.titulo} en favoritos`}
              style={{ fontSize: '24px', minHeight: '44px', minWidth: '44px' }}
            >
              <i className="bi bi-bookmark" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        
        {/* Overlay inferior con información */}
        <div 
          className="position-absolute bottom-0 start-0 w-100 p-4"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 70%, transparent 100%)'
          }}
        >
          <div className="text-white">
            <p className="small mb-3">
              <i className="bi bi-geo-alt-fill me-2" aria-hidden="true"></i>
              <span className="visually-hidden">Ubicación: </span>
              {oferta.campus}
            </p>
            
            <div className="d-flex flex-wrap gap-2 mb-3" role="list" aria-label="Modalidades disponibles">
              {oferta.modalidades.map((modalidad, idx) => (
                <span 
                  key={idx}
                  className="badge px-3 py-2 fw-normal"
                  role="listitem"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '20px'
                  }}
                >
                  {modalidad}
                </span>
              ))}
            </div>
            
            <p className="small mb-0">
              <i className="bi bi-translate me-2" aria-hidden="true"></i>
              <span className="visually-hidden">Idioma: </span>
              Español
            </p>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <section className="py-5 bg-light" id="oferta" aria-labelledby="titulo-oferta">
      <div className="container py-4">
        <h2 id="titulo-oferta" className="text-center fw-bold mb-5 display-6">
          Programas de pregrado
        </h2>
        
        <div className="position-relative" aria-label="Carrousel de programas de pregrado">
          <div className="overflow-hidden">
            {Array.from({ length: totalSlides }, (_, slideIndex) => {
              const startIdx = slideIndex * itemsPerSlide;
              const slideItems = ofertas.slice(startIdx, startIdx + itemsPerSlide);
              
              return (
                <div 
                  key={slideIndex} 
                  className={`${slideIndex === activeSlide ? '' : 'd-none'}`}
                  role="group"
                  aria-label={`Grupo ${slideIndex + 1} de ${totalSlides}`}
                  aria-live="polite"
                >
                  <div className="row g-4 px-3 px-lg-5 justify-content-center">
                    {slideItems.map((oferta, idx) => (
                      <div key={startIdx + idx} className="col-12 col-lg-4">
                        {renderCard(oferta)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Controles del carousel - Flechas */}
          <button 
            className="position-absolute start-0 top-50 translate-middle-y border-0 bg-transparent"
            type="button" 
            onClick={prevSlide}
            style={{ width: '48px', zIndex: 10 }}
            aria-label="Ver programas anteriores"
          >
            <span 
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{ 
                width: '48px', 
                height: '48px', 
                backgroundColor: 'rgba(0,0,0,0.6)',
                cursor: 'pointer'
              }}
              aria-hidden="true"
            >
              <i className="bi bi-chevron-left text-white" style={{ fontSize: '1.5rem' }}></i>
            </span>
          </button>
          
          <button 
            className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent"
            type="button" 
            onClick={nextSlide}
            style={{ width: '48px', zIndex: 10 }}
            aria-label="Ver programas siguientes"
          >
            <span 
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{ 
                width: '48px', 
                height: '48px', 
                backgroundColor: 'rgba(0,0,0,0.6)',
                cursor: 'pointer'
              }}
              aria-hidden="true"
            >
              <i className="bi bi-chevron-right text-white" style={{ fontSize: '1.5rem' }}></i>
            </span>
          </button>
        </div>
        
        {/* Indicadores personalizados */}
        <div className="d-flex justify-content-center gap-2 mt-4" role="group" aria-label="Indicadores de página del carrousel">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              className={`border-0 ${i === activeSlide ? 'bg-dark' : 'bg-secondary'}`}
              style={{
                width: i === activeSlide ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                transition: 'all 0.3s',
                minHeight: '8px',
                cursor: 'pointer'
              }}
              aria-current={i === activeSlide ? 'true' : 'false'}
              aria-label={`Ir a página ${i + 1} de ${totalSlides}`}
            ></button>
          ))}
        </div>

        <div className="text-center mt-5">
          <a href="#todos-pregrados" className="btn btn-outline-dark px-4" style={{ minHeight: '48px' }}>
            Explorar todos los programas de pregrado
            <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
}