/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './src/tests/coverage',
      all: true,
      include: ['src/shared/ui/**/*.tsx', 'src/pages/**/*.tsx', 'src/widgets/**/*.tsx'],
      exclude: [
        'src/pages/index.tsx',
        'src/pages/Editor',
        'src/shared/ui/ErrorFallback',
        'src/shared/ui/QueryEditor',
        'src/shared/ui/ModalDocumentation',
      ],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/app/styles/abstracts/_index.scss" as *;`,
      },
    },
  },
});
