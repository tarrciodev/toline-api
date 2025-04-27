import z from 'zod'
import { resetPasswordService } from '../../services/users/reset-password-service'
import type { FastifyTypedInstance } from '../../types'

export async function resetPasswordRoute(app: FastifyTypedInstance) {
  app.put(
    '/user/reset-password/:userEmail',
    {
      schema: {
        tags: ['Users'],
        description: 'Reset password',
        params: z.object({
          userEmail: z.string().email(),
        }),
        body: z.object({
          password: z.string(),
          code: z.string(),
        }),
      },
    },
    async (request, replay) => {
      const { userEmail } = request.params
      const data = request.body
      const code = await resetPasswordService(userEmail, data)
      return replay.status(200).send(code)
    }
  )
}
