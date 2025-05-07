import z from 'zod'
import { getClientPaymentsService } from '../../services/clients/get-client-payment-services'
import type { FastifyTypedInstance } from '../../types'

export async function getClientPaymentsRoute(app: FastifyTypedInstance) {
  app.get(
    '/client/:tolinerId/payments',
    {
      schema: {
        tags: ['Clients'],
        description: 'Get Client Payments',
        params: z.object({
          tolinerId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tolinerId } = request.params
      const payments = await getClientPaymentsService({ tolinerId })
      return reply.status(200).send(payments)
    }
  )
}
