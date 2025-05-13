import z from 'zod'
import { getChargesService } from '../../services/toliners/get-charges-service'
import type { FastifyTypedInstance } from '../../types'

export async function getChargesRoute(app: FastifyTypedInstance) {
  app.get(
    '/charges/:tolinerId',
    {
      schema: {
        params: z.object({
          tolinerId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { tolinerId } = request.params as { tolinerId: string }
      const charges = await getChargesService(tolinerId)

      return reply.status(200).send(charges)
    }
  )
}
