import z from 'zod'
import { addSpecializationsService } from '../../services/toliners/add-specializations-services'
import type { FastifyTypedInstance } from '../../types'

export async function addSpecializationRoute(app: FastifyTypedInstance) {
  app.patch(
    '/toliner/:tolinerId/specializations/add',
    {
      schema: {
        params: z.object({
          tolinerId: z.string(),
        }),
        body: z.object({
          specializations: z.array(z.string()),
        }),
      },
    },
    async (request, reply) => {
      const { tolinerId } = request.params
      const { specializations } = request.body

      const toliner = await addSpecializationsService({
        tolinerId,
        specializations,
      })
      return reply.status(200).send(toliner)
    }
  )
}
