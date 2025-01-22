import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { builtinModules } from 'module';

const allExternal = [
    ...builtinModules,
    ...builtinModules.map((m) => `node:${m}`)
]

// add the following to your config object

return {
    build: {
            rollupOptions: {
                external: ['fsevents', ...allExternal]
            }
    }
}

// https://vitejs.dev/config/
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
  }
})
