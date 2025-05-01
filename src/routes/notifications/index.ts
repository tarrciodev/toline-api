import type { FastifyTypedInstance } from '../../types'
import { getRealTimeTolinerNotificationsRoute } from './get-real-time-notification-routes'
import { readNotificationRoutes } from './read-notification-routes'

export async function notificationsRoute(app: FastifyTypedInstance) {
  await app.register(readNotificationRoutes)
  await app.register(getRealTimeTolinerNotificationsRoute)
}
