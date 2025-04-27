import z from 'zod'
import { createCertificationTestService } from '../../services/certification-test/create-certification-test-service'
import type { FastifyTypedInstance } from '../../types'

interface CreateCertificationTestBody {
  title: string
  description?: string
  timeLimit?: number
  passingScore?: number
  skillId: string
}

export async function createCertificationTesteRoute(app: FastifyTypedInstance) {
  app.post(
    '/certification/create',
    {
      schema: {
        tags: ['Certification Test'],
        description: 'Create certification test',
        body: z.object({
          title: z.string(),
          description: z.string().optional(),
          timeLimit: z.number().optional(),
          passingScore: z.number().optional(),
          skillId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { title, description, timeLimit, passingScore, skillId } =
        request.body as CreateCertificationTestBody

      const certificationTest = await createCertificationTestService({
        title,
        description,
        timeLimit,
        passingScore,
        skillId,
      })

      return reply.status(201).send(certificationTest)
    }
  )
}
