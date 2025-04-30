import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom', // Use jsdom for DOM simulation if needed
      globals: true, // Make test globals (describe, it, expect) available
      include: ['src/**/*.test.ts'], // Pattern to find test files
      // Add coverage configuration if desired
      // coverage: {
      //   provider: 'v8',
      //   reporter: ['text', 'json', 'html'],
      // },
    },
  })
)
