import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { createSkillService } from '../../services/skills/create-skill-service'

export async function createSkillRoute(app: FastifyTypedInstance) {
  app.post(
    '/adm/skill',
    {
      schema: {
        body: z.object({
          name: z.string(),
          description: z.string().optional(),
          subcategoryId: z.string().uuid().optional(),
          categoryId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const skill = request.body
      const result = await createSkillService(skill)
      return reply.status(201).send(result)
    }
  )
}
