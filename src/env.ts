import { z } from 'zod'
const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  REDIS_URL: z.string().default('redis://localhost:6370'),
})

export const env = envSchema.parse(process.env)
