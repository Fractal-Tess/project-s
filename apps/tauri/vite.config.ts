import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],

  build: {
    outDir: 'build',
  },
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
  },

  envPrefix: ['VITE_', 'TAURI_'],
}));
