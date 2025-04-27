import z from 'zod'
import { updateUserIdentificationService } from '../../services/users/update-user-identification-service'
import type { FastifyTypedInstance } from '../../types'

export async function updateUserIdentificationRoute(app: FastifyTypedInstance) {
  app.patch(
    '/user/:userId/identification/update',
    {
      schema: {
        tags: ['Users'],
        description: 'Update user identification',
        body: z.object({
          frontUrl: z.string(),
          backUrl: z.string(),
        }),
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request, replay) => {
      const data = request.body
      const userId = request.params.userId
      const user = await updateUserIdentificationService(data, userId)
      return replay.status(200).send(user)
    }
  )
}
