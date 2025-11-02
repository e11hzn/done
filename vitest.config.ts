import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    include: ['./src/**/*.test.*'],
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
