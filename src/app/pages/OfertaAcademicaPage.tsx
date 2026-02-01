import React, { useState } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { Footer } from '@/app/components/Footer';
import { IMAGES } from '@/config/links';

export function OfertaAcademicaPage() {
  const [activeCategory, setActiveCategory] = useState<string>('pregrado');

  const categorias = [
    { id: 'pregrado', nombre: 'Pregrado', icono: 'bi-mortarboard' },
    { id: 'posgrado', nombre: 'Posgrado', icono: 'bi-award' },
    { id: 'online', nombre: 'UISEK Online', icono: 'bi-laptop' },
    { id: 'continua', nombre: 'Educación Continua', icono: 'bi-arrow-repeat' },
    { id: 'idiomas', nombre: 'Instituto de Idiomas', icono: 'bi-translate' },
    { id: 'webinars', nombre: 'Webinars', icono: 'bi-camera-video' }
  ];

  // Programas de Pregrado organizados por áreas
  const areasPregrado = [
    {
      nombre: 'Arquitectura e Ingenierías',
      programas: [
        {
          nombre: 'Ingeniería Mecatrónica',
          descripcion: 'Formación integral en sistemas mecánicos, electrónicos y de control automatizado.',
          duracion: '4 años',
          modalidad: 'Presencial',
          imagen: IMAGES.carreras.robotica
        },
        {
          nombre: 'Ingeniería Automotriz',
          descripcion: 'Diseño, desarrollo y mantenimiento de sistemas automotrices modernos.',
          duracion: '4 años',
          modalidad: 'Presencial',
          imagen: IMAGES.carreras.automotriz
        },
        {
          nombre: 'Arquitectura',
          descripcion: 'Diseño y planificación de espacios urbanos con visión sostenible e innovadora.',
          duracion: '5 años',
          modalidad: 'Presencial',
          imagen: IMAGES.carreras.arquitectura
        },
        {
          nombre: 'Ingeniería Civil',
          descripcion: 'Planificación y construcción de infraestructuras para el desarrollo urbano.',
          duracion: '4 años',
          modalidad: 'Presencial',
          imagen: IMAGES.carreras.civil
        }
      ]
    },
    {
      nombre: 'Business & Digital School',
      programas: [
        {
          nombre: 'Licenciatura en Negocios Internacionales',
          descripcion: 'Formación en comercio internacional y gestión de negocios globales.',
          duracion: '4 años',
          modalidad: 'Presencial',
          imagen: IMAGES.carreras.negociosInternacionales
        },
        {
          nombre: 'Licenciatura en Administración de Empresas',
          descripcion: 'Gestión empresarial, liderazgo y emprendimiento sostenible.',
          duracion: '4 años',
          modalidad: 'Presencial / Online',
          imagen: IMAGES.carreras.administracion
        },
        {
          nombre: 'Ingeniería de Software',
          descripcion: 'Desarrollo de soluciones tecnológicas y aplicaciones digitales.',
          duracion: '4 años',
          modalidad: 'Presencial / Online',
          imagen: IMAGES.carreras.software
        },
        {
          nombre: 'Licenciatura en Marketing',
          descripcion: 'Estrategias de marketing digital y comunicación empresarial.',
          duracion: '4 años',
          modalidad: 'Presencial',
          imagen: IMAGES.carreras.marketing
        }
      ]
    },
    {
      nombre: 'Ciencias Sociales y Humanidades',
      programas: [
        {
          nombre: 'Derecho',
          descripcion: 'Formación integral en ciencias jurídicas con enfoque en justicia social y derechos humanos.',
          duracion: '4 años',
          modalidad: 'Presencial / Online',
          imagen: IMAGES.carreras.derecho
        },
        {
          nombre: 'Psicología',
          descripcion: 'Carrera orientada al estudio científico del comportamiento humano y los procesos mentales.',
          duracion: '4 años',
          modalidad: 'Presencial / Híbrida',
          imagen: IMAGES.carreras.psicologia
        },
        {
          nombre: 'Comunicación',
          descripcion: 'Desarrollo de competencias en medios digitales, periodismo y comunicación estratégica.',
          duracion: '4 años',
          modalidad: 'Presencial',
          imagen: IMAGES.carreras.comunicacion
        }
      ]
    }
  ];

  // Programas de Posgrado
  const programasPosgrado = [
    {
      nombre: 'MBA - Maestría en Administración de Empresas',
      descripcion: 'Formación ejecutiva en gestión estratégica y liderazgo empresarial internacional.',
      duracion: '18 meses',
      modalidad: 'Híbrida',
      imagen: IMAGES.posgrado.mba
    },
    {
      nombre: 'Maestría en Derecho Constitucional',
      descripcion: 'Especialización en derecho constitucional y garantías jurisdiccionales.',
      duracion: '2 años',
      modalidad: 'Online',
      imagen: IMAGES.posgrado.maestriaDerecho
    },
    {
      nombre: 'Maestría en Psicología Clínica',
      descripcion: 'Especialización en intervención psicológica y psicopatología.',
      duracion: '2 años',
      modalidad: 'Presencial',
      imagen: IMAGES.posgrado.maestriaPsicologia
    }
  ];

  // Programas Online
  const programasOnline = [
    {
      nombre: 'Administración de Empresas - Online',
      descripcion: 'Gestión empresarial completamente virtual con clases en vivo y material interactivo.',
      duracion: '4 años',
      modalidad: '100% Online',
      imagen: IMAGES.educacionContinua.educacionVirtual
    },
    {
      nombre: 'Derecho - Online',
      descripcion: 'Formación jurídica a distancia con clases sincrónicas y acompañamiento personalizado.',
      duracion: '4 años',
      modalidad: '100% Online',
      imagen: IMAGES.educacionContinua.educacionVirtual
    }
  ];

  // Educación Continua
  const programasContinua = [
    {
      nombre: 'Certificación en Marketing Digital',
      descripcion: 'Programa intensivo en estrategias de marketing digital y redes sociales.',
      duracion: '3 meses',
      modalidad: 'Online',
      imagen: IMAGES.educacionContinua.marketingDigital
    },
    {
      nombre: 'Diplomado en Gestión de Proyectos',
      descripcion: 'Metodologías ágiles y herramientas para la gestión efectiva de proyectos.',
      duracion: '6 meses',
      modalidad: 'Híbrida',
      imagen: IMAGES.educacionContinua.gestionProyectos
    }
  ];

  // Instituto de Idiomas
  const programasIdiomas = [
    {
      nombre: 'Inglés Intensivo',
      descripcion: 'Programa completo de inglés desde nivel básico hasta avanzado con certificación internacional.',
      duracion: '12 meses',
      modalidad: 'Presencial / Online',
      imagen: IMAGES.idiomas.ingles
    },
    {
      nombre: 'Francés',
      descripcion: 'Aprendizaje del idioma francés con enfoque comunicativo y cultural.',
      duracion: '12 meses',
      modalidad: 'Presencial',
      imagen: IMAGES.idiomas.ingles
    }
  ];

  // Webinars
  const webinars = [
    {
      nombre: 'Webinar: Tendencias en Inteligencia Artificial',
      descripcion: 'Conversatorio sobre las últimas tendencias en IA y su aplicación en los negocios.',
      duracion: '2 horas',
      modalidad: 'Online en vivo',
      imagen: IMAGES.idiomas.inteligenciaArtificial
    }
  ];

  const getContenidoPorCategoria = () => {
    switch (activeCategory) {
      case 'posgrado':
        return { tipo: 'lista', programas: programasPosgrado };
      case 'online':
        return { tipo: 'lista', programas: programasOnline };
      case 'continua':
        return { tipo: 'lista', programas: programasContinua };
      case 'idiomas':
        return { tipo: 'lista', programas: programasIdiomas };
      case 'webinars':
        return { tipo: 'lista', programas: webinars };
      default:
        return { tipo: 'areas', areas: areasPregrado };
    }
  };

  const contenido = getContenidoPorCategoria();

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Mejora de accesibilidad 2: Skip Links para navegación rápida */}
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
      
      <Navigation />
      
      <main id="main-content">
        {/* Hero Section - Negro */}
        <section 
          className="bg-dark text-white"
          style={{ paddingTop: '100px', paddingBottom: '100px' }}
          aria-labelledby="hero-titulo"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="row align-items-end">
                  <div className="col-lg-8">
                    <h1 
                      id="hero-titulo" 
                      className="mb-3"
                      style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '300', lineHeight: '1.1' }}
                    >
                      Oferta Académica
                    </h1>
                    <p 
                      className="mb-0"
                      style={{ fontSize: '1.1rem', lineHeight: '1.6', opacity: '0.85', fontWeight: '300' }}
                    >
                      Descubre nuestros programas académicos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías Navigation */}
        <section className="bg-white py-5" aria-labelledby="categorias-titulo">
          <div className="container">
            <h2 id="categorias-titulo" className="visually-hidden">
              Categorías de programas académicos
            </h2>
            <nav aria-label="Categorías de oferta académica">
              <div className="row g-3 justify-content-center">
                {categorias.map((cat) => (
                  <div key={cat.id} className="col-6 col-md-4 col-lg-2">
                    <button
                      type="button"
                      className={`btn w-100 h-100 border ${
                        activeCategory === cat.id 
                          ? 'bg-dark text-white border-dark' 
                          : 'bg-white text-dark border-secondary'
                      } focus-visible-outline`}
                      onClick={() => setActiveCategory(cat.id)}
                      aria-pressed={activeCategory === cat.id}
                      aria-label={`Ver programas de ${cat.nombre}`}
                      style={{ minHeight: '100px', fontWeight: '300', fontSize: '0.9rem' }}
                    >
                      <i 
                        className={`bi ${cat.icono} d-block mb-2`} 
                        style={{ fontSize: '1.5rem' }}
                        aria-hidden="true"
                      ></i>
                      {cat.nombre}
                    </button>
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </section>

        {/* Contenido Principal */}
        <section className="py-5 bg-light" aria-labelledby="contenido-titulo">
          <div className="container">
            <h2 id="contenido-titulo" className="visually-hidden">
              Programas de {categorias.find(c => c.id === activeCategory)?.nombre}
            </h2>

            {contenido.tipo === 'areas' ? (
              // Mostrar por áreas (Pregrado)
              contenido.areas?.map((area, areaIndex) => (
                <div key={areaIndex} className="mb-5">
                  <h3 
                    className="mb-4 pb-2 border-bottom border-dark"
                    style={{ fontWeight: '400', fontSize: '1.5rem' }}
                  >
                    {area.nombre}
                  </h3>

                  <div className="row g-4">
                    {area.programas.map((programa, index) => (
                      <div key={index} className="col-12 col-md-6 col-lg-3">
                        <article className="h-100 focus-visible-outline" tabIndex={0}>
                          <img 
                            src={`${programa.imagen}&v=2`}
                            className="w-100 mb-3" 
                            alt={`Herramientas y equipos de ${programa.nombre}`}
                            style={{ height: '180px', objectFit: 'cover' }}
                            loading="lazy"
                          />
                          <h4 
                            className="mb-2" 
                            style={{ fontWeight: '500', fontSize: '1.1rem', minHeight: '52px', lineHeight: '1.3' }}
                          >
                            {programa.nombre}
                          </h4>
                          <p className="mb-3 text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                            {programa.descripcion}
                          </p>
                          <div className="mb-3">
                            <div className="d-flex align-items-center mb-1 small text-muted">
                              <i className="bi bi-clock me-2" aria-hidden="true"></i>
                              <span className="visually-hidden">Duración: </span>
                              {programa.duracion}
                            </div>
                            <div className="d-flex align-items-center small text-muted">
                              <i className="bi bi-laptop me-2" aria-hidden="true"></i>
                              <span className="visually-hidden">Modalidad: </span>
                              {programa.modalidad}
                            </div>
                          </div>
                          <a 
                            href={`#programa-${programa.nombre.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-primary text-decoration-none focus-visible-outline d-inline-flex align-items-center"
                            style={{ fontSize: '0.9rem', fontWeight: '500', minHeight: '44px' }}
                          >
                            Ver más información
                            <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
                            <span className="visually-hidden"> sobre {programa.nombre}</span>
                          </a>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Mostrar lista simple (otras categorías)
              <div className="row g-4">
                {contenido.programas?.map((programa, index) => (
                  <div key={index} className="col-12 col-md-6 col-lg-4">
                    <article className="h-100 focus-visible-outline" tabIndex={0}>
                      <img 
                        src={programa.imagen} 
                        className="w-100 mb-3" 
                        alt={`Estudiantes de ${programa.nombre} en actividades académicas`}
                        style={{ height: '180px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <h3 
                        className="mb-2" 
                        style={{ fontWeight: '500', fontSize: '1.1rem', lineHeight: '1.3' }}
                      >
                        {programa.nombre}
                      </h3>
                      <p className="mb-3 text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {programa.descripcion}
                      </p>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-1 small text-muted">
                          <i className="bi bi-clock me-2" aria-hidden="true"></i>
                          <span className="visually-hidden">Duración: </span>
                          {programa.duracion}
                        </div>
                        <div className="d-flex align-items-center small text-muted">
                          <i className="bi bi-laptop me-2" aria-hidden="true"></i>
                          <span className="visually-hidden">Modalidad: </span>
                          {programa.modalidad}
                        </div>
                      </div>
                      <a 
                        href={`#programa-${programa.nombre.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-primary text-decoration-none focus-visible-outline d-inline-flex align-items-center"
                        style={{ fontSize: '0.9rem', fontWeight: '500', minHeight: '44px' }}
                      >
                        Ver más información
                        <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
                        <span className="visually-hidden"> sobre {programa.nombre}</span>
                      </a>
                    </article>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Section */}
            <div className="row mt-5 pt-5">
              <div className="col-12">
                <div className="bg-dark text-white p-5 text-center">
                  <h2 className="mb-3" style={{ fontWeight: '300', fontSize: '2rem' }}>
                    ¿Necesitas más información?
                  </h2>
                  <p className="mb-4 opacity-75" style={{ fontSize: '1rem', fontWeight: '300' }}>
                    Nuestros asesores académicos están disponibles para ayudarte
                  </p>
                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <a 
                      href="#home" 
                      className="btn btn-light focus-visible-outline"
                      style={{ minHeight: '48px', fontWeight: '400', padding: '12px 32px' }}
                    >
                      Solicitar información
                    </a>
                    <a 
                      href="#contacto" 
                      className="btn btn-outline-light focus-visible-outline"
                      style={{ minHeight: '48px', fontWeight: '400', padding: '12px 32px' }}
                    >
                      Contactar asesor
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mejora de accesibilidad 3: Estilos para foco visible mejorado */}
      <style>{`
        /* Contraste mejorado para navegación por teclado */
        .focus-visible-outline:focus {
          outline: 3px solid #0066cc !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2) !important;
        }

        .focus-visible-outline:focus:not(:focus-visible) {
          outline: none !important;
          box-shadow: none !important;
        }

        /* Skip link visible en foco */
        .skip-link:focus {
          top: 10px !important;
        }

        /* Tamaños de fuente ajustables */
        .font-size-normal {
          font-size: 1rem;
        }

        .font-size-large {
          font-size: 1.125rem;
        }

        .font-size-large .h1, .font-size-large h1 {
          font-size: calc(clamp(2.5rem, 6vw, 4rem) * 1.125);
        }

        .font-size-large .h2, .font-size-large h2 {
          font-size: calc(2rem * 1.125);
        }

        .font-size-large .h3, .font-size-large h3,
        .font-size-large .h4, .font-size-large h4 {
          font-size: calc(1.1rem * 1.125);
        }

        .font-size-xlarge {
          font-size: 1.25rem;
        }

        .font-size-xlarge .h1, .font-size-xlarge h1 {
          font-size: calc(clamp(2.5rem, 6vw, 4rem) * 1.25);
        }

        .font-size-xlarge .h2, .font-size-xlarge h2 {
          font-size: calc(2rem * 1.25);
        }

        .font-size-xlarge .h3, .font-size-xlarge h3,
        .font-size-xlarge .h4, .font-size-xlarge h4 {
          font-size: calc(1.1rem * 1.25);
        }

        /* Transiciones suaves */
        .btn, a {
          transition: all 0.15s ease;
        }

        /* Hover minimalista */
        a:hover {
          opacity: 0.7;
        }

        .btn:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}