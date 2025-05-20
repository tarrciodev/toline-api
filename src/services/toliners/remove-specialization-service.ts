import { prisma } from '../../config/prisma'

interface RemoveSpecializationProps {
  tolinerId: string
  specializationId: string
}
export async function removeSpecializationService(
  data: RemoveSpecializationProps
) {
  const tolinerExist = await prisma.toliner.findUnique({
    where: {
      id: data.tolinerId,
    },
    select: {
      id: true,
      specialization: true,
    },
  })

  if (!tolinerExist) {
    throw new Error('Toliner not found')
  }

  const userUpdated = await prisma.toliner.update({
    where: {
      id: tolinerExist.id,
    },
    data: {
      specialization: {
        disconnect: {
          id: data.specializationId,
        },
      },
    },
    select: {
      id: true,
    },
  })

  return userUpdated
}
