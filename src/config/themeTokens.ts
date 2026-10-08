/**
 * Design Tokens for "FUTURISTIC LUXURY 2027" (Awwwards-Level Cinema)
 * Metallic Gold Shimmer + Electric Blue Plasma + Deep Obsidian Void #05060A
 */

export const THEME_TOKENS = {
  colors: {
    void: '#05060A',
    surface: '#0B0E17',
    surfaceElevated: '#111625',
    surfaceGlass: 'rgba(11, 14, 23, 0.72)',
    
    // Metallic Gold Gradient spectrum
    goldLight: '#FFF1B8',
    goldGlow: '#F7D774',
    goldPrimary: '#D4A017',
    goldDeep: '#8A6A12',
    goldMetallicGrad: 'linear-gradient(135deg, #FFF1B8 0%, #F7D774 30%, #D4A017 65%, #8A6A12 100%)',
    goldRadialGrad: 'radial-gradient(circle, #F7D774 0%, #D4A017 45%, #8A6A12 100%)',
    
    // Electric Blue & Violet Plasma
    electricBlue: '#2BA8FF',
    electricDeep: '#1E6BFF',
    plasmaViolet: '#7B5CFF',
    sparkOrange: '#FF5A2E',
    
    // Text Hierarchy
    textPrimary: '#FFFFFF',
    textSecondary: '#B9BCC7',
    textMuted: '#6E7487',
    textGold: '#F7D774',
  },
  glass: {
    standard: 'backdrop-blur-2xl bg-[#0B0E17]/70 border border-white/[0.08]',
    goldBorder: 'backdrop-blur-2xl bg-[#0B0E17]/80 border border-[#D4A017]/30 shadow-[0_0_25px_rgba(212,160,23,0.08)]',
    interactiveHover: 'transition-all duration-300 hover:border-[#D4A017]/50 hover:shadow-[0_0_35px_rgba(212,160,23,0.18)] hover:-translate-y-1',
  },
  typography: {
    displayAr: "'Reem Kufi', 'Cairo', sans-serif",
    bodyAr: "'Cairo', 'Tajawal', sans-serif",
    displayEn: "'Sora', sans-serif",
    bodyEn: "'Poppins', sans-serif",
  },
  animations: {
    shimmer: 'shimmer 3s ease-in-out infinite',
    float: 'float 6s ease-in-out infinite',
    pulseGlow: 'pulseGlow 4s ease-in-out infinite',
  },
};
