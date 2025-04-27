import { prisma } from '../../config/prisma'

export async function getCertificationService() {
  const certifications = await prisma.certificationTest.findMany({
    include: {
      questions: true,
      attempts: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  })

  return certifications
}
