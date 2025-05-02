import z from 'zod'
import { updateUserBioService } from '../../services/users/update-user-bio-service'
import type { FastifyTypedInstance } from '../../types'

export async function updateUserBioRoute(app: FastifyTypedInstance) {
  app.patch(
    '/user/:userId/bio/update',
    {
      schema: {
        tags: ['Users'],
        description: 'Update user bio',
        body: z.object({
          bio: z.string(),
        }),
        params: z.object({
          userId: z.string().uuid(),
        }),
        querystring: z.object({
          logged_as: z.enum(['freelancer', 'client']),
        }),
      },
    },
    async (request, replay) => {
      const { bio } = request.body
      const { logged_as } = request.query
      const userId = request.params.userId
      const user = await updateUserBioService(bio, userId, logged_as)
      return replay.status(200).send(user)
    }
  )
}
