/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"M PLUS 2"', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  darkMode: ['selector', '[data-theme=dark]'],
}
