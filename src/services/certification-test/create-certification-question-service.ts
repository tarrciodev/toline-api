import { prisma } from '../../config/prisma'

type CreateCertificationQuestionBody = {
  text: string
  score: number
  certificationTestId: string
  alternatives: Array<{ text: string; isCorrect: boolean }>
}

export async function createCertificationQuestionService(
  data: CreateCertificationQuestionBody
) {
  const certificationExists = await prisma.certificationTest.findUnique({
    where: { id: data.certificationTestId },
  })

  if (!certificationExists) {
    throw new Error('Certification test não existe')
  }

  const { alternatives } = data

  const certificationQuestion = await prisma.question.create({
    data: {
      text: data.text,
      score: data.score,
      certificationTestId: data.certificationTestId,
      alternatives: {
        createMany: {
          data: alternatives.map(alternative => alternative),
        },
      },
    },
  })

  return certificationQuestion
}
