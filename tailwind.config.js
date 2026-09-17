/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f4f4f5',
          raised: '#ffffff',
          muted: '#ececee',
          border: '#e4e4e7',
        },
        ink: {
          DEFAULT: '#18181b',
          secondary: '#3f3f46',
          muted: '#71717a',
        },
        brand: {
          DEFAULT: '#1d4ed8',
          soft: '#eff6ff',
        },
        pass: {
          DEFAULT: '#15803d',
          soft: '#f0fdf4',
        },
        warn: {
          DEFAULT: '#b45309',
          soft: '#fffbeb',
        },
        fail: {
          DEFAULT: '#b91c1c',
          soft: '#fef2f2',
        },
        info: {
          DEFAULT: '#1d4ed8',
          soft: '#eff6ff',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(24, 24, 27, 0.06), 0 1px 3px rgba(24, 24, 27, 0.04)',
      },
      fontFamily: {
        sans: [
          'Segoe UI',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
