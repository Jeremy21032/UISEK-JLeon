import React from 'react';
import { IMAGES } from '@/config/links';

/**
 * Noticias UISEK Component
 * Sección de noticias y oportunidades laborales
 */
export function Noticias() {
  return (
    <section className="py-5 bg-primary text-white" id="noticias-uisek" aria-labelledby="noticias-heading">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 id="noticias-heading" className="fw-bold mb-4">
              Únete a nuestro equipo de trabajo
            </h2>
            <p className="mb-4">
              La Universidad Internacional SEK trabaja con un equipo humano comprometido con los ideales de calidad de la Institución Internacional SEK en el mundo, un lugar en el que encontrarás la oportunidad de crecer a nivel personal y profesional.
            </p>
            <p className="mb-4">
              Si deseas ser parte de una institución internacional en Ecuador, llena el formulario y la ficha de datos.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a
                href="#formulario"
                className="btn btn-light btn-lg"
                aria-label="Completar formulario de postulación laboral"
              >
                Formulario
              </a>
              <a
                href="#ficha-datos"
                className="btn btn-outline-light btn-lg"
                aria-label="Descargar ficha de datos para postulación"
              >
                Ficha de Datos
              </a>
            </div>
          </div>

          <div className="col-lg-6">
            <img
              src={IMAGES.equipoTrabajo}
              alt="Equipo de trabajo colaborando en la Universidad Internacional SEK"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>

        <div className="text-center mt-5">
          <a
            href="#ver-mas-noticias"
            className="btn btn-outline-light"
            aria-label="Ver más noticias de UISEK"
          >
            Mirar más noticias
          </a>
        </div>
      </div>
    </section>
  );
}
