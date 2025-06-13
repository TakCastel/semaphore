// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './formkit.config.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['"Anton"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
