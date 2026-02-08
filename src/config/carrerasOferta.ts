/**
 * Nombres de carreras/programas que aparecen en la oferta académica.
 * Usado por el experimento de eye-tracking para asignar "busca una carrera al azar".
 * Sincronizar con OfertaAcademicaPage y OfertaAcademica si se agregan programas.
 */
export const CARRERAS_OFERTA = [
  'Ingeniería Mecatrónica',
  'Ingeniería Automotriz',
  'Arquitectura',
  'Ingeniería Civil',
  'Licenciatura en Negocios Internacionales',
  'Licenciatura en Administración de Empresas',
  'Ingeniería de Software',
  'Licenciatura en Marketing',
  'Derecho',
  'Psicología',
  'Comunicación',
  'MBA - Maestría en Administración de Empresas',
  'Maestría en Derecho Constitucional',
  'Maestría en Psicología Clínica',
  'Administración de Empresas - Online',
  'Derecho - Online',
  'Certificación en Marketing Digital',
  'Diplomado en Gestión de Proyectos',
  'Inglés Intensivo',
  'Francés',
  'Webinar: Tendencias en Inteligencia Artificial',
  // Carreras del carrusel en home (OfertaAcademica)
  'Administración',
  'Ingeniería',
] as const;

export function getCarreraAlAzar(): string {
  return CARRERAS_OFERTA[Math.floor(Math.random() * CARRERAS_OFERTA.length)];
}
