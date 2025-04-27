import { prisma } from '../../config/prisma'

export async function getCertificationByIdService(id: string) {
  const certification = await prisma.certificationTest.findUnique({
    where: {
      id,
    },
    include: {
      attempts: {
        select: {
          id: true,
        },
      },
      questions: {
        include: {
          alternatives: true,
        },
      },
    },
  })

  return certification
}
