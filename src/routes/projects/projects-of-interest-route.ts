import z from 'zod'
import { getProjectsOfInterestService } from '../../services/projects/projects-of-interest-service'
import type { FastifyTypedInstance } from '../../types'

export async function getProjectsOfInterestRoute(app: FastifyTypedInstance) {
  app.get(
    '/projects/of-interest/:userEmail',
    {
      schema: {
        tags: ['Projects'],
        description: 'Get projects of interest',
        params: z.object({
          userEmail: z.string().optional(),
        }),
        querystring: z.object({
          categorySlug: z.string().optional(),
        }),
      },
    },
    async (request, replay) => {
      const categorySlug = request.query.categorySlug as string
      const userEmail = request.params.userEmail as string
      const projects = await getProjectsOfInterestService({
        userEmail,
        categorySlug,
      })
      return replay.status(200).send(projects)
    }
  )
}
