import React from 'react';
import { CONTACT } from '@/config/links';

export function ContactoSection() {
  return (
    <section className="py-5 border-top" id="contacto" aria-labelledby="titulo-contacto">
      <div className="container">
        <h2 id="titulo-contacto" className="visually-hidden">Información de contacto y pagos</h2>
        
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="border rounded p-4 h-100">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-credit-card fs-4 me-3 text-primary" aria-hidden="true"></i>
                <h5 className="mb-0" style={{ fontSize: '1.25rem' }}>Pagos en línea</h5>
              </div>
              <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                Realiza tu proceso de matrícula y pagos de manera segura a través de nuestro portal en línea.
              </p>
              <nav aria-label="Opciones de pago">
                <div className="d-grid gap-2">
                  <a href="#matricular" className="btn btn-primary">
                    <i className="bi bi-pencil-square me-2" aria-hidden="true"></i>
                    Realizar proceso de matrícula
                  </a>
                  <a href="#pagos" className="btn btn-outline-primary">
                    <i className="bi bi-wallet2 me-2" aria-hidden="true"></i>
                    Realizar pago de pensiones
                  </a>
                </div>
              </nav>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="border rounded p-4 h-100">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-headset fs-4 me-3 text-primary" aria-hidden="true"></i>
                <h5 className="mb-0" style={{ fontSize: '1.25rem' }}>Atención y contacto</h5>
              </div>
              <address style={{ fontStyle: 'normal' }}>
                <div className="mb-3">
                  <i className="bi bi-envelope me-2 text-primary" aria-hidden="true"></i>
                  <span className="visually-hidden">Correo electrónico: </span>
                  <a href="mailto:admisiones@uisek.edu.ec" className="text-decoration-none text-dark">
                    admisiones@uisek.edu.ec
                  </a>
                </div>
                
                <div className="mb-3">
                  <i className="bi bi-whatsapp me-2 text-primary" aria-hidden="true"></i>
                  <span className="visually-hidden">WhatsApp: </span>
                  <a href={CONTACT.whatsapp} className="text-decoration-none text-dark" target="_blank" rel="noopener noreferrer">
                    +593 99 836 9476
                  </a>
                </div>
                
                <div className="mb-3">
                  <i className="bi bi-telephone me-2 text-primary" aria-hidden="true"></i>
                  <span className="visually-hidden">Teléfono: </span>
                  <a href="tel:+59323974800" className="text-decoration-none text-dark">
                    +593 2 397 4800
                  </a>
                  <span className="text-muted d-block ms-4 small">Quito, Ecuador</span>
                </div>
                
                <div className="text-muted">
                  <i className="bi bi-clock me-2" aria-hidden="true"></i>
                  <span className="visually-hidden">Horario de atención: </span>
                  Lunes a viernes de 09:00 a 17:00
                </div>
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}