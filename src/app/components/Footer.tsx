import React from 'react';
import { IMAGES, SOCIAL_MEDIA, CONTACT } from '@/config/links';

export function Footer() {
  return (
    <footer className="bg-dark text-white py-5" role="contentinfo">
      <div className="container-fluid px-4">
        <div className="row mb-5">
          <div className="col-lg-5">
            <img 
              src={IMAGES.logoBlanco}
              alt="Universidad Internacional SEK Ecuador"
              className="mb-4"
              style={{ height: '70px', width: 'auto' }}
            />
            <p className="text-white-50 mb-4">
              Formando profesionales comprometidos con el desarrollo sostenible y la excelencia académica.
            </p>
            
            {/* Redes sociales */}
            <nav aria-label="Redes sociales de UISEK">
              <h6 className="fw-bold mb-3" style={{ fontSize: '1rem' }}>Síguenos en redes sociales</h6>
              <div className="d-flex gap-3">
                <a 
                  href={SOCIAL_MEDIA.instagram} 
                  className="text-white" 
                  aria-label="Visita nuestro perfil de Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram fs-4" aria-hidden="true"></i>
                </a>
                <a 
                  href={SOCIAL_MEDIA.linkedin} 
                  className="text-white" 
                  aria-label="Visita nuestro perfil de LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-linkedin fs-4" aria-hidden="true"></i>
                </a>
                <a 
                  href={SOCIAL_MEDIA.facebook} 
                  className="text-white" 
                  aria-label="Visita nuestra página de Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-facebook fs-4" aria-hidden="true"></i>
                </a>
                <a 
                  href={SOCIAL_MEDIA.twitter} 
                  className="text-white" 
                  aria-label="Visita nuestro perfil de Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-twitter-x fs-4" aria-hidden="true"></i>
                </a>
                <a 
                  href={SOCIAL_MEDIA.youtube} 
                  className="text-white" 
                  aria-label="Visita nuestro canal de YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-youtube fs-4" aria-hidden="true"></i>
                </a>
              </div>
            </nav>
          </div>

          {/* Contacto */}
          <div className="col-lg-4 offset-lg-1">
            <h5 className="fw-bold mb-4" style={{ fontSize: '1.25rem' }}>Contacto y atención</h5>
            
            <address className="small" style={{ fontStyle: 'normal' }}>
              <div className="mb-3">
                <i className="bi bi-telephone-fill text-primary me-2" aria-hidden="true"></i>
                <a href="tel:+59323974800" className="text-white text-decoration-none">
                  +593 2 397 4800
                </a>
                <span className="d-block text-white-50 ms-4 small">Quito - Ecuador</span>
              </div>

              <div className="mb-3">
                <i className="bi bi-whatsapp text-primary me-2" aria-hidden="true"></i>
                <a href={CONTACT.whatsapp} className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">
                  +593 99 836 9476
                </a>
                <span className="d-block text-white-50 ms-4 small">WhatsApp</span>
              </div>

              <div className="mb-3">
                <i className="bi bi-envelope-fill text-primary me-2" aria-hidden="true"></i>
                <a href="mailto:admisiones@uisek.edu.ec" className="text-white text-decoration-none">
                  admisiones@uisek.edu.ec
                </a>
              </div>

              <div>
                <i className="bi bi-clock text-primary me-2" aria-hidden="true"></i>
                <span className="text-white-50">Lunes a Viernes: 09:00 - 17:00</span>
              </div>
            </address>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <nav aria-label="Enlaces rápidos del sitio" className="border-top border-secondary pt-4">
          <div className="row">
            <div className="col-md-3 mb-3">
              <h6 className="fw-bold mb-3" style={{ fontSize: '1rem' }}>Oferta académica</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <a href="#pregrado" className="text-white-50 text-decoration-none">
                    Programas de pregrado
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#posgrado" className="text-white-50 text-decoration-none">
                    Programas de posgrado
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#educacion-continua" className="text-white-50 text-decoration-none">
                    Educación continua
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-3">
              <h6 className="fw-bold mb-3" style={{ fontSize: '1rem' }}>Servicios estudiantiles</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <a href="#biblioteca" className="text-white-50 text-decoration-none">
                    Biblioteca digital
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#bienestar" className="text-white-50 text-decoration-none">
                    Bienestar estudiantil
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#empleo" className="text-white-50 text-decoration-none">
                    Bolsa de empleo
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-3">
              <h6 className="fw-bold mb-3" style={{ fontSize: '1rem' }}>Sobre UISEK</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <a href="#nosotros" className="text-white-50 text-decoration-none">
                    Quiénes somos
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#investigacion" className="text-white-50 text-decoration-none">
                    Investigación
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#vinculacion" className="text-white-50 text-decoration-none">
                    Vinculación con la comunidad
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-3">
              <h6 className="fw-bold mb-3" style={{ fontSize: '1rem' }}>Información legal</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <a href="#politica-privacidad" className="text-white-50 text-decoration-none">
                    Política de privacidad
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#terminos" className="text-white-50 text-decoration-none">
                    Términos y condiciones
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#accesibilidad" className="text-white-50 text-decoration-none">
                    Declaración de accesibilidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Copyright */}
        <div className="border-top border-secondary pt-4 mt-4 text-center">
          <p className="small text-white-50 mb-0">
            Copyright © 2026 Universidad Internacional SEK Ecuador. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}