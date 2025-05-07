import type { FastifyTypedInstance } from '../../types'
import { freelancerRoutes } from './freelancers'
import { projectsAdminRoutes } from './projects'
import { transactionRoutes } from './transactions'

export async function AdminRoutes(app: FastifyTypedInstance) {
  app.register(freelancerRoutes)
  app.register(transactionRoutes)
  app.register(projectsAdminRoutes)
}
