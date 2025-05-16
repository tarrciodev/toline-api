import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { deleteSkillService } from '../../services/skills/delete-skill-service'

export async function deleteSkillRoute(app: FastifyTypedInstance) {
  app.delete(
    '/adm/skill/:skillId',
    {
      schema: {
        params: z.object({
          skillId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { skillId } = request.params

      const result = await deleteSkillService(skillId)
      return reply.status(200).send(result)
    }
  )
}
