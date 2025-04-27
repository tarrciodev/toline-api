import z from 'zod'
import { projectToFreelancerService } from '../../services/projects/freelancer'
import type { FastifyTypedInstance } from '../../types'

export async function projectToFreelancerRoute(app: FastifyTypedInstance) {
  app.put(
    '/project/freelancer/:freelancerId',
    {
      schema: {
        tags: ['Projects'],
        description: 'Assign and unassign project to freelancer',
        body: z.object({
          projectId: z.string().uuid(),
          ownerId: z.string().uuid(),
        }),
        params: z.object({
          freelancerId: z.string().uuid(),
        }),
        querystring: z.object({
          action: z.enum(['assign', 'unassign']),
        }),
      },
    },
    async (request, replay) => {
      const action = request.query.action
      const { body } = request
      const { freelancerId } = request.params
      const dependencies = {
        ...body,
        freelancerId,
        action,
      }

      const project = await projectToFreelancerService(dependencies)
      return replay.status(200).send(project)
    }
  )
}
