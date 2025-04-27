import { prisma } from '../../config/prisma'

type CreateCertificationTestBody = {
  title: string
  description?: string
  timeLimit?: number
  passingScore?: number
  skillId: string
}

export async function createCertificationTestService(
  data: CreateCertificationTestBody
) {
  const { title, description, timeLimit, passingScore, skillId } = data
  const skillExists = await prisma.skill.findUnique({
    where: { id: skillId },
  })

  if (!skillExists) {
    throw new Error('A skill não existe')
  }

  const existingTest = await prisma.certificationTest.findUnique({
    where: { skillId },
  })

  if (existingTest) {
    throw new Error('Já existe um teste associado a essa skill')
  }

  const certificationTest = await prisma.certificationTest.create({
    data: {
      title,
      description,
      timeLimit,
      passingScore: passingScore || 70.0,
      skillId,
    },
  })

  return certificationTest
}
