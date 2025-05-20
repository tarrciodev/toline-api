import z from 'zod'
import { verificationCodeService } from '../../services/users/verification-code-service'
import type { FastifyTypedInstance } from '../../types'

export async function verificationCodeRoute(app: FastifyTypedInstance) {
  app.post(
    '/user/verification-code/:userEmail',
    {
      schema: {
        tags: ['Users'],
        description: 'Verification Code',
        params: z.object({
          userEmail: z.string().email(),
        }),
        body: z.object({
          name: z.string(),
          type: z.string(),
        }),
      },
    },
    async (request, replay) => {
      const { userEmail } = request.params
      const { type, name } = request.body
      const code = await verificationCodeService(userEmail, type, name)

      return replay.status(200).send(code)
    }
  )
}
