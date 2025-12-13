/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#2d5016',
          light: '#3d6b1f',
        },
        accent: {
          default: '#a8e63d',
          light: '#c8ff5a',
        },
        tea: {
          50: '#f9fbf8',
          100: '#f5f9f2',
          200: '#eef5e8',
          300: '#e8f0e8',
          400: '#c0d8b0',
          500: '#a8e63d',
          600: '#7a8f6d',
          700: '#3d6b1f',
          800: '#2d5016',
          900: '#1a3d0a',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        'safe-top': 'max(1.5rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1.5rem, env(safe-area-inset-bottom))',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'tea': '0 10px 30px rgba(45, 80, 22, 0.1)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
