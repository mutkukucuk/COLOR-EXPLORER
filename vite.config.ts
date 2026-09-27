/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs: the build works from any path (GitHub Pages
  // /COLOR-EXPLORER/, `vite preview`, or opening dist/ with a static server).
  base: './',
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
