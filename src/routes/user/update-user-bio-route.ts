import z from 'zod'
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
      },
    },
    async (request, replay) => {
      const { bio } = request.body
      const userId = request.params.userId
      // const user = await updateUserBioService(bio, userId);
      return replay.status(200).send(userId)
    }
  )
}
