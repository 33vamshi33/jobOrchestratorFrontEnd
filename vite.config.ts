import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    },
    watch: {
      usePolling: true,
    },
    headers: {
      'Cache-Control': 'no-store',
    }
  },
  build: {
    sourcemap: true,
  }
});
