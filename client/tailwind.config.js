/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#14B88A',
          dark:    '#0D8F6A',
          light:   '#E6F7F2',
        },
        ai: {
          DEFAULT: '#7C3AED',
          dark:    '#5B21B6',
          light:   '#EDE9FE',
        },
        surface: {
          bg:     '#F8FFFD',
          card:   '#FFFFFF',
          border: '#DCEFE8',
        },
        ink: {
          DEFAULT:   '#0F172A',
          secondary: '#64748B',
          muted:     '#94A3B8',
          inverse:   '#FFFFFF',
        },
        status: {
          success: '#16A34A',
          warning: '#F59E0B',
          danger:  '#EF4444',
          info:    '#0EA5E9',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'display':    ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-lg': ['1.5rem',  { lineHeight: '1.3',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading':    ['1.25rem', { lineHeight: '1.4',  fontWeight: '600' }],
        'heading-sm': ['1.125rem',{ lineHeight: '1.4',  fontWeight: '600' }],
        'body-lg':    ['1.0625rem',{ lineHeight: '1.7', fontWeight: '400' }],
        'body':       ['0.9375rem',{ lineHeight: '1.6', fontWeight: '400' }],
        'body-sm':    ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption':    ['0.8125rem',{ lineHeight: '1.5', fontWeight: '400' }],
        'label':      ['0.8125rem',{ lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'sm':  '6px',
        DEFAULT:'8px',
        'md':  '10px',
        'lg':  '14px',
        'xl':  '18px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'xs':  '0 1px 2px 0 rgba(15,23,42,0.04)',
        'sm':  '0 1px 3px 0 rgba(15,23,42,0.06), 0 1px 2px -1px rgba(15,23,42,0.04)',
        DEFAULT:'0 2px 8px -1px rgba(15,23,42,0.08), 0 1px 3px -1px rgba(15,23,42,0.04)',
        'md':  '0 4px 16px -2px rgba(15,23,42,0.10), 0 2px 6px -2px rgba(15,23,42,0.05)',
        'lg':  '0 8px 32px -4px rgba(15,23,42,0.12), 0 4px 12px -4px rgba(15,23,42,0.06)',
        'xl':  '0 20px 48px -8px rgba(15,23,42,0.14), 0 8px 20px -8px rgba(15,23,42,0.08)',
        'glow-primary': '0 0 0 3px rgba(20,184,138,0.15)',
        'glow-ai':      '0 0 0 3px rgba(124,58,237,0.15)',
      },
      animation: {
        'fade-in':     'fadeIn 0.2s ease-out',
        'slide-up':    'slideUp 0.3s ease-out',
        'slide-down':  'slideDown 0.3s ease-out',
        'scale-in':    'scaleIn 0.2s ease-out',
        'pulse-soft':  'pulseSoft 2s ease-in-out infinite',
        'shimmer':     'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                         to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(8px)' },  to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { from: { opacity: '0', transform: 'scale(0.96)' },      to: { opacity: '1', transform: 'scale(1)' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
        shimmer:   { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}