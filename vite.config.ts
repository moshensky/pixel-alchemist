import react from '@vitejs/plugin-react-swc'
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['src/test/setup.ts'],
    environment: 'jsdom',
  },
})
