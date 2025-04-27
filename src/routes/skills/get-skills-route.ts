import { getSkillsService } from '../../services/skills/get-skills-service'
import type { FastifyTypedInstance } from '../../types'

export async function getSkillsRoutes(app: FastifyTypedInstance) {
  app.get(
    '/skills',
    {
      schema: {
        tags: ['Skills'],
        description: 'Get all skills',
      },
    },
    async (request, reply) => {
      const skills = await getSkillsService()
      return reply.status(200).send(skills)
    }
  )
}
