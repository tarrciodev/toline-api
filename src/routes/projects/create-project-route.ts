import z from 'zod'
import { createProjectService } from '../../services/projects/create-project-service'
import type { FastifyTypedInstance } from '../../types'

export async function createProjectRoute(app: FastifyTypedInstance) {
  app.post(
    '/project/create/:ownerId',
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
        }),
      },
    },
    async (request, replay) => {
      const { ownerId } = request.params
      if (!ownerId) return replay.status(200).send()
      const { name, description, categoryId, skills, subcategoryId } =
        request.body
      const data = {
        name,
        description,
        categoryId,
        skills,
        subcategoryId,
      }

      const createdProject = await createProjectService(data, ownerId)
      console.log({ createdProject })

      return replay.status(200).send(createdProject)
    }
  )
}
