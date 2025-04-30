import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'], // Specify ES and CJS formats
      // name: 'SvgPathMiniTools', // Remove UMD name
      fileName: (format) => `index.${format}.js` // Output: index.es.js, index.cjs.js
    },
    rollupOptions: {
      // Ensure external packages aren't bundled
      // Add dependencies here if they shouldn't be bundled
      external: [],
      output: {
        // Global variables for UMD build
        globals: {}
      }
    }
  },
  plugins: [
    dts({
      // Specify the tsconfig file for declaration generation
      // Assuming we'll create tsconfig.types.json similar to resize-box
      // Or adjust if using the main tsconfig.json
      // tsconfigPath: './tsconfig.types.json',
      insertTypesEntry: true, // Create a single index.d.ts entry
      exclude: ['src/**/*.test.ts'] // Exclude test files from declarations
    })
  ],
})
