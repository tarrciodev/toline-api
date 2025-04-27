import { prisma } from '../../config/prisma'

type CreateQuestionAnswerBody = {
  questionId: string
  alternativeId: string
  testAttemptId: string
}
export async function createQuestionAnswerService(
  data: CreateQuestionAnswerBody
) {
  const alternativeExists = await prisma.alternative.findFirst({
    where: {
      id: data.alternativeId,
      questionId: data.questionId,
    },
  })

  if (!alternativeExists) {
    throw new Error('A alternativa não existe')
  }

  const questionAnswer = await prisma.answer.create({
    data: {
      questionId: data.questionId,
      alternativeId: data.alternativeId,
      testAttemptId: data.testAttemptId,
    },
  })

  return questionAnswer
}
