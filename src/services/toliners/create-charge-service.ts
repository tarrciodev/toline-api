import { prisma } from '../../config/prisma'

export async function createChargeService({
  tolinerId,
  ammount,
  invoice,
}: { tolinerId: string; ammount: number; invoice: string }) {
  const tolinerExists = await prisma.toliner.findUnique({
    where: {
      id: tolinerId,
    },
    include: {
      balance: {
        select: {
          id: true,
          ammount: true,
        },
      },
    },
  })
  if (!tolinerExists) {
    throw new Error("Toliner doesn't exist")
  }

  const charge = await prisma.charge.create({
    data: {
      tolinerId,
      ammount,
      invoice,
    },
    select: {
      id: true,
      ammount: true,
    },
  })

  await prisma.toliner.update({
    where: {
      id: tolinerId,
    },
    data: {
      balance: tolinerExists.balance
        ? {
            update: {
              ammount: charge.ammount + tolinerExists?.balance?.ammount,
            },
          }
        : {
            create: {
              ammount: charge.ammount,
            },
          },
    },
  })

  return charge
}
