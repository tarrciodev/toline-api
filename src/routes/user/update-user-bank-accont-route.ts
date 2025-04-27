import z from 'zod'
import { updateUserBankAccountService } from '../../services/users/update-user-bank-account-service'
import type { FastifyTypedInstance } from '../../types'

export async function updateUserBankAccountRoute(app: FastifyTypedInstance) {
  app.patch(
    '/user/:userId/bank-account/update',
    {
      schema: {
        tags: ['Users'],
        description: 'Update user bank account',
        body: z.object({
          bankName: z.string(),
          cardName: z.string(),
          cardNumber: z.string(),
        }),
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request, replay) => {
      const data = request.body
      const userId = request.params.userId
      const user = await updateUserBankAccountService(data, userId)
      return replay.status(200).send(user)
    }
  )
}
