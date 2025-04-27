import z from 'zod'
import { getCertificationByIdService } from '../../services/certification-test/get-certification-by-id-service'
import type { FastifyTypedInstance } from '../../types'

export async function getCertificationByIdRoute(app: FastifyTypedInstance) {
  app.get(
    '/certification-test/:certificationId',
    {
      schema: {
        tags: ['Certification Test'],
        description: 'Get certification by id',
        params: z.object({
          certificationId: z.string().uuid(),
        }),
      },
    },
    async (request, replay) => {
      const { certificationId } = request.params
      const certification = await getCertificationByIdService(certificationId)
      return replay.status(200).send(certification)
    }
  )
}
