import z from 'zod'
import { updateFreelancerSkillsService } from '../../services/freelancers/update-freelancer-skills-service'
import type { FastifyTypedInstance } from '../../types'

export async function updateFreelancerSkillsRoute(app: FastifyTypedInstance) {
  app.patch(
    '/freelancer/:userId/skills/update',
    {
      schema: {
        tags: ['Freelancers'],
        description: 'Update freelancers skills',
        body: z.object({
          skills: z.array(z.string().uuid()),
        }),
        params: z.object({
          userId: z.string().uuid(),
        }),
        querystring: z.object({
          action: z.enum(['add', 'remove']),
        }),
      },
    },
    async (request, replay) => {
      const skills = request.body.skills
      const userId = request.params.userId
      const action = request.query.action

      const updatedFreelancer = await updateFreelancerSkillsService({
        skills,
        userId,
        action,
      })
      return replay.status(200).send(updatedFreelancer)
    }
  )
}
