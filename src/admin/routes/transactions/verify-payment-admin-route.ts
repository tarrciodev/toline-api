import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { verifyPaymentAdminService } from '../../services/transactions/verify-payment-admin-service'

export async function verifyPaymentAdminRoute(app: FastifyTypedInstance) {
  app.patch(
    '/adm/payments/:paymentId/verify',
    {
      schema: {
        params: z.object({
          paymentId: z.string(),
        }),
        body: z.object({
          action: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { paymentId } = request.params
      const { action } = request.body
      const payment = await verifyPaymentAdminService({
        id: paymentId,
        status: action,
      })
      return reply.status(200).send(payment)
    }
  )
}
