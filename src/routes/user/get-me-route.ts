import z from 'zod'
import { getMeService } from '../../services/users/get-me-service'
import type { FastifyTypedInstance } from '../../types'

export async function getMeRoute(app: FastifyTypedInstance) {
  app.get(
    '/me/:email',
    {
      schema: {
        tags: ['Users'],
        description: 'Get user by email',
        params: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (request, replay) => {
      const { email } = request.params
      const user = await getMeService(email)
      return replay.status(200).send(user)
    }
  )
}
