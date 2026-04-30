/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Atkinson Hyperlegible', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Courier New', 'monospace'],
      },
      colors: {
        // Accessibility-focused color palette
        'contrast': {
          light: '#ffffff',
          dark: '#000000',
          yellow: '#ffff00',
          black: '#000000',
        },
        'accessible': {
          blue: '#0066cc',
          green: '#00aa00',
          red: '#cc0000',
          orange: '#ff8800',
        },
      },
      fontSize: {
        // Scalable font sizes for accessibility
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      spacing: {
        // Improved spacing for touch accessibility
        'touch': '2.75rem', // 44px minimum touch target
      },
      minHeight: {
        'touch': '2.75rem',
      },
      minWidth: {
        'touch': '2.75rem',
      },
    },
  },
  plugins: [],
}

