import type { FastifyTypedInstance } from '../../types'
import { notifyMessage } from '../../utils/messages-notification-pub-sub'

export async function getNotificationMessageRoute(app: FastifyTypedInstance) {
  app.get(
    '/message/notification',
    {
      schema: {
        tags: ['messages'],
        description: 'Get user messages',
      },
      websocket: true,
    },
    (connection, request) => {
      notifyMessage.subscribe('message', message => {
        connection.send(JSON.stringify(message))
      })
    }
  )
}
