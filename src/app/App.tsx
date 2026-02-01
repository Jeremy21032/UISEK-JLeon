import React, { useEffect, useState } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { Footer } from '@/app/components/Footer';
import { PostulacionModal } from '@/app/components/PostulacionModal';
import { AccessibilityControls } from '@/app/components/AccessibilityControls';
import { HeroSection } from '@/app/components/HeroSection';
import { ServiciosEstudiantiles } from '@/app/components/ServiciosEstudiantiles';
import { OfertaAcademica } from '@/app/components/OfertaAcademica';
import { Portales } from '@/app/components/Portales';
import { NoticiasSection } from '@/app/components/NoticiasSection';
import { ContactoSection } from '@/app/components/ContactoSection';
import { OfertaAcademicaPage } from '@/app/pages/OfertaAcademicaPage';
import { AdmisionesPage } from '@/app/pages/AdmisionesPage';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Detectar cambios en el hash de la URL
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
      
      // Scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Ejecutar al cargar
    handleHashChange();

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Renderizar páginas según el hash
  if (currentPage === 'oferta-academica') {
    return (
      <>
        <OfertaAcademicaPage />
        <AccessibilityControls />
      </>
    );
  }

  if (currentPage === 'admisiones') {
    return (
      <>
        <AdmisionesPage />
        <AccessibilityControls />
      </>
    );
  }

  // Página principal (home)
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Skip Links - Mejora de accesibilidad global */}
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
      <main id="main-content" role="main">
        <HeroSection onOpenModal={() => setIsModalOpen(true)} />
        <ServiciosEstudiantiles />
        <OfertaAcademica />
        <Portales />
        <NoticiasSection />
        <ContactoSection />
      </main>
      <Footer />
      <PostulacionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Controles de accesibilidad globales */}
      <AccessibilityControls />

      {/* Estilos globales de accesibilidad */}
      <style>{`
        /* Skip link visible en foco */
        .skip-link:focus {
          top: 10px !important;
        }

        /* Foco visible mejorado - GLOBAL */
        *:focus-visible {
          outline: 3px solid #0066cc !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2) !important;
        }

        /* Elementos interactivos siempre accesibles */
        button, a, input, select, textarea {
          min-height: 44px;
        }

        /* Indicadores visuales para estados (deficiencia auditiva) */
        .form-control:focus,
        .form-select:focus {
          border-color: #0066cc !important;
          box-shadow: 0 0 0 0.25rem rgba(0, 102, 204, 0.25) !important;
        }

        .form-control:invalid {
          border-color: #dc3545 !important;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e") !important;
          background-repeat: no-repeat !important;
          background-position: right calc(0.375em + 0.1875rem) center !important;
          background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem) !important;
        }

        .form-control:valid {
          border-color: #198754 !important;
        }
      `}</style>
    </div>
  );
}

export default App;