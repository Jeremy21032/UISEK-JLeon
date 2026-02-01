import React, { useState, useEffect } from 'react';
import { VisualAlert } from '@/app/components/VisualAlert';
import { IMAGES } from '@/config/links';

interface PostulacionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostulacionModal({ isOpen, onClose }: PostulacionModalProps) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    nivel: '',
    programaInteres: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    // Prevenir scroll del body cuando el modal está abierto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Validar inmediatamente al abrir el modal para mostrar errores iniciales
      setErrors(validate());
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Si cambia el nivel, resetear la carrera seleccionada
    if (name === 'nivel') {
      setFormData(prev => ({
        ...prev,
        nivel: value,
        programaInteres: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Validar instantáneamente mientras el usuario escribe
    const newErrors = { ...errors };
    
    // Validación específica por campo
    if (name === 'nombres') {
      if (!value.trim()) {
        newErrors.nombres = 'Este campo es requerido';
      } else {
        delete newErrors.nombres;
      }
    } else if (name === 'apellidos') {
      if (!value.trim()) {
        newErrors.apellidos = 'Este campo es requerido';
      } else {
        delete newErrors.apellidos;
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        newErrors.email = 'Este campo es requerido';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = 'Por favor ingresa un correo electrónico válido';
        } else {
          delete newErrors.email;
        }
      }
    } else if (name === 'telefono') {
      if (!value.trim()) {
        newErrors.telefono = 'Este campo es requerido';
      } else if (!/^[0-9]{10}$/.test(value)) {
        newErrors.telefono = 'El teléfono debe contener 10 dígitos';
      } else {
        delete newErrors.telefono;
      }
    } else if (name === 'nivel') {
      if (!value) {
        newErrors.nivel = 'Por favor selecciona un nivel';
      } else {
        delete newErrors.nivel;
      }
    } else if (name === 'programaInteres') {
      if (!value) {
        newErrors.programaInteres = 'Por favor selecciona un programa';
      } else {
        delete newErrors.programaInteres;
      }
    }
    
    setErrors(newErrors);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Validar nombres
    if (!formData.nombres.trim()) {
      newErrors.nombres = 'Este campo es requerido';
    }
    
    // Validar apellidos
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Este campo es requerido';
    }
    
    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Este campo es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Por favor ingresa un correo electrónico válido';
      }
    }
    
    // Validar teléfono
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Este campo es requerido';
    } else if (!/^[0-9]{10}$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe contener 10 dígitos';
    }
    
    // Validar nivel
    if (!formData.nivel) {
      newErrors.nivel = 'Por favor selecciona un nivel';
    }
    
    // Validar programa
    if (!formData.programaInteres) {
      newErrors.programaInteres = 'Por favor selecciona un programa';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos los campos
    const validationErrors = validate();
    setErrors(validationErrors);

    // Marcar todos los campos como tocados para mostrar errores
    if (Object.keys(validationErrors).length > 0) {
      setTouched({
        nombres: true,
        apellidos: true,
        email: true,
        telefono: true,
        nivel: true,
        programaInteres: true
      });
      return;
    }

    setIsSubmitting(true);

    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Datos de postulación:', formData);
    setIsSubmitting(false);
    setShowSuccess(true);

    // Resetear formulario y cerrar después de 2 segundos
    setTimeout(() => {
      setFormData({
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        nivel: '',
        programaInteres: '',
        mensaje: ''
      });
      setErrors({});
      setTouched({});
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
        style={{
          opacity: 0.5,
          zIndex: 1040
        }}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Drawer */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg"
        style={{
          width: '100%',
          maxWidth: '600px',
          zIndex: 1050,
          overflowY: 'auto',
          animation: 'slideInRight 0.3s ease-out'
        }}
        role="dialog"
        aria-labelledby="modal-titulo"
        aria-modal="true"
      >
        {/* Header minimalista */}
        <div className="border-bottom bg-white position-sticky top-0" style={{ zIndex: 10 }}>
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <img 
                src={IMAGES.logoAzul}
                alt="Universidad Internacional SEK Ecuador"
                style={{ height: '45px', width: 'auto' }}
              />
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Cerrar formulario de postulación"
                style={{ minHeight: '44px', minWidth: '44px' }}
              ></button>
            </div>
            <h4 id="modal-titulo" className="mb-1" style={{ fontSize: '1.5rem' }}>
              Solicitud de información
            </h4>
            <p className="text-muted mb-0 small">
              Completa el formulario y te contactaremos
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {showSuccess ? (
            // Mensaje de éxito
            <div className="text-center py-5">
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: '80px', height: '80px' }}
              >
                <i className="bi bi-check-lg text-white" style={{ fontSize: '2.5rem' }}></i>
              </div>
              <h4 className="mb-2" style={{ fontSize: '1.5rem' }}>¡Solicitud enviada!</h4>
              <p className="text-muted">
                Nos contactaremos contigo en las próximas 24 horas
              </p>
            </div>
          ) : (
            // Formulario
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                {/* Nombres */}
                <div className="col-md-6">
                  <label htmlFor="nombres" className="form-label">
                    Nombres <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.nombres ? 'is-invalid' : ''}`}
                    id="nombres"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    style={{ minHeight: '44px' }}
                  />
                  {errors.nombres && (
                    <div className="invalid-feedback">{errors.nombres}</div>
                  )}
                </div>

                {/* Apellidos */}
                <div className="col-md-6">
                  <label htmlFor="apellidos" className="form-label">
                    Apellidos <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    style={{ minHeight: '44px' }}
                  />
                  {errors.apellidos && (
                    <div className="invalid-feedback">{errors.apellidos}</div>
                  )}
                </div>

                {/* Email */}
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    style={{ minHeight: '44px' }}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Teléfono */}
                <div className="col-12">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    style={{ minHeight: '44px' }}
                    pattern="[0-9]{10}"
                  />
                  {errors.telefono && (
                    <div className="invalid-feedback">{errors.telefono}</div>
                  )}
                </div>

                {/* Nivel */}
                <div className="col-12">
                  <label htmlFor="nivel" className="form-label">
                    Nivel <span className="text-primary">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.nivel ? 'is-invalid' : ''}`}
                    id="nivel"
                    name="nivel"
                    value={formData.nivel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    style={{ minHeight: '44px' }}
                  >
                    <option value="">Selecciona un nivel</option>
                    <option value="pregrado">Pregrado</option>
                    <option value="posgrado">Posgrado</option>
                  </select>
                  {errors.nivel && (
                    <div className="invalid-feedback">{errors.nivel}</div>
                  )}
                </div>

                {/* Programa */}
                <div className="col-12">
                  <label htmlFor="programaInteres" className="form-label">
                    Programa de interés <span className="text-primary">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.programaInteres ? 'is-invalid' : ''}`}
                    id="programaInteres"
                    name="programaInteres"
                    value={formData.programaInteres}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    style={{ minHeight: '44px' }}
                    disabled={!formData.nivel}
                  >
                    <option value="">
                      {!formData.nivel ? 'Primero selecciona un nivel' : 'Selecciona una carrera'}
                    </option>
                    
                    {formData.nivel === 'pregrado' && (
                      <>
                        <option value="administracion-empresas">Administración de Empresas</option>
                        <option value="administracion-empresas-online">Administración de Empresas ONLINE</option>
                        <option value="arquitectura">Arquitectura</option>
                        <option value="ciencias-biomedicas">Ciencias Biomédicas</option>
                        <option value="derecho">Derecho</option>
                        <option value="derecho-online">Derecho ONLINE</option>
                        <option value="ingenieria-automotriz">Ingeniería Automotriz</option>
                        <option value="ingenieria-civil">Ingeniería Civil</option>
                        <option value="ingenieria-mecatronica">Ingeniería Mecatrónica</option>
                        <option value="ingenieria-software">Ingeniería de Software</option>
                        <option value="ingenieria-informatica">Ingeniería en Informática</option>
                        <option value="licenciatura-fisioterapia">Licenciatura en Fisioterapia</option>
                        <option value="licenciatura-marketing">Licenciatura en Marketing</option>
                        <option value="licenciatura-psicologia-clinica">Licenciatura en Psicología Clínica</option>
                        <option value="medicina">Medicina</option>
                        <option value="negocios-internacionales">Negocios Internacionales</option>
                        <option value="odontologia">Odontología</option>
                        <option value="psicologia-online">Psicología ONLINE</option>
                      </>
                    )}
                    
                    {formData.nivel === 'posgrado' && (
                      <>
                        <optgroup label="Especializaciones">
                          <option value="esp-cirugia-oral">Especialización en Cirugía Oral</option>
                          <option value="esp-compliance">Especialización en Compliance (Cumplimiento y Anticorrupción)</option>
                          <option value="esp-comunicacion-digital">Especialización en Comunicación Digital con mención en Inteligencia de Redes Sociales</option>
                          <option value="esp-medicina-trabajo">Especialización en Medicina del Trabajo</option>
                          <option value="esp-ortodoncia">Especialización en Ortodoncia</option>
                          <option value="esp-psicosociologia-laboral">Especialización en Psicosociología Laboral</option>
                          <option value="esp-salud-seguridad-ergonomia">Especialización en Salud y Seguridad Ocupacional con mención en Ergonomía Laboral</option>
                          <option value="esp-salud-seguridad-higiene">Especialización en Salud y Seguridad Ocupacional mención Higiene Industrial</option>
                          <option value="esp-seguridad-minera">Especialización en Seguridad Minera</option>
                          <option value="esp-toxicologia-laboral">Especialización en Toxicología Laboral</option>
                        </optgroup>
                        <optgroup label="Maestrías">
                          <option value="mba">Maestría en Administración de Empresas (M.B.A.)</option>
                          <option value="maestria-bienestar-laboral">Maestría en Bienestar Laboral y Gestión de Personas</option>
                          <option value="maestria-bioinformatica">Maestría en Bioinformática</option>
                          <option value="maestria-biomedicina">Maestría en Biomedicina</option>
                          <option value="maestria-cambio-climatico">Maestría en Cambio Climático y Circularidad</option>
                          <option value="maestria-derecho-procesal">Maestría en Derecho Procesal y Litigación Oral</option>
                          <option value="maestria-gerencia-proyectos-bim">Maestría en Gerencia de Proyectos BIM</option>
                          <option value="maestria-ingenieria-automotriz">Maestría en Ingeniería Automotriz con mención en Diagnóstico Automotriz y Electromovilidad</option>
                          <option value="maestria-psicologia-forense">Maestría en Psicología con mención en Psicología Forense</option>
                          <option value="maestria-psicologia-psicoterapia">Maestría en Psicología con mención en Psicoterapia</option>
                          <option value="maestria-salud-mental">Maestría en Salud Mental Comunitaria</option>
                          <option value="maestria-salud-seguridad-prevencion">Maestría en Salud y Seguridad Ocupacional con mención en Prevención de Riesgos Laborales</option>
                        </optgroup>
                      </>
                    )}
                  </select>
                  {errors.programaInteres && (
                    <div className="invalid-feedback">{errors.programaInteres}</div>
                  )}
                </div>

                {/* Mensaje */}
                <div className="col-12">
                  <label htmlFor="mensaje" className="form-label">
                    Mensaje <span className="text-muted small">(opcional)</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="mensaje"
                    name="mensaje"
                    rows={3}
                    value={formData.mensaje}
                    onChange={handleChange}
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
              </div>

              {/* Botones */}
              <div className="d-flex gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary flex-fill"
                  onClick={onClose}
                  disabled={isSubmitting}
                  style={{ minHeight: '44px' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-fill"
                  disabled={isSubmitting}
                  style={{ minHeight: '44px' }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Enviando...
                    </>
                  ) : (
                    'Enviar solicitud'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Animación CSS */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}