import z from 'zod'
import { authUserWithCredentialsService } from '../../services/users/auth--user-with-credentials-service'
import type { FastifyTypedInstance } from '../../types'

export async function authUserWithCredentialsRoute(app: FastifyTypedInstance) {
  app.post(
    '/auth/credentials',
    {
      schema: {
        tags: ['Authentication'],
        description: 'Auth with credentials',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, replay) => {
      const { email, password } = request.body
      const userAuth = await authUserWithCredentialsService(email, password)

      return replay.status(200).send(userAuth)
    }
  )
}
