import React from 'react';

interface LogoProps {
  variant?: 'blue' | 'white';
  height?: string;
  className?: string;
}

export function Logo({ variant = 'blue', height = '60px', className = '' }: LogoProps) {
  const color = variant === 'blue' ? '#0066CC' : '#FFFFFF';
  
  return (
    <svg 
      viewBox="0 0 280 70" 
      style={{ height, width: 'auto' }}
      className={className}
      role="img"
      aria-labelledby="logo-title"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="logo-title">Universidad Internacional SEK Ecuador</title>
      
      {/* Símbolo UISEK - Libro abierto con estrella */}
      <g transform="translate(5, 8)">
        {/* Páginas del libro */}
        <path 
          d="M 0 20 L 0 50 Q 12 45 24 50 L 24 20 Q 12 25 0 20 Z" 
          fill={color}
          opacity="0.9"
        />
        <path 
          d="M 24 20 L 24 50 Q 36 45 48 50 L 48 20 Q 36 25 24 20 Z" 
          fill={color}
          opacity="0.7"
        />
        
        {/* Estrella de excelencia */}
        <circle cx="24" cy="10" r="6" fill={color} />
        <circle cx="24" cy="10" r="3" fill={variant === 'blue' ? '#FFFFFF' : '#0066CC'} />
        
        {/* Conexión */}
        <line x1="24" y1="16" x2="24" y2="20" stroke={color} strokeWidth="2" />
      </g>
      
      {/* Texto UISEK - Bold y prominente */}
      <g transform="translate(70, 38)">
        <text 
          x="0" 
          y="0" 
          fill={color}
          style={{
            fontSize: '36px',
            fontWeight: '700',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
            letterSpacing: '1.5px'
          }}
        >
          UISEK
        </text>
      </g>
      
      {/* Texto descriptivo - Más pequeño y refinado */}
      <g transform="translate(70, 52)">
        <text 
          x="0" 
          y="0" 
          fill={color}
          opacity="0.8"
          style={{
            fontSize: '9px',
            fontWeight: '500',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
            letterSpacing: '1.2px'
          }}
        >
          UNIVERSIDAD INTERNACIONAL SEK
        </text>
      </g>
    </svg>
  );
}