import z from 'zod'
import { createCertificationQuestionService } from '../../services/certification-test/create-certification-question-service'
import type { FastifyTypedInstance } from '../../types'
export async function createCertificationQuestionRoute(
  app: FastifyTypedInstance
) {
  app.post(
    '/certification/create/question',
    {
      schema: {
        tags: ['Certification Test'],
        description: 'Create certification Question',
        body: z.object({
          text: z.string(),
          score: z.number(),
          certificationTestId: z.string().uuid(),
          alternatives: z.array(
            z.object({
              text: z.string(),
              isCorrect: z.boolean(),
            })
          ),
        }),
      },
    },
    async (request, reply) => {
      const { text, score, certificationTestId, alternatives } = request.body

      const certificationQuestion = await createCertificationQuestionService({
        text,
        score,
        certificationTestId,
        alternatives,
      })
      return reply.status(201).send(certificationQuestion)
    }
  )
}
