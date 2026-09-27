/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves the site from /<repo>/; dev server stays at /.
  base: command === 'build' ? '/COLOR-EXPLORER/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
}))
