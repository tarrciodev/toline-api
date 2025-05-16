import type { FastifyTypedInstance } from '../../../types'
import { createSkillRoute } from './create-skill-route'
import { deleteSkillRoute } from './delete-skill-route'
import { updateSkillRoute } from './update-skill-route'

export async function skillRoutes(app: FastifyTypedInstance) {
  app.register(createSkillRoute)
  app.register(deleteSkillRoute)
  app.register(updateSkillRoute)
}
