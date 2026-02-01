import React from 'react';

export function Portales() {
  const portales = [
    { nombre: 'Revistas', icono: 'bi-journals', descripcion: 'Publicaciones académicas' },
    { nombre: 'Ser Mejores', icono: 'bi-award', descripcion: 'Programa de excelencia' },
    { nombre: 'Investigación', icono: 'bi-search', descripcion: 'Proyectos de investigación' },
    { nombre: 'Educación Continua', icono: 'bi-mortarboard', descripcion: 'Cursos y talleres' },
    { nombre: 'Centro de Carreras', icono: 'bi-building', descripcion: 'Orientación profesional' },
    { nombre: 'Vinculación', icono: 'bi-people', descripcion: 'Proyectos comunitarios' }
  ];

  return (
    <section className="py-5 border-top" id="portales" aria-labelledby="titulo-portales">
      <div className="container">
        <h3 id="titulo-portales" className="fw-light text-center mb-2" style={{ fontSize: '1.75rem' }}>
          Portales UISEK
        </h3>
        <p className="text-center text-muted mb-5">
          Accede a nuestros servicios digitales especializados
        </p>
        
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
          {portales.map((portal, index) => (
            <div key={index} className="col">
              <a 
                href={`#${portal.nombre.toLowerCase().replace(/\s+/g, '-')}`}
                className="d-flex flex-column align-items-center justify-content-center text-center text-decoration-none text-dark p-4 border rounded h-100"
                style={{ minHeight: '140px' }}
                aria-label={`${portal.nombre}: ${portal.descripcion}`}
              >
                <i className={`${portal.icono} fs-2 mb-3`} aria-hidden="true"></i>
                <span className="small lh-sm" style={{ wordWrap: 'break-word', hyphens: 'auto' }}>
                  {portal.nombre}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}