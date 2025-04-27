import z from 'zod'
import { updateBaseProjectService } from '../../services/projects/update-base-project-service'
import type { FastifyTypedInstance } from '../../types'

export async function updateBaseProjectRoute(app: FastifyTypedInstance) {
  app.post(
    '/project/:projectId/ownerId/:ownerId',
    {
      schema: {
        tags: ['Projects'],
        description: 'Create a new project',
        body: z.object({
          name: z.string(),
          description: z.string(),
          categoryId: z.string().uuid(),
          skills: z.array(z.string().uuid()).optional(),
          subcategoryId: z.string().uuid().optional(),
        }),
        params: z.object({
          ownerId: z.string().uuid(),
          projectId: z.string().uuid(),
        }),
      },
    },
    async (request, replay) => {
      const { ownerId, projectId } = request.params
      if (!ownerId) return replay.status(200).send()
      const { name, description, categoryId, skills, subcategoryId } =
        request.body
      const data = {
        id: projectId,
        name,
        description,
        categoryId,
        skills,
        subcategoryId,
      }

      const updatedProject = await updateBaseProjectService(data, ownerId)

      return replay.status(200).send(updatedProject)
    }
  )
}
