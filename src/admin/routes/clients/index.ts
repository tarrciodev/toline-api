import type { FastifyTypedInstance } from '../../../types'
import { getClientsRoute } from './get-clients-route'

export async function clientsRoutes(app: FastifyTypedInstance) {
  app.register(getClientsRoute)
}
