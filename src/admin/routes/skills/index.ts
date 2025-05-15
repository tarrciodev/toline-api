import type { FastifyTypedInstance } from '../../../types'
import { createSkillRoute } from './create-skill-route'

export async function skillRoutes(app: FastifyTypedInstance) {
  app.register(createSkillRoute)
}
