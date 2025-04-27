import z from 'zod'
import { authUserWithCredentialsService } from '../../services/users/auth--user-with-credentials-service'
import type { FastifyTypedInstance } from '../../types'
import { assignCookie } from '../../utils/assign-cookie'

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
      if (userAuth.email) {
        assignCookie(replay, request, {
          key: 'sessionEmail',
          value: userAuth.email,
        })
      }
      return replay.status(200).send(userAuth)
    }
  )
}
