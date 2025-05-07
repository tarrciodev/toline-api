import { prisma } from '../../../config/prisma'

interface Filters {
  page?: number
  limit?: number
  status: string
  search?: string
}
export async function getPaymentsAdminService(query: Filters) {
  const payments = await prisma.payment.findMany({
    where: {
      status:
        query.status === ''
          ? {
              in: ['pending', 'resolved', 'rejected'],
            }
          : (query.status as 'pending' | 'resolved' | 'rejected'),
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
      freelancer: {
        select: {
          name: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
          status: true,
        },
      },
    },
  })

  return payments.map(payment => {
    return {
      ...payment,
      createdAt: payment.createdAt.toLocaleString(),
    }
  })
}
