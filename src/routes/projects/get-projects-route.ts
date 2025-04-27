import z from 'zod'
import { getProjectsService } from '../../services/projects/get-projects-service'
import type { FastifyTypedInstance } from '../../types'

export async function getProjectsRoute(app: FastifyTypedInstance) {
  app.get(
    '/projects',
    {
      schema: {
        tags: ['Projects'],
        description: 'Get projects',
        querystring: z.object({
          slug: z.string().optional(),
          page: z.string().optional(),
          take: z.string().optional(),
        }),
      },
    },
    async (request, replay) => {
      const { slug, page, take } = request.query
      const query = {
        slug: slug as string,
        page: Number(page),
        take: Number(take),
      }
      const projects = await getProjectsService({ query })
      return replay.status(200).send(projects)
    }
  )
}
