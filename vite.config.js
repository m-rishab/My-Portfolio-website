import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function extractCvPlugin() {
  const cvPath = resolve('public/RishabhCV.pdf');

  function extractCv() {
    execFileSync('node', ['scripts/extract-cv.mjs'], { stdio: 'inherit' });
  }

  return {
    name: 'extract-cv',
    buildStart() {
      extractCv();
    },
    configureServer(server) {
      server.watcher.add(cvPath);
      server.watcher.on('change', (filePath) => {
        if (filePath === cvPath) {
          extractCv();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [extractCvPlugin(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'lucide': ['lucide-react'],
          'helmet': ['react-helmet-async'],
        },
      },
    },
  },
});
