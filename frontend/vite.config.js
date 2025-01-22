import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { builtinModules } from 'module';

// Define external modules with wildcard
const allExternal = [
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
  'fsevents' // Add specific external module
];

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      external: allExternal,
      onwarn(warning, warn) {
        // Handle specific warnings or suppress them
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          return; // Ignore UNUSED_EXTERNAL_IMPORT warnings
        }
        warn(warning); // Otherwise pass the warning to Rollup
      }
    }
  }
});
