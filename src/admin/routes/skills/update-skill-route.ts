import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { updateSkillService } from '../../services/skills/update-skill-service'

export async function updateSkillRoute(app: FastifyTypedInstance) {
  app.put(
    '/adm/skill/:skillId',
    {
      schema: {
        params: z.object({
          skillId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().min(1).max(255),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { skillId } = request.params
      const data = request.body

      const result = await updateSkillService({ id: skillId, ...data })
      return reply.status(200).send(result)
    }
  )
}
