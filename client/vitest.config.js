import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['src/main.js', 'src/__tests__/**', 'vite.config.js', 'vitest.config.js'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 50,
        lines: 80
      }
    }
  }
})
