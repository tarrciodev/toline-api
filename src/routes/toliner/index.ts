import type { FastifyTypedInstance } from '../../types'
import { createRechargeRoute } from './create-charge-route'
import { deleteTolinerAccountRoute } from './delete-toliner-account-route'
import { getChargesRoute } from './get-charges-route'
import { getTolinerRoute } from './get-toliner-route'

export async function tolinerRoutes(app: FastifyTypedInstance) {
  app.register(getTolinerRoute)
  app.register(deleteTolinerAccountRoute)
  app.register(createRechargeRoute)
  app.register(getChargesRoute)
}
