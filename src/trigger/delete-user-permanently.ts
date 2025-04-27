import { schemaTask, wait } from '@trigger.dev/sdk/v3'
import z from 'zod'
import { prisma } from '../config/prisma'

export const deleteUserPermanently = schemaTask({
  id: 'delete-user-permanently',
  schema: z.object({
    email: z.string().email(),
  }),
  run: async (payload: { email: string }, { ctx }) => {
    await wait.for({ minutes: 2 }) // ⏳ Wait 5 days

    const toliner = await prisma.toliner.findUnique({
      where: {
        email: payload.email,
      },
    })

    if (!toliner) {
      return { status: 'user_not_found' }
    }

    if (toliner.isActive) {
      return { status: 'account_restaured' }
    }

    // 📧 Send email
    await prisma.toliner.delete({
      where: {
        email: payload.email,
      },
    })

    return { status: 'user_deleted' }
  },
})
