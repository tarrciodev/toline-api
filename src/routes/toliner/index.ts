import type { FastifyTypedInstance } from '../../types'
import { addSpecializationRoute } from './add-specialization-route'
import { createRechargeRoute } from './create-charge-route'
import { deleteTolinerAccountRoute } from './delete-toliner-account-route'
import { getChargesRoute } from './get-charges-route'
import { getTolinerRoute } from './get-toliner-route'
import { removeSpecializationRoute } from './remove-specialization'

export async function tolinerRoutes(app: FastifyTypedInstance) {
  app.register(getTolinerRoute)
  app.register(deleteTolinerAccountRoute)
  app.register(createRechargeRoute)
  app.register(getChargesRoute)
  app.register(removeSpecializationRoute)
  app.register(addSpecializationRoute)
}
