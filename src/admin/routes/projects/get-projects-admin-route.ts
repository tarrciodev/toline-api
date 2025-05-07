import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { getProjectsAdminService } from '../../services/projects/get-projects-admin-service'

export async function getProjectsAdminRoute(app: FastifyTypedInstance) {
  app.get(
    '/adm/projects',
    {
      schema: {
        querystring: z.object({
          page: z.coerce.number().optional(),
          limit: z.coerce.number().optional(),
          search: z.string().optional(),
          status: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { page, limit, search, status } = request.query
      const projects = await getProjectsAdminService({
        page,
        limit,
        search,
        status,
      })

      return reply.status(200).send(projects)
    }
  )
}
