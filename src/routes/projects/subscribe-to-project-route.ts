import z from 'zod'
import { subscribeToProjectService } from '../../services/projects/subscribe-to-project-service'
import type { FastifyTypedInstance } from '../../types'

export async function subscribeToProjectRoute(app: FastifyTypedInstance) {
  app.put(
    '/project/:projectId/subscribe/:tolinerId',
    {
      schema: {
        tags: ['Projects'],
        description: 'Subscribe to a project',
        body: z.object({
          quotation: z.number(),
          estimatedTime: z.string(),
          requiredInformations: z.string(),
          similarExperiences: z.string(),
          proposal: z.string(),
        }),
        params: z.object({
          projectId: z.string().uuid(),
          tolinerId: z.string().uuid(),
        }),
      },
    },
    async (request, replay) => {
      const dependencies = request.params
      const data = request.body
      const project = await subscribeToProjectService({
        dependencies,
        data,
      })

      return replay.status(200).send(project)
    }
  )
}
