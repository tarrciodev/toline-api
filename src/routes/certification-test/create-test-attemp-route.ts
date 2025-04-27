import z from 'zod'
import { createTestAttempService } from '../../services/certification-test/create-test-attemp-service'
import type { FastifyTypedInstance } from '../../types'

export async function createTestAttempRoute(app: FastifyTypedInstance) {
  app.post(
    '/certification/create/attempt',
    {
      schema: {
        tags: ['Certification Test'],
        description: 'Create certification test attempt',
        body: z.object({
          certificationTestId: z.string().uuid(),
          userId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { certificationTestId, userId } = request.body

      const testAttemp = await createTestAttempService({
        certificationTestId,
        userId,
      })

      return reply.status(201).send(testAttemp)
    }
  )
}
