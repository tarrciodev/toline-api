import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { verifyChargeAdminService } from '../../services/transactions/verify-charge-admin-service'

export async function verifyChargeAdminRoute(app: FastifyTypedInstance) {
  app.patch(
    '/adm/charges/:chargeId/verify',
    {
      schema: {
        params: z.object({
          chargeId: z.string(),
        }),
        body: z.object({
          action: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { chargeId } = request.params
      const { action } = request.body
      const charge = await verifyChargeAdminService({
        id: chargeId,
        status: action,
      })
      return reply.status(200).send(charge)
    }
  )
}
