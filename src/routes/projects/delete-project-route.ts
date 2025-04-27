import z from 'zod'
import { deleteProjectService } from '../../services/projects/delete-project-service'
import type { FastifyTypedInstance } from '../../types'

export async function deleteProjectRoute(app: FastifyTypedInstance) {
  app.delete(
    '/projects/:projectId/owner/:ownerId/delete',
    {
      schema: {
        tags: ['Projects'],
        description: 'Delete project',
        params: z.object({
          projectId: z.string(),
          ownerId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { projectId, ownerId } = request.params
      const project = await deleteProjectService({ projectId, ownerId })
      return reply.status(200).send(project)
    }
  )
}
