import { prisma } from '../../config/prisma'

export async function getMeService(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      username: true,
      type: true,
      tag: true,
      avatarUrl: true,
      tolinerId: true,
      password: true,
      toliner: {
        select: {
          isVerified: true,
        },
      },
    },
  })

  if (!user) return null

  const { password, ...userWithoutPassword } = user

  return {
    ...userWithoutPassword,
    hasSettedPassword: !!user.password,
    verified: user.toliner.isVerified,
  }
}
