/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        tech: {
          bg: 'rgba(var(--tech-bg), <alpha-value>)',
          surface: 'rgba(var(--tech-surface), <alpha-value>)',
          border: 'rgba(var(--tech-border), <alpha-value>)',
          'accent-light': 'rgba(var(--tech-accent-light), <alpha-value>)',
          'accent-dark': 'rgba(var(--tech-accent-dark), <alpha-value>)',
          text: 'rgba(var(--tech-text), <alpha-value>)',
          muted: 'rgba(var(--tech-text-muted), <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
}