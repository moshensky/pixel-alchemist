import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    setupFiles: ['src/test/setup.ts'],
    environment: 'jsdom',
  },
})
