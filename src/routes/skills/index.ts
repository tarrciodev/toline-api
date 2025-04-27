import type { FastifyTypedInstance } from '../../types'
import { getSkillsRoutes } from './get-skills-route'

export async function skillsRoutes(app: FastifyTypedInstance) {
  app.register(getSkillsRoutes)
}
