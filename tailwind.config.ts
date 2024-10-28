import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}', './notes/**/*.mdx'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
