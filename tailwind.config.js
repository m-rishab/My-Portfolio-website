/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Google-inspired primary palette
        primary: {
          DEFAULT: '#1a73e8',
          light: '#4285f4',
          dark: '#1557b0',
          50: '#e8f0fe',
          100: '#d2e3fc',
          200: '#aecbfa',
          300: '#8ab4f8',
          400: '#669df6',
          500: '#4285f4',
          600: '#1a73e8',
          700: '#1557b0',
          800: '#0d3c7d',
          900: '#042754',
        },
        // Semantic accent colors (Google palette)
        accent: {
          DEFAULT: '#1a73e8',
          light: '#4285f4',
          blue: '#1a73e8',
          red: '#ea4335',
          yellow: '#fbbc05',
          green: '#34a853',
          purple: '#a142f4',
        },
        // Expanded surface/neutral grays (slate scale)
        surface: {
          DEFAULT: '#f8fafc',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          card: '#ffffff',
          border: '#e2e8f0',
          raised: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'blob': 'blob 30s ease-in-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blob: {
          '0%, 100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
      },
    },
  },
  plugins: [],
}
