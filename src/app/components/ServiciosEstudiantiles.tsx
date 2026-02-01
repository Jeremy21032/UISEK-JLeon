import React from 'react';

export function ServiciosEstudiantiles() {
  const servicios = [
    { nombre: 'Bienestar Estudiantil', icono: 'bi-heart-pulse', descripcion: 'Apoyo integral al estudiante' },
    { nombre: 'Internacionalización', icono: 'bi-globe-americas', descripcion: 'Programas de intercambio' },
    { nombre: 'Bolsa de Empleo', icono: 'bi-briefcase', descripcion: 'Oportunidades laborales' },
    { nombre: 'Biblioteca', icono: 'bi-book', descripcion: 'Recursos académicos digitales' },
    { nombre: 'Repositorio Digital', icono: 'bi-database', descripcion: 'Acceso a investigaciones' },
    { nombre: 'Instituto de Idiomas', icono: 'bi-translate', descripcion: 'Cursos de idiomas' }
  ];

  return (
    <section className="py-5 border-top" id="servicios" aria-labelledby="titulo-servicios">
      <div className="container">
        <h3 id="titulo-servicios" className="fw-light text-center mb-5" style={{ fontSize: '1.75rem' }}>
          Servicios estudiantiles
        </h3>
        
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
          {servicios.map((servicio, index) => (
            <div key={index} className="col">
              <a 
                href={`#${servicio.nombre.toLowerCase().replace(/\s+/g, '-')}`} 
                className="d-flex flex-column align-items-center justify-content-center text-center text-decoration-none text-dark p-4 border rounded h-100"
                style={{ minHeight: '140px' }}
                aria-label={`${servicio.nombre}: ${servicio.descripcion}`}
              >
                <i className={`${servicio.icono} fs-2 mb-3`} aria-hidden="true"></i>
                <span className="small lh-sm" style={{ wordWrap: 'break-word', hyphens: 'auto' }}>
                  {servicio.nombre}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}