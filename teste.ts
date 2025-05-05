import { prisma } from './src/config/prisma'

//With Promise.all
export async function getAllUsers({
  skip,
  take,
}: { skip: number; take: number }) {
  const [users, totalOfUsers] = await Promise.all([
    prisma.user.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.user.count(),
  ])

  return {
    users,
    totalOfUsers,
  }
}
