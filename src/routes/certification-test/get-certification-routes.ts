import { getCertificationService } from '../../services/certification-test/get-certification-service'
import type { FastifyTypedInstance } from '../../types'

export async function getCertificationRoutes(app: FastifyTypedInstance) {
  app.get('/certifications', async (request, reply) => {
    const certification = await getCertificationService()
    return reply.status(200).send(certification)
  })
}
