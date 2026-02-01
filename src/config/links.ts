/**
 * Configuración centralizada de enlaces externos
 * Todos los enlaces de la aplicación deben estar aquí
 */

// Imágenes y recursos estáticos
export const IMAGES = {
  // Logos
  logoAzul: 'https://uisek.edu.ec/wp-content/uploads/2024/01/logo-sek-2024-azul.png',
  logoBlanco: 'https://uisek.edu.ec/wp-content/uploads/2024/01/logo-sek-2024-blanco.png',
  
  // Hero y secciones principales
  hero: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=1200&fit=crop',
  equipoTrabajo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
  noticiasEquipo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop',
  
  // Carreras de grado
  carreras: {
    derecho: 'https://images.unsplash.com/photo-1752697589070-805ce3817859?w=1080&h=720&fit=crop',
    psicologia: 'https://images.unsplash.com/photo-1709651669999-57741c9bf085?w=1080&h=720&fit=crop',
    comunicacion: 'https://images.unsplash.com/photo-1752625190153-ad3f51a709f0?w=1080&h=720&fit=crop',
    administracion: 'https://images.unsplash.com/photo-1679508057079-f1bf069350ee?w=1080&h=720&fit=crop',
    arquitectura: 'https://images.unsplash.com/photo-1742415106102-77bbfe14b872?w=1080&h=720&fit=crop',
    software: 'https://images.unsplash.com/photo-1625459201773-9b2386f53ca2?w=1080&h=720&fit=crop',
    robotica: 'https://images.unsplash.com/photo-1761762678321-98572476620e?w=1080&h=720&fit=crop',
    automotriz: 'https://images.unsplash.com/photo-1676018366904-c083ed678e60?w=1080&h=720&fit=crop',
    civil: 'https://images.unsplash.com/photo-1655975719898-8f3432eed322?w=1080&h=720&fit=crop',
    negociosInternacionales: 'https://images.unsplash.com/photo-1594233666755-d1cb282abd25?w=1080&h=720&fit=crop',
    marketing: 'https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?w=1080&h=720&fit=crop',
  },
  
  // Programas de posgrado
  posgrado: {
    mba: 'https://images.unsplash.com/photo-1634326080825-985cfc816db6?w=1080&h=720&fit=crop',
    maestriaDerecho: 'https://images.unsplash.com/photo-1659869764315-dc3d188141fe?w=1080&h=720&fit=crop',
    maestriaPsicologia: 'https://images.unsplash.com/photo-1646255946369-7514716d7a21?w=1080&h=720&fit=crop',
  },
  
  // Programas de educación continua
  educacionContinua: {
    educacionVirtual: 'https://images.unsplash.com/photo-1588912914074-b93851ff14b8?w=1080&h=720&fit=crop',
    marketingDigital: 'https://images.unsplash.com/photo-1547621008-d6d6d2e28e81?w=1080&h=720&fit=crop',
    gestionProyectos: 'https://images.unsplash.com/photo-1758873267213-c20dc5568c8c?w=1080&h=720&fit=crop',
  },
  
  // Cursos de idiomas
  idiomas: {
    ingles: 'https://images.unsplash.com/photo-1565022536102-f7645c84354a?w=1080&h=720&fit=crop',
    inteligenciaArtificial: 'https://images.unsplash.com/photo-1749006590639-e749e6b7d84c?w=1080&h=720&fit=crop',
  }
} as const;

// Redes sociales
export const SOCIAL_MEDIA = {
  instagram: 'https://www.instagram.com/uisekecuador',
  linkedin: 'https://www.linkedin.com/school/uisek',
  facebook: 'https://www.facebook.com/UISEKEcuador',
  twitter: 'https://twitter.com/uisekecuador',
  youtube: 'https://www.youtube.com/uisekecuador',
} as const;

// Contacto
export const CONTACT = {
  whatsapp: 'https://wa.me/593998369476',
  whatsappAdmisiones: 'https://wa.me/593999999999',
} as const;

// Formularios
export const FORMS = {
  postulacion: 'https://docs.google.com/forms/d/e/1FAIpQLSfGV6BqldlLU1PN_cPPTvKxMkyOXIRvvTK6yF-TgVZviFNCSA/viewform',
} as const;

// CDN y recursos externos
export const CDN = {
  bootstrapIcons: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
} as const;
