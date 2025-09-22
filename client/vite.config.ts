import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tailwindcss from "@tailwindcss/vite";
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      svgr(),
      tailwindcss(),
      checker({ typescript: true, enableBuild: false }),
  ],
    esbuild: {
        logOverride: { 'tsconfig.json': 'silent' },
    },
})
