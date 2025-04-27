import { verify } from 'argon2'
import { prisma } from '../../config/prisma'
import { ClientError } from '../../errors/client-errors'

export async function authUserWithCredentialsService(
  email: string,
  password: string
) {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      username: true,
      password: true,
      type: true,
      toliner: {
        select: {
          isActive: true,
        },
      },
    },
  })
  if (userExists == null) {
    throw new Error('Email or password Invalid')
  }

  const passwordMatches = await verify(userExists.password as string, password)

  if (passwordMatches === false) {
    throw new ClientError('Email or password Invalid')
  }

  if (userExists.toliner.isActive === false) {
    await prisma.toliner.update({
      where: {
        email,
      },
      data: {
        isActive: true,
      },
    })
  }

  return {
    email: userExists.email,
    name: userExists.username,
    type: userExists.type,
  }
}
