import { schemaTask, wait } from '@trigger.dev/sdk/v3'
import z from 'zod'
import { accountVerificationRemind } from '../emails/functions/account-verification-remind-function'
import { getMeService } from '../services/users/get-me-service'

export const remindUnverifiedUser = schemaTask({
  id: 'remind-unverified-user',
  schema: z.object({
    email: z.string().email(),
  }),
  run: async (payload: { email: string }, { ctx }) => {
    await wait.for({ minutes: 1 })

    const user = await getMeService(payload.email)

    if (!user) {
      return { status: 'user_not_found' }
    }

    if (user.verified) {
      return { status: 'already_verified' }
    }

    const verificationUrl = `${process.env.WEB_URL}/dash/profile/${user.tolinerId}`

    await accountVerificationRemind({
      name: user.username.split(' ')[0],
      loginUrl: verificationUrl,
      email: payload.email,
    })

    return { status: 'reminder_sent' }
  },
})
