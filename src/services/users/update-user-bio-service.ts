import { prisma } from '../../config/prisma'
import { ClientError } from '../../errors/client-errors'

export async function updateUserBioService(
  bio: string,
  userId: string,
  logged_as: 'client' | 'freelancer'
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new ClientError('User not found')
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data:
      logged_as === 'client'
        ? {
            clientBio: bio,
          }
        : {
            freelancerBio: bio,
          },
    select: { id: true },
  })

  return updatedUser
}
