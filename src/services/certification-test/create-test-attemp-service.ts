import { prisma } from '../../config/prisma'

interface CreateTestAttempBody {
  certificationTestId: string
  userId: string
}
export async function createTestAttempService(data: CreateTestAttempBody) {
  const attempExists = await prisma.testAttempt.findFirst({
    where: {
      certificationTestId: data.certificationTestId,
      userId: data.userId,
    },
  })

  if (attempExists) {
    throw new Error('Já existe uma tentativa associada a esse teste')
  }
  const testAttemp = await prisma.testAttempt.create({
    data: {
      certificationTestId: data.certificationTestId,
      userId: data.userId,
    },
  })

  return testAttemp
}
