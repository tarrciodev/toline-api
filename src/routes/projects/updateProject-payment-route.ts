import z from 'zod'
import { updateProjectPaymentService } from '../../services/projects/update-project-payment-service'
import type { FastifyTypedInstance } from '../../types'

export async function updateProjectPaymentRoute(app: FastifyTypedInstance) {
  app.put(
    '/project/:projectId/owner/:ownerId/payment',
    {
      schema: {
        tags: ['Projects'],
        description: 'Update project payment',
        body: z.object({
          ammount: z.number(),
          clientInvoice: z.string(),
          dueDate: z.string(),
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

      const project = await updateProjectPaymentService({
        dependencies,
        data,
      })
      return replay.status(200).send(project)
    }
  )
}
