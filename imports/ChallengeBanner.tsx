import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

// Paleta de 6 colores suaves predefinidos
const COLOR_PALETTES = {
  blue: 'linear-gradient(135deg, #E3F2FD 0%, #90CAF9 100%)',
  green: 'linear-gradient(135deg, #E8F5E9 0%, #81C784 100%)',
  purple: 'linear-gradient(135deg, #F3E5F5 0%, #BA68C8 100%)',
  orange: 'linear-gradient(135deg, #FFF3E0 0%, #FFB74D 100%)',
  pink: 'linear-gradient(135deg, #FCE4EC 0%, #F06292 100%)',
  teal: 'linear-gradient(135deg, #E0F2F1 0%, #4DB6AC 100%)'
} as const;

export type ColorPalette = keyof typeof COLOR_PALETTES;

interface ChallengeBannerProps {
  imageUrl?: string;
  iconifyIcon?: string; // Nuevo: nombre del ícono de Iconify
  title: string;
  colorPalette: ColorPalette;
  children?: React.ReactNode; // Para la pill flotante
}

export function ChallengeBanner({ imageUrl, iconifyIcon, title, colorPalette, children }: ChallengeBannerProps) {
  const gradientColor = COLOR_PALETTES[colorPalette];

  return (
    <div 
      className="relative h-40 overflow-hidden"
      style={{ background: gradientColor }}
    >
      {/* Imagen circular centrada */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-white shadow-lg overflow-hidden flex items-center justify-center p-1.5">
          {iconifyIcon ? (
            <Icon icon={iconifyIcon} className="w-14 h-14 text-gray-700" />
          ) : (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>

      {/* Pill flotante (pasada como children) */}
      {children}
    </div>
  );
}