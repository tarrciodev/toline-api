import { tasks } from '@trigger.dev/sdk/v3'
import { prisma } from '../../config/prisma'
import type { deleteUserPermanently } from '../../trigger/delete-user-permanently'

export async function deleteTolinerAccountService(email: string) {
  const toliner = await prisma.toliner.findUnique({
    where: { email },
  })

  if (!toliner)
    return {
      status: 'error',
      message: 'Toliner not found',
    }

  await prisma.toliner.update({
    where: {
      id: toliner.id,
    },
    data: {
      isActive: false,
    },
  })

  tasks.trigger<typeof deleteUserPermanently>('delete-user-permanently', {
    email: toliner.email,
  })

  return {
    status: 'success',
    message: 'Toliner deleted',
  }
}
