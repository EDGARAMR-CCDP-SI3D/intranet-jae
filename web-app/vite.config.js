import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // Exponer en todas las interfaces de red (LAN + Tailscale)
    port: 5173,
    strictPort: true,   // Fallar si el puerto ya está ocupado (evita puertos aleatorios)
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
