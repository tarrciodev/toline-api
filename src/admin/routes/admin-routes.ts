import type { FastifyTypedInstance } from '../../types'
import { freelancerRoutes } from './freelancers'
import { projectsAdminRoutes } from './projects'
import { skillRoutes } from './skills'
import { subcategorieRoutes } from './subcategories'
import { transactionRoutes } from './transactions'

export async function AdminRoutes(app: FastifyTypedInstance) {
  app.register(freelancerRoutes)
  app.register(transactionRoutes)
  app.register(projectsAdminRoutes)
  app.register(subcategorieRoutes)
  app.register(skillRoutes)
}
