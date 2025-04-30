import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Config for building the demo app
  build: {
    outDir: resolve(__dirname, 'demo-dist'), // Output directory for demo build
    rollupOptions: {
      input: resolve(__dirname, 'demo/index.html') // Entry point for demo
    }
  },
  // Server config for development
  server: {
    open: '/demo/' // Automatically open the demo page
  }
})
