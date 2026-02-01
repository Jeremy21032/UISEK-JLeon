import React, { useEffect, useState } from 'react';

// Mejora 4: Alertas visuales para usuarios con deficiencia auditiva
// En lugar de depender de sonidos, usamos indicadores visuales claros

interface VisualAlertProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export function VisualAlert({ message, type = 'info', duration = 5000, onClose }: VisualAlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Animación de progreso
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        return newProgress > 0 ? newProgress : 0;
      });
    }, 100);

    // Auto-cerrar después de la duración
    const timeout = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  if (!isVisible) return null;

  const alertStyles = {
    success: {
      bg: '#198754',
      icon: 'bi-check-circle-fill',
      border: '#146c43'
    },
    error: {
      bg: '#dc3545',
      icon: 'bi-x-circle-fill',
      border: '#b02a37'
    },
    info: {
      bg: '#0066cc',
      icon: 'bi-info-circle-fill',
      border: '#0052a3'
    },
    warning: {
      bg: '#ffc107',
      icon: 'bi-exclamation-triangle-fill',
      border: '#cc9a06'
    }
  };

  const style = alertStyles[type];

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className="position-fixed shadow-lg"
      style={{
        top: '80px',
        right: '20px',
        zIndex: 1100,
        backgroundColor: style.bg,
        color: '#FFFFFF',
        padding: '16px 20px',
        borderRadius: '8px',
        minWidth: '300px',
        maxWidth: '400px',
        borderLeft: `4px solid ${style.border}`,
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      <div className="d-flex align-items-start">
        {/* Icono visual grande */}
        <i 
          className={`bi ${style.icon} me-3`} 
          style={{ fontSize: '1.5rem' }}
          aria-hidden="true"
        ></i>
        
        {/* Mensaje */}
        <div className="flex-grow-1">
          <p className="mb-0 fw-medium" style={{ fontSize: '0.95rem' }}>
            {message}
          </p>
        </div>

        {/* Botón de cerrar */}
        <button
          type="button"
          className="btn-close btn-close-white ms-3"
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          aria-label="Cerrar notificación"
          style={{ minWidth: '24px', minHeight: '24px' }}
        ></button>
      </div>

      {/* Barra de progreso visual */}
      <div 
        className="mt-2"
        style={{
          height: '3px',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: '#FFFFFF',
            width: `${progress}%`,
            transition: 'width 0.1s linear'
          }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tiempo restante de la notificación"
        ></div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Desactivar animación si está activada la reducción de movimiento */
        html.reduced-motion @keyframes slideInRight {
          from, to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// Hook personalizado para usar alertas visuales fácilmente
export function useVisualAlert() {
  const [alerts, setAlerts] = useState<Array<{
    id: number;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>>([]);

  const showAlert = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);
  };

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const AlertContainer = () => (
    <>
      {alerts.map((alert, index) => (
        <div key={alert.id} style={{ marginBottom: index > 0 ? '10px' : '0' }}>
          <VisualAlert
            message={alert.message}
            type={alert.type}
            onClose={() => removeAlert(alert.id)}
          />
        </div>
      ))}
    </>
  );

  return { showAlert, AlertContainer };
}
