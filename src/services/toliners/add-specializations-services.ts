import { prisma } from '../../config/prisma'

export async function addSpecializationsService({
  tolinerId,
  specializations,
}: {
  tolinerId: string
  specializations: string[]
}) {
  const toliner = await prisma.toliner.findUnique({
    where: {
      id: tolinerId,
    },
    select: {
      id: true,
    },
  })

  if (!toliner) {
    throw new Error('Toliner not found')
  }

  const userUpdated = await prisma.toliner.update({
    where: {
      id: toliner.id,
    },
    data: {
      specialization: {
        connect: specializations.map(specialization => ({
          id: specialization,
        })),
      },
    },

    select: {
      id: true,
    },
  })

  return userUpdated
}
