
import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { getFreelancersAdminService } from '../../services/freelancers/get-freelancers-admin-service'

export async function getFreelancersAdminRoute(app: FastifyTypedInstance) {
  app.get(
    '/adm/freelancers',
    {
      schema: {
        querystring: z.object({
          page: z.coerce.number().min(1).max(100).optional(),
          limit: z.coerce.number().min(1).max(100).optional(),
          status: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { page, limit, status } = request.query
      const freelancers = await getFreelancersAdminService({
        page,
        limit,
        status: status,
      })
      return reply.status(200).send(freelancers)
    }
  )
}
