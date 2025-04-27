import z from 'zod'
import { getTolinerService } from '../../services/toliners/get-toliner-service'
import type { FastifyTypedInstance } from '../../types'

export async function getTolinerRoute(app: FastifyTypedInstance) {
  app.get(
    '/toliner/entity/:email',
    {
      schema: {
        tags: ['Toliners'],
        description: 'Get Toliners',
        params: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (request, reply) => {
      const { email } = request.params
      const toliner = await getTolinerService(email)
      return reply.status(200).send(toliner)
    }
  )
}
