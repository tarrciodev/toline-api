import { prisma } from '../../config/prisma'

export async function getChargesService(tolinerId: string) {
  const charges = await prisma.charge.findMany({
    where: {
      tolinerId: tolinerId,
    },
    skip: 0,
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      ammount: true,
      createdAt: true,
      status: true,
      referenceNumber: true,
    },
  })

  const parsedCharges = charges.map(charge => ({
    id: charge.id,
    ammount: charge.ammount,
    createdAt: charge.createdAt.toLocaleDateString(),
    status: charge.status,
  }))

  return parsedCharges
}
