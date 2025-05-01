import type { FastifyTypedInstance } from '../../types'
import { notify } from '../../utils/notify'

export async function getRealTimeTolinerNotificationsRoute(
  app: FastifyTypedInstance
) {
  app.get(
    '/notifications/:tolinerId',
    {
      websocket: true,
    },
    async (connection, request) => {
      notify.subscribe('notifications', notification => {
        connection.send(JSON.stringify(notification))
      })
    }
  )
}
