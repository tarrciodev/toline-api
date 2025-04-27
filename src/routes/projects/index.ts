import type { FastifyTypedInstance } from '../../types'
import { createProjectRoute } from './create-project-route'
import { deleteProjectRoute } from './delete-project-route'
import { getProjectByIdRoute } from './get-project-by-id-route'
import { getProjectsBySubscriptionsRoute } from './get-project-by-subscriptions-route'
import { getProjectsRoute } from './get-projects-route'
import { projectToFreelancerRoute } from './project-to-freelancer-route'
import { getProjectsOfInterestRoute } from './projects-of-interest-route'
import { subscribeToProjectRoute } from './subscribe-to-project-route'
import { unsubscribeFromProjectRoute } from './unsubscribe-from-project-route'
import { updateBaseProjectRoute } from './update-base-project-route'
import { updateProjectQuotationRoute } from './update-project-quotation-route'
import { updateProjectPaymentRoute } from './updateProject-payment-route'

export async function projectRoutes(app: FastifyTypedInstance) {
  app.register(createProjectRoute)
  app.register(getProjectsRoute)
  app.register(getProjectByIdRoute)
  app.register(projectToFreelancerRoute)
  app.register(unsubscribeFromProjectRoute)
  app.register(subscribeToProjectRoute)
  app.register(updateProjectQuotationRoute)
  app.register(updateProjectPaymentRoute)
  app.register(getProjectsBySubscriptionsRoute)
  app.register(getProjectsOfInterestRoute)
  app.register(deleteProjectRoute)
  app.register(updateBaseProjectRoute)
}
