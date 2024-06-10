import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{port:7767},
  build: {
    commonjsOptions: { transformMixedEsModules: true }, // Change
  },
})
