import z from 'zod'
import { updateProjectDueDate } from '../../services/projects/update-project-due-date-service'
import type { FastifyTypedInstance } from '../../types'

export async function updateProjectDueDateRoute(app: FastifyTypedInstance) {
  app.patch(
    '/project/:projectId/duedate',
    {
      schema: {
        params: z.object({
          projectId: z.string().uuid(),
        }),
        body: z.object({
          dueDate: z.coerce.date(),
        }),
      },
    },
    async (request, reply) => {
      const { projectId } = request.params
      const { dueDate } = request.body
      const project = await updateProjectDueDate(dueDate, projectId)
      return reply.status(200).send(project)
    }
  )
}
