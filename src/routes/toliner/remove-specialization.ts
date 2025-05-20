import z from 'zod'
import { removeSpecializationService } from '../../services/toliners/remove-specialization-service'
import type { FastifyTypedInstance } from '../../types'

export async function removeSpecializationRoute(app: FastifyTypedInstance) {
  app.put(
    '/toliner/:tolinerId/specialization/:specializationId/remove',
    {
      schema: {
        tags: ['Toliners'],
        description: 'Remove specialization',
        params: z.object({
          tolinerId: z.string(),
          specializationId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { tolinerId, specializationId } = request.params

      const toliner = await removeSpecializationService({
        tolinerId,
        specializationId,
      })
      return reply.status(200).send(toliner)
    }
  )
}
