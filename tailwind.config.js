/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Legacy names — mapped to UI_UX_DESIGN_SYSTEM (cream / burgundy / emerald / gold) */
        'global-teal': '#1F6F54',
        'edge-purple': '#6B1F2A',
        'aqua-start': '#C6A15B',
        'aqua-end': '#2D8F6F',
        charcoal: '#1A1A1A',
        'soft-white': '#FBF7F1',
        /* Explicit GC tokens */
        'gc-cream': '#F5EFE6',
        'gc-cream-soft': '#FBF7F1',
        'gc-ivory': '#EFE6DA',
        'gc-burgundy': '#6B1F2A',
        'gc-burgundy-light': '#8B2F3A',
        'gc-wine': '#4A141D',
        'gc-emerald': '#1F6F54',
        'gc-emerald-light': '#2D8F6F',
        'gc-gold': '#C6A15B',
        'gc-gold-light': '#E5D199',
        'gc-charcoal': '#121212',
        'gc-text': '#1A1A1A',
        'gc-text-muted': '#5F5A55',
        'gc-text-subtle': '#B8AEA1',
        'gc-danger': '#8C1D18',
        'gc-warning': '#C9972B',
      },
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'gc-card': '18px',
        'gc-card-lg': '22px',
      },
      boxShadow: {
        'gc-card':
          '0 8px 30px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.55), 0 0 0 1px rgba(198,161,91,0.08) inset',
        'gc-lift':
          '0 14px 40px rgba(107,31,42,0.12), inset 0 1px 0 rgba(255,255,255,0.65)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
