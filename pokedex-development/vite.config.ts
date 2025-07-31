import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // If you use absolute imports or aliases, configure here
  resolve: {
    alias: {
      // example: '@components': '/src/components',
    },
  },
});
