import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    headers: {
      'Content-Security-Policy':
        process.env.NODE_ENV === 'development'
          ? [
              `default-src 'self' 'unsafe-inline' 'unsafe-eval'`,
              `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
              `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
              `img-src 'self' data: ${process.env.API || 'http://localhost:3000'}`,
              `font-src 'self' https://fonts.gstatic.com`,
              `connect-src 'self' ${process.env.API} ws://localhost:*`,
              `form-action 'self'`,
            ].join('; ')
          : '',
    },
  },
  define: {
    __SERVER_URL__: process.env.SERVER_URL,
    __SERVER_PORT__: process.env.SERVER_PORT,
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
  },
  build: {
    outDir: path.join(__dirname, 'dist/client'),
  },
  plugins: [react()],
})
