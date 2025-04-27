import type { FastifyTypedInstance } from '../../types'
import { deleteTolinerAccountRoute } from './delete-toliner-account-route'
import { getTolinerRoute } from './get-toliner-route'

export async function tolinerRoutes(app: FastifyTypedInstance) {
  app.register(getTolinerRoute)
  app.register(deleteTolinerAccountRoute)
}
