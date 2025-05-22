import { prisma } from '../../../config/prisma'

interface Filters {
  page?: number
  limit?: number
  status: string | null
  search?: string
}
export async function getChargesAdminService(query: Filters) {
  const { page = 1, limit = 10, status, search } = query

  if (status !== 'null') {
    const charges = await prisma.charge.findMany({
      where: {
        status: status as 'pending' | 'resolved' | 'rejected',
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
        referenceNumber: true,
        invoice: true,
      },
    })

    const parsedCharges = charges.map(charge => ({
      id: charge.id,
      ammount: charge.ammount,
      status: charge.status,
      createdAt: charge.createdAt.toLocaleDateString(),
      toliner: {
        id: charge.toliner.id,
        name: charge.toliner.name,
        email: charge.toliner.email,
      },
      referenceNumber: charge.referenceNumber,
    }))

    return parsedCharges
  }
  const charges = await prisma.charge.findMany({
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
      invoice: true,
      referenceNumber: true,
    },
  })

  const parsedCharges = charges.map(charge => ({
    id: charge.id,
    ammount: charge.ammount,
    status: charge.status,
    createdAt: charge.createdAt.toLocaleDateString(),
    toliner: {
      id: charge.toliner.id,
      name: charge.toliner.name,
      email: charge.toliner.email,
    },
    referenceNumber: charge.referenceNumber,
  }))

  return charges
}
