import z from 'zod'
import { alterUserPasswordService } from '../../services/users/alter-user-password-service'
import type { FastifyTypedInstance } from '../../types'

export async function alterUserPasswordRoute(app: FastifyTypedInstance) {
  app.put(
    '/user/alter-password/:userId',
    {
      schema: {
        tags: ['Users'],
        description: 'Alter user password',
        params: z.object({
          userId: z.string().uuid(),
        }),
        body: z.object({
          password: z.string(),
          oldPassword: z.string(),
        }),
      },
    },
    async (request, replay) => {
      const { userId } = request.params
      const { password, oldPassword } = request.body
      const code = await alterUserPasswordService({
        userId,
        password,
        oldPassword,
      })
      return replay.status(200).send(code)
    }
  )
}
