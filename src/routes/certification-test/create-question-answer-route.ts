import z from 'zod'
import { createQuestionAnswerService } from '../../services/certification-test/create-question-answer-service'
import type { FastifyTypedInstance } from '../../types'

export async function createQuestionAnswerRoute(app: FastifyTypedInstance) {
  app.post(
    '/certification/question/:questionId/create/answer',
    {
      schema: {
        tags: ['Certification Test'],
        description: 'Create certification question answer',
        params: z.object({
          questionId: z.string().uuid(),
        }),
        body: z.object({
          alternativeId: z.string().uuid(),
          testAttemptId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { questionId } = request.params
      const { alternativeId, testAttemptId } = request.body
      const questionAnswer = await createQuestionAnswerService({
        questionId,
        alternativeId,
        testAttemptId,
      })
      return reply.status(201).send(questionAnswer)
    }
  )
}
