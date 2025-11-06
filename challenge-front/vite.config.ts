import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

 
  server: {
    proxy: {
  
      '/api': {
      
        target: 'https://hospitaltech-api-latest.onrender.com/q/swagger-ui/#/',
       
        changeOrigin: true,
       
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})