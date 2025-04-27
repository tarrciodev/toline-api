import type { FastifyTypedInstance } from '../../types'
import { createCertificationQuestionRoute } from './create-certification-question-route'
import { createCertificationTesteRoute } from './create-certification-test-route'
import { createQuestionAnswerRoute } from './create-question-answer-route'
import { createTestAttempRoute } from './create-test-attemp-route'
import { getCertificationByIdRoute } from './get-certification-by-id-route'
import { getCertificationRoutes } from './get-certification-routes'

export async function certificationTestRoutes(app: FastifyTypedInstance) {
  app.register(createCertificationTesteRoute)
  app.register(createCertificationQuestionRoute)
  app.register(createTestAttempRoute)
  app.register(createQuestionAnswerRoute)
  app.register(getCertificationRoutes)
  app.register(getCertificationByIdRoute)
}
