import z from 'zod'
import { ProjectVerificationEmail } from '../../emails/functions/project-verification-function'
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
          quotation: z.number().optional(),
        }),
        params: z.object({
          ownerId: z.string().uuid(),
        }),
      },
    },
    async (request, replay) => {
      const { ownerId } = request.params
      if (!ownerId) return replay.status(200).send()
      const {
        name,
        description,
        categoryId,
        skills,
        subcategoryId,
        quotation,
      } = request.body
      const data = {
        name,
        description,
        categoryId,
        skills,
        subcategoryId,
        quotation,
      }

      const createdProject = await createProjectService(data, ownerId)
      await ProjectVerificationEmail({
        user: createdProject.owner,
        project: {
          id: createdProject.id,
          name: createdProject.name,
        },
      })

      return replay.status(200).send(createdProject)
    }
  )
}
