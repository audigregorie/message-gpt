import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // Example: Add global variables or mixins
  //       additionalData: `@import "./src/styles/variables.scss";`
  //     }
  //   }
  // }
});
