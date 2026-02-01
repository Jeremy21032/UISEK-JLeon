import { useCallback } from 'react';

// Hook personalizado para manejar el modal de postulación desde cualquier componente
export function usePostulacion() {
  const abrirPostulacion = useCallback(() => {
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('open-postulacion'));
  }, []);

  return { abrirPostulacion };
}
