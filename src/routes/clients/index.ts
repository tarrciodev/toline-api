import type { FastifyTypedInstance } from '../../types'
import { getClientPaymentsRoute } from './get-client-payment-route'
import { inviteFreelancerToMyProjectRoute } from './invite-freelancer-to-my-project-route'
import { markProjectAsConcludedRoute } from './mark-project-as-concluded-route'

export async function clientRoutes(app: FastifyTypedInstance) {
  app.register(inviteFreelancerToMyProjectRoute)
  app.register(markProjectAsConcludedRoute)
  app.register(getClientPaymentsRoute)
}
