/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f4f2ec',
          alt: '#eceade',
          card: '#fdfcf9',
        },
        charcoal: {
          DEFAULT: '#141318',
          alt: '#1b1a22',
        },
        ink: '#191820',
        body: '#4c4a54',
        muted: '#7b7887',
        hairline: '#e4e1d5',
        headline: '#f3f2ee',
        'muted-dark': '#a9a6b4',
        iris: {
          from: '#2f5ce8',
          to: '#7c5af0',
        },
        accent: {
          DEFAULT: '#2f5ce8',
          blue: '#2950c4',
          green: '#1f7c4e',
          violet: '#6647dd',
          amber: '#9c5c10',
          red: '#bf4545',
        },
        surface: {
          DEFAULT: '#f4f2ec',
          alt: '#eceade',
          card: '#fdfcf9',
          border: '#e4e1d5',
          raised: '#eceade',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
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
        'aurora-breathe': 'aurora-breathe 17s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
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
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'aurora-breathe': {
          '0%, 100%': { opacity: '0.06', transform: 'scale(1)' },
          '50%': { opacity: '0.17', transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}
