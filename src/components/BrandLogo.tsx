import React from 'react';

interface BrandLogoProps {
  variant?: 'horizontal' | 'vertical' | 'mark-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showPhones?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showPhones = false,
  className = '',
}) => {
  // Height configurations
  const heightClasses = {
    sm: variant === 'horizontal' ? 'h-9' : 'h-16',
    md: variant === 'horizontal' ? 'h-12' : 'h-24',
    lg: variant === 'horizontal' ? 'h-16' : 'h-32',
    xl: variant === 'horizontal' ? 'h-20' : 'h-40',
  };

  if (variant === 'mark-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[0_0_12px_rgba(212,160,23,0.5)]">
          <defs>
            <linearGradient id="goldMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1B8" />
              <stop offset="35%" stopColor="#F7D774" />
              <stop offset="70%" stopColor="#D4A017" />
              <stop offset="100%" stopColor="#8A6A12" />
            </linearGradient>
            <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2BA8FF" />
              <stop offset="100%" stopColor="#1E6BFF" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="#0B0E17" stroke="url(#goldMarkGrad)" strokeWidth="2.5" />
          {/* Glass Tower Silhouette */}
          <path d="M28 72 L28 35 L44 20 L58 35 L58 72 Z" stroke="url(#goldMarkGrad)" strokeWidth="2" fill="rgba(212,160,23,0.15)" />
          {/* Antenna with Spark */}
          <line x1="44" y1="20" x2="44" y2="12" stroke="#FF5A2E" strokeWidth="2" />
          <circle cx="44" cy="12" r="2.5" fill="#FF5A2E" />
          {/* Golden Sphinx Profile */}
          <path d="M52 68 C52 52 64 50 72 56 C78 60 76 68 76 72 Z" fill="url(#goldMarkGrad)" />
          {/* Flowing Wave */}
          <path d="M18 78 C38 70 62 84 82 76" stroke="url(#blueGlow)" strokeWidth="3" fill="none" />
        </svg>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Glowing Futuristic Skyline with Gold & Blue Plasma Waves */}
        <div className="relative mb-2">
          <svg viewBox="0 0 240 120" className="w-48 sm:w-56 h-auto drop-shadow-[0_0_20px_rgba(212,160,23,0.35)]">
            <defs>
              <linearGradient id="vGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1B8" />
                <stop offset="30%" stopColor="#F7D774" />
                <stop offset="70%" stopColor="#D4A017" />
                <stop offset="100%" stopColor="#8A6A12" />
              </linearGradient>
              <linearGradient id="vBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2BA8FF" />
                <stop offset="50%" stopColor="#1E6BFF" />
                <stop offset="100%" stopColor="#7B5CFF" />
              </linearGradient>
            </defs>
            {/* Cluster of illuminated skyscrapers */}
            <rect x="35" y="55" width="16" height="45" rx="1" fill="#111625" stroke="url(#vGoldGrad)" strokeWidth="1.2" />
            <rect x="55" y="40" width="20" height="60" rx="1" fill="#111625" stroke="url(#vGoldGrad)" strokeWidth="1.2" />
            <rect x="80" y="22" width="26" height="78" rx="2" fill="#111625" stroke="url(#vGoldGrad)" strokeWidth="1.6" />
            <rect x="110" y="12" width="30" height="88" rx="2" fill="#111625" stroke="url(#vGoldGrad)" strokeWidth="2" />
            <polygon points="125,4 121,12 129,12" fill="#FF5A2E" />
            <circle cx="125" cy="4" r="2" fill="#FFF1B8" />
            <rect x="145" y="26" width="24" height="74" rx="2" fill="#111625" stroke="url(#vGoldGrad)" strokeWidth="1.6" />
            <rect x="173" y="44" width="18" height="56" rx="1" fill="#111625" stroke="url(#vGoldGrad)" strokeWidth="1.2" />
            <rect x="195" y="58" width="15" height="42" rx="1" fill="#111625" stroke="url(#vGoldGrad)" strokeWidth="1.2" />
            {/* Golden Lit Windows Matrix */}
            {[45, 65, 85, 115, 125, 150, 178].map((x, i) => (
              <circle key={i} cx={x} cy={50 + (i % 3) * 12} r="1.5" fill="#FFF1B8" opacity="0.9" />
            ))}
            {/* Flowing Gold & Blue Dual Wave Base */}
            <path d="M10 98 C60 84 120 106 230 92" stroke="url(#vGoldGrad)" strokeWidth="3" fill="none" />
            <path d="M10 104 C70 94 130 114 230 100" stroke="url(#vBlueGrad)" strokeWidth="2.5" fill="none" />
          </svg>
        </div>

        {/* Brand Name Typography */}
        <div className="font-['Reem_Kufi',sans-serif] font-bold text-2xl sm:text-3xl tracking-wide bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(212,160,23,0.4)]">
          المصرية للعقارات
        </div>
        <div className="text-xs font-semibold text-[#B9BCC7] tracking-wider mt-0.5">
          مساكن شيراتون · Al Masreya Real Estate
        </div>

        {/* Optional Capsule with 3 Phones */}
        {showPhones && (
          <div className="mt-3 px-4 py-1.5 rounded-full bg-[#05060A]/90 border border-[#D4A017]/40 shadow-[0_0_15px_rgba(212,160,23,0.2)] text-xs font-mono font-bold text-white tracking-widest" dir="ltr">
            01286429815 - 01032599331 - 01280822224
          </div>
        )}
      </div>
    );
  }

  // Horizontal variant (for Header / Navbar / Admin Sidebar)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D Glass Tower & Golden Sphinx Emblem SVG */}
      <div className="relative shrink-0">
        <svg viewBox="0 0 130 110" className="w-11 sm:w-13 h-auto drop-shadow-[0_0_15px_rgba(212,160,23,0.35)]">
          <defs>
            <linearGradient id="hGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1B8" />
              <stop offset="30%" stopColor="#F7D774" />
              <stop offset="70%" stopColor="#D4A017" />
              <stop offset="100%" stopColor="#8A6A12" />
            </linearGradient>
            <linearGradient id="hBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2BA8FF" />
              <stop offset="100%" stopColor="#1E6BFF" />
            </linearGradient>
          </defs>
          {/* Modern Glass Skyscraper */}
          <polygon points="12,90 12,32 30,12 36,12 36,90" fill="#0B0E17" stroke="url(#hGoldGrad)" strokeWidth="1.8" />
          <polygon points="36,90 36,22 48,22 48,90" fill="#111625" stroke="url(#hGoldGrad)" strokeWidth="1.5" />
          <line x1="30" y1="12" x2="30" y2="4" stroke="#FF5A2E" strokeWidth="2" />
          <circle cx="30" cy="4" r="2" fill="#FF5A2E" />
          {/* Lit Windows */}
          <line x1="18" y1="40" x2="28" y2="40" stroke="#FFF1B8" strokeWidth="1.2" opacity="0.8" />
          <line x1="18" y1="52" x2="28" y2="52" stroke="#FFF1B8" strokeWidth="1.2" opacity="0.8" />
          <line x1="18" y1="64" x2="28" y2="64" stroke="#FFF1B8" strokeWidth="1.2" opacity="0.8" />
          {/* Golden Pharaoh / Sphinx Bust on the right */}
          <path d="M70 78 C70 56 82 48 95 48 C108 48 118 56 118 78 Z" fill="url(#hGoldGrad)" opacity="0.9" />
          <path d="M85 58 C85 54 95 50 102 54 C106 58 104 68 96 68 Z" fill="#FFF1B8" opacity="0.4" />
          {/* Flowing Ribbon Base */}
          <path d="M6 94 C40 82 85 102 124 90" stroke="url(#hGoldGrad)" strokeWidth="3" fill="none" />
          <path d="M8 98 C42 86 87 106 124 94" stroke="url(#hBlueGrad)" strokeWidth="1.8" fill="none" />
        </svg>
      </div>

      {/* Brand Text Lockup */}
      <div className="flex flex-col text-right">
        <span className="font-['Reem_Kufi',sans-serif] font-bold text-lg sm:text-2xl leading-none bg-gradient-to-r from-[#FFF1B8] via-[#F7D774] to-[#D4A017] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(212,160,23,0.3)]">
          المصرية للعقارات
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] sm:text-xs font-semibold text-[#B9BCC7] tracking-wider font-['Tajawal',sans-serif]">
            مساكن شيراتون
          </span>
          <span className="w-1 h-1 rounded-full bg-[#D4A017]" />
          <span className="text-[9px] sm:text-[10px] font-mono text-[#D4A017] uppercase tracking-wider hidden sm:inline">
            Al Masreya
          </span>
        </div>
      </div>
    </div>
  );
};
