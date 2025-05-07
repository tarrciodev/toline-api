import { prisma } from '../../../config/prisma'

interface Filters {
  page?: number
  limit?: number
  status: string
  search?: string
}
export async function getChargesAdminService(query: Filters) {
  const charges = await prisma.charge.findMany({
    where: {
      status: query.status as 'pending' | 'resolved' | 'rejected',
    },
    select: {
      id: true,
      ammount: true,
      status: true,
      createdAt: true,
      toliner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  return charges
}
