import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/Add':        'http://localhost:8083',
      '/DisplayAll': 'http://localhost:8083',
      '/Delete':     'http://localhost:8083',
      '/Update':     'http://localhost:8083',
      '/Get':        'http://localhost:8083',
      '/swagger-ui': 'http://localhost:8083',
      '/v3/api-docs':'http://localhost:8083',
    },
  },
})
