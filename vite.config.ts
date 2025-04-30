import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'demo', // Set project root to the demo directory
  base: '/svg-path-mini-tools/',
  // Config for building the demo app
  build: {
    outDir: '../demo-dist', // Output relative to the new root
    emptyOutDir: true // Ensure old builds are cleaned
    // rollupOptions removed, Vite finds index.html in root
  },
  // Server config for development
  server: {
    open: '/' // Open the root (index.html) relative to the 'demo' root
  }
})
