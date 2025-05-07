import type { FastifyTypedInstance } from '../../../types'
import { getFreelancerByIdRoute } from './get-freelancer-by-id-route'
import { getFreelancersAdminRoute } from './get-freelancers-admin-route'
import { verifyFrelancerAdminRoute } from './verify-frelancer-admin-route'

export async function freelancerRoutes(app: FastifyTypedInstance) {
  app.register(getFreelancersAdminRoute)
  app.register(getFreelancerByIdRoute)
  app.register(verifyFrelancerAdminRoute)
}
