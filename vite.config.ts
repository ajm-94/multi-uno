import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['localhost', '32f7-5-31-164-131.ngrok-free.app', '*.ngrok-free.app'],
  },
});