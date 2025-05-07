import type { FastifyTypedInstance } from '../../../types'
import { getChargesAdminRoutes } from './get-charges-admin-routes'
import { getPaymentsAdminRoute } from './get-payments-admin-route'
import { verifyPaymentAdminRoute } from './verify-payment-admin-route'

export async function transactionRoutes(app: FastifyTypedInstance) {
  app.register(getPaymentsAdminRoute)
  app.register(getChargesAdminRoutes)
  app.register(verifyPaymentAdminRoute)
}
