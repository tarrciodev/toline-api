import z from 'zod'
import { userSocialAuthSevice } from '../../services/users/user-social-auth-service'
import type { FastifyTypedInstance } from '../../types'

export async function userSocialAuthRoute(app: FastifyTypedInstance) {
  app.post(
    '/auth/social',
    {
      schema: {
        tags: ['Authentication'],
        description: 'Auth social',
        body: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (request, replay) => {
      const { email } = request.body
      const userAuth = await userSocialAuthSevice(email)
      return replay.status(200).send(userAuth)
    }
  )
}
