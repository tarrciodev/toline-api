import z from 'zod'
import { getProjectByIdService } from '../../services/projects/get-project-by-id-service'
import type { FastifyTypedInstance } from '../../types'

export async function getProjectByIdRoute(app: FastifyTypedInstance) {
  app.get(
    '/project/:projectId',
    {
      schema: {
        tags: ['Projects'],
        description: 'Get project by id',
        params: z.object({
          projectId: z.string().uuid(),
        }),
      },
    },
    async (request, replay) => {
      const { projectId } = request.params
      if (!projectId) return replay.status(200).send()
      const project = await getProjectByIdService(projectId)
      return replay.status(200).send(project)
    }
  )
}
