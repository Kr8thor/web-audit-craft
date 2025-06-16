import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { lovableTagger } from 'lovable-tagger'

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    lovableTagger(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))