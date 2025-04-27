import z from 'zod'
import { updateUserCardService } from '../../services/users/update-user-card-service'
import type { FastifyTypedInstance } from '../../types'

export async function updateUserCardRoute(app: FastifyTypedInstance) {
  app.post(
    '/user/:userId/update-card',
    {
      schema: {
        tags: ['Users'],
        summary: 'Update user card',
        params: z.object({
          userId: z.string(),
        }),
        body: z.object({
          avatarUrl: z.string().nullable(),
          username: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { userId } = request.params
      const { avatarUrl, username } = request.body

      const user = await updateUserCardService({
        userId,
        data: { avatarUrl, username },
      })

      return user
    }
  )
}
