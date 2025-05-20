import type { FastifyTypedInstance } from '../../../types'
import { getClientsService } from '../../services/clients/get-clients-service'

export async function getClientsRoute(app: FastifyTypedInstance) {
  app.get('/adm/clients', async (request, reply) => {
    const clients = await getClientsService()
    return reply.status(200).send(clients)
  })
}
