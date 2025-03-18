import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet l'accès depuis l'extérieur (contener)
    port: 5173, // Assurez-vous d'utiliser le bon port (le même que dans Dockerfile)
    watch: {
      usePolling: true, // Utiliser le polling pour mieux gérer les changements dans Docker
    },
  },
});
