import React from 'react';
import { Navigation } from '@/app/components/Navigation';
import { Footer } from '@/app/components/Footer';
import { CONTACT } from '@/config/links';

export function AdmisionesPage() {
  const pasos = [
    {
      numero: 1,
      titulo: 'Completa tu postulación',
      descripcion: 'Llena el formulario en línea con tus datos personales y académicos',
      icono: 'bi-file-earmark-text'
    },
    {
      numero: 2,
      titulo: 'Entrevista personal',
      descripcion: 'Agenda una cita con nuestro equipo de admisiones para conocerte mejor',
      icono: 'bi-people'
    },
    {
      numero: 3,
      titulo: 'Evaluación académica',
      descripcion: 'Presenta el examen de admisión y entrega tus documentos académicos',
      icono: 'bi-clipboard-check'
    },
    {
      numero: 4,
      titulo: 'Recibe tu respuesta',
      descripcion: 'Te notificaremos los resultados y pasos a seguir en un plazo de 5 días',
      icono: 'bi-check-circle'
    }
  ];

  const requisitos = [
    {
      categoria: 'Documentos personales',
      items: [
        'Copia de cédula de identidad a color (ambos lados)',
        'Certificado de votación actualizado',
        'Dos fotografías tamaño carné a color',
        'Partida de nacimiento original'
      ]
    },
    {
      categoria: 'Documentos académicos',
      items: [
        'Título de bachiller notarizado o acta de grado original',
        'Certificado de notas de bachillerato',
        'Record académico de educación secundaria',
        'Certificado de conducta de la institución de procedencia'
      ]
    },
    {
      categoria: 'Documentos adicionales',
      items: [
        'Certificado de salud emitido por un centro médico',
        'Certificado de tipo de sangre',
        'Carta de motivación (opcional)',
        'Certificados de cursos o reconocimientos (opcional)'
      ]
    }
  ];

  const fechas = [
    {
      periodo: 'Primer período 2026',
      inscripcion: 'Enero - Febrero 2026',
      examen: '15 de Febrero 2026',
      inicio: '1 de Marzo 2026'
    },
    {
      periodo: 'Segundo período 2026',
      inscripcion: 'Julio - Agosto 2026',
      examen: '20 de Agosto 2026',
      inicio: '1 de Septiembre 2026'
    }
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      
      <main id="main-content">
        {/* Hero Section - Negro */}
        <section 
          className="bg-dark text-white"
          style={{ paddingTop: '80px', paddingBottom: '80px' }}
          aria-labelledby="hero-titulo"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h1 
                  id="hero-titulo" 
                  className="mb-3"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '700', lineHeight: '1.2' }}
                >
                  Proceso de admisiones
                </h1>
                <p 
                  className="mb-4"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', lineHeight: '1.6', opacity: '0.9' }}
                >
                  Tu camino hacia la excelencia académica comienza aquí. Conoce todo el proceso 
                  para formar parte de la comunidad UISEK
                </p>
                <a 
                  href="#home" 
                  className="btn btn-primary btn-lg px-5"
                  style={{ minHeight: '48px' }}
                >
                  Iniciar mi postulación
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pasos del proceso */}
        <section className="py-5 bg-white" aria-labelledby="pasos-titulo">
          <div className="container py-4">
            <h2 id="pasos-titulo" className="text-center mb-5" style={{ fontSize: '2rem', fontWeight: '600' }}>
              ¿Cómo postular a UISEK?
            </h2>
            
            <div className="row g-4">
              {pasos.map((paso, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-3">
                  <article className="text-center h-100">
                    <div 
                      className="border border-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '80px', height: '80px' }}
                      aria-hidden="true"
                    >
                      <i className={`bi ${paso.icono} text-primary`} style={{ fontSize: '2rem' }}></i>
                    </div>
                    <div 
                      className="badge bg-dark text-white mb-3"
                      style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                    >
                      Paso {paso.numero}
                    </div>
                    <h5 className="mb-3" style={{ fontWeight: '600', fontSize: '1.25rem' }}>
                      {paso.titulo}
                    </h5>
                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                      {paso.descripcion}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requisitos */}
        <section className="py-5 bg-light" aria-labelledby="requisitos-titulo">
          <div className="container py-4">
            <div className="row mb-5">
              <div className="col-lg-8 mx-auto text-center">
                <h2 id="requisitos-titulo" className="mb-3" style={{ fontSize: '2rem', fontWeight: '600' }}>
                  Requisitos de admisión
                </h2>
                <p style={{ fontSize: '1.05rem' }}>
                  Prepara los siguientes documentos para completar tu proceso de admisión
                </p>
              </div>
            </div>

            <div className="row g-4">
              {requisitos.map((req, index) => (
                <div key={index} className="col-12 col-lg-4">
                  <article className="card border h-100">
                    <div className="card-body p-4">
                      <h5 className="mb-4 text-primary" style={{ fontWeight: '600', fontSize: '1.25rem' }}>
                        <i className="bi bi-folder2-open me-2" aria-hidden="true"></i>
                        {req.categoria}
                      </h5>
                      <ul className="list-unstyled" style={{ fontSize: '0.95rem', lineHeight: '2' }}>
                        {req.items.map((item, idx) => (
                          <li key={idx} className="mb-2">
                            <i className="bi bi-check-circle text-primary me-2" aria-hidden="true"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="card border">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-info-circle text-primary me-3 mt-1" aria-hidden="true" style={{ fontSize: '1.5rem' }}></i>
                      <div>
                        <strong>Importante:</strong> Todos los documentos deben estar legalizados y en buen estado. 
                        Los documentos emitidos en el extranjero deben estar apostillados y traducidos al español por un traductor oficial.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fechas importantes */}
        <section className="py-5 bg-white" aria-labelledby="fechas-titulo">
          <div className="container py-4">
            <div className="row mb-5">
              <div className="col-lg-8 mx-auto text-center">
                <h2 id="fechas-titulo" className="mb-3" style={{ fontSize: '2rem', fontWeight: '600' }}>
                  Fechas importantes 2026
                </h2>
                <p style={{ fontSize: '1.05rem' }}>
                  Planifica tu ingreso a UISEK con nuestro calendario académico
                </p>
              </div>
            </div>

            <div className="row g-4 justify-content-center">
              {fechas.map((fecha, index) => (
                <div key={index} className="col-12 col-lg-5">
                  <article className="card border">
                    <div className="card-header bg-dark text-white text-center py-3">
                      <h5 className="mb-0" style={{ fontWeight: '600', fontSize: '1.25rem' }}>
                        {fecha.periodo}
                      </h5>
                    </div>
                    <div className="card-body p-4">
                      <ul className="list-unstyled mb-0" style={{ fontSize: '1rem', lineHeight: '2.5' }}>
                        <li className="d-flex align-items-center mb-2">
                          <i className="bi bi-calendar-event text-primary me-3" aria-hidden="true" style={{ fontSize: '1.25rem' }}></i>
                          <div>
                            <strong>Inscripciones:</strong> {fecha.inscripcion}
                          </div>
                        </li>
                        <li className="d-flex align-items-center mb-2">
                          <i className="bi bi-pencil-square text-primary me-3" aria-hidden="true" style={{ fontSize: '1.25rem' }}></i>
                          <div>
                            <strong>Examen de admisión:</strong> {fecha.examen}
                          </div>
                        </li>
                        <li className="d-flex align-items-center">
                          <i className="bi bi-mortarboard text-primary me-3" aria-hidden="true" style={{ fontSize: '1.25rem' }}></i>
                          <div>
                            <strong>Inicio de clases:</strong> {fecha.inicio}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final - Negro */}
        <section className="py-5 bg-dark text-white">
          <div className="container py-4">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="mb-4" style={{ fontSize: '2rem', fontWeight: '600' }}>
                  ¿Listo para comenzar tu futuro en UISEK?
                </h2>
                <p className="mb-4" style={{ fontSize: '1.1rem', opacity: '0.9' }}>
                  Nuestro equipo de admisiones está disponible para resolver todas tus dudas 
                  y acompañarte durante todo el proceso
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
                  <a 
                    href="#home" 
                    className="btn btn-primary btn-lg"
                    style={{ minHeight: '48px' }}
                  >
                    <i className="bi bi-file-earmark-text me-2" aria-hidden="true"></i>
                    Postular ahora
                  </a>
                  <a 
                    href="#contacto" 
                    className="btn btn-outline-light btn-lg"
                    style={{ minHeight: '48px' }}
                  >
                    <i className="bi bi-chat-dots me-2" aria-hidden="true"></i>
                    Contactar admisiones
                  </a>
                </div>
                
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="p-3 border border-white rounded">
                      <i className="bi bi-telephone-fill text-primary mb-2" style={{ fontSize: '1.5rem' }} aria-hidden="true"></i>
                      <div className="small mb-1" style={{ opacity: '0.8' }}>Teléfono</div>
                      <a href="tel:+5932999999999" className="text-white text-decoration-none">
                        (02) 999-9999
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 border border-white rounded">
                      <i className="bi bi-envelope-fill text-primary mb-2" style={{ fontSize: '1.5rem' }} aria-hidden="true"></i>
                      <div className="small mb-1" style={{ opacity: '0.8' }}>Correo</div>
                      <a href="mailto:admisiones@uisek.edu.ec" className="text-white text-decoration-none" style={{ fontSize: '0.9rem' }}>
                        admisiones@uisek.edu.ec
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 border border-white rounded">
                      <i className="bi bi-whatsapp text-primary mb-2" style={{ fontSize: '1.5rem' }} aria-hidden="true"></i>
                      <div className="small mb-1" style={{ opacity: '0.8' }}>WhatsApp</div>
                      <a href={CONTACT.whatsappAdmisiones} className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">
                        099 999 9999
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
