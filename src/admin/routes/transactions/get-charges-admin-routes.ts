import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { getChargesAdminService } from '../../services/transactions/get-charges-admin-service'

export async function getChargesAdminRoutes(app: FastifyTypedInstance) {
  app.get(
    '/adm/charges',
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
      const charges = await getChargesAdminService({
        page,
        limit,
        status,
        search,
      })
      return reply.status(200).send(charges)
    }
  )
}
