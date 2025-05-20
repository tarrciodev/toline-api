import { prisma } from '../../config/prisma'
import { ClientError } from '../../errors/client-errors'

type UserCardProps = {
  avatarUrl: string | null
  username: string
  jobDescription?: string
}

export async function updateUserCardService({
  userId,
  data,
}: {
  userId: string
  data: UserCardProps
}) {
  const { jobDescription, ...user } = data
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      toliner: {
        select: {
          id: true,
          name: true,
          jobDescription: true,
        },
      },
    },
  })

  if (!userExists) {
    throw new ClientError('User not found')
  }

  const updatedUser = await prisma.toliner.update({
    where: {
      id: userExists.toliner.id,
    },
    data: {
      name: data.username ?? userExists.toliner.name,
      jobDescription: data.jobDescription ?? userExists.toliner.jobDescription,
      user: {
        update: {
          data: data.avatarUrl
            ? data
            : {
                username: data.username,
              },
        },
      },
    },
    select: {
      id: true,
    },
  })

  return updatedUser
}
