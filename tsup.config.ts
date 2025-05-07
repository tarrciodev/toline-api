import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/seed.ts', 'src/server.ts'],
  format: ['cjs'], // Change to CommonJS format
  target: 'es2022',
  clean: true,
  noExternal: ['*prisma*'],
})
