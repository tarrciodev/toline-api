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
          clientInvoice: z.string().optional(),
          referenceNumber: z.string().optional(),
          dueDate: z.string().optional(),
        }),
        params: z.object({
          projectId: z.string().uuid(),
          ownerId: z.string().uuid(),
        }),
        querystring: z.object({
          paymentMethod: z.string().optional(),
        }),
      },
    },
    async (request, replay) => {
      const { projectId, ownerId } = request.params
      const { paymentMethod } = request.query
      const data = request.body
      const dependencies = {
        projectId,
        ownerId,
        paymentMethod,
      }

      const project = await updateProjectPaymentService({
        dependencies,
        data,
      })

      return replay.status(200).send(project)
    }
  )
}
