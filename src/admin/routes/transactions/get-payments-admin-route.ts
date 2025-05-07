import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { getPaymentsAdminService } from '../../services/transactions/get-payments-admin-service'

export async function getPaymentsAdminRoute(app: FastifyTypedInstance) {
  app.get(
    '/adm/payments',
    {
      schema: {
        querystring: z.object({
          page: z.coerce.number().min(1).max(100).optional(),
          limit: z.coerce.number().min(1).max(100).optional(),
          status: z.string(),
          search: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { page, limit, status, search } = request.query
      const payments = await getPaymentsAdminService({
        page,
        limit,
        status,
        search,
      })
      return reply.status(200).send(payments)
    }
  )
}
