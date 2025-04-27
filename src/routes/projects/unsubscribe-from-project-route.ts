import z from 'zod'
import { unsubscribeFromProjectService } from '../../services/projects/unsubscribe-from-project-service'
import type { FastifyTypedInstance } from '../../types'

export async function unsubscribeFromProjectRoute(app: FastifyTypedInstance) {
  app.put(
    '/project/:projectId/unsubscribe/:tolinerId',
    {
      schema: {
        tags: ['Projects'],
        description: 'Unsubscribe from a project',
        params: z.object({
          projectId: z.string().uuid(),
          tolinerId: z.string().uuid(),
        }),
      },
    },
    async (request, replay) => {
      const project = await unsubscribeFromProjectService(request.params)
      return replay.status(200).send(request.params)
    }
  )
}
