import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/server.ts', './src/seed.ts'],
  format: 'esm',
  outDir: 'dist',
  clean: true,
})
