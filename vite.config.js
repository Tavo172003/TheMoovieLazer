import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/


export default defineConfig({

  plugins: [react()],
  server: {
    host: '0.0.0.0', // Esto le dice a Vite que escuche en todas las interfaces de red
    port: 5173       // Asegúrate de que este sea el puerto que usas
  }
})
