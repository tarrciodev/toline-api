import z from 'zod'
import { updateProjectQuotationService } from '../../services/projects/quotation'
import type { FastifyTypedInstance } from '../../types'

export async function updateProjectQuotationRoute(app: FastifyTypedInstance) {
  app.put(
    '/project/:projectId/owner/:ownerId/quotation',
    {
      schema: {
        tags: ['Projects'],
        description: 'Create or update a project quotation',
        body: z.object({
          ammount: z.number(),
          description: z.string(),
        }),
        params: z.object({
          projectId: z.string().uuid(),
          ownerId: z.string().uuid(),
        }),
      },
    },
    async (request, replay) => {
      const { projectId, ownerId } = request.params
      const data = request.body
      const dependencies = {
        projectId,
        ownerId,
      }

      const project = await updateProjectQuotationService({
        dependencies,
        data,
      })
      return replay.status(200).send(project)
    }
  )
}
