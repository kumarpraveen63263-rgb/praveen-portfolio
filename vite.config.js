import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: [
        '**/public/projects/powerhouse-demo.mp4',
        '**/public/profile-hero.png',
        '**/public/profile-original.png',
        '**/public/clg/sa2.png',
      ],
    },
  },
});
