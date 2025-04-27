import z from 'zod'

import { forgotPasswordService } from '../../services/users/forgot-password-service'
import type { FastifyTypedInstance } from '../../types'

export async function forgotPasswordRoute(app: FastifyTypedInstance) {
  app.post(
    '/user/forgot-password',
    {
      schema: {
        tags: ['Users'],
        description: 'Forgot password',
        querystring: z.object({
          userEmail: z.string().email(),
          siteUrl: z.string().url(),
        }),
      },
    },
    async (request, replay) => {
      const { userEmail, siteUrl } = request.query

      const result = await forgotPasswordService(userEmail, siteUrl as string)
      return replay.status(200).send(result)
    }
  )
}
