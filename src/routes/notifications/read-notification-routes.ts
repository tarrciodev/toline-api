import z from 'zod'
import { redis } from '../../config/redis'
import type { FastifyTypedInstance } from '../../types'
import type { INotification } from '../../utils/notify'

export async function readNotificationRoutes(app: FastifyTypedInstance) {
  app.patch(
    '/notifications/:tolinerId',
    {
      schema: {
        tags: ['Notifications'],
        description: 'Read a notification',
        params: z.object({
          tolinerId: z.string().uuid(),
        }),
        body: z.object({
          notificationId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tolinerId } = request.params
      const { notificationId } = request.body
      const notification = (await redis.get(
        `notifications:${tolinerId}`
      )) as string
      const parsedNotifications = JSON.parse(notification as string).map(
        (notification: INotification) => {
          if (notification.id === notificationId) {
            return {
              ...notification,
              payload: {
                ...notification.payload,
                saw: true,
              },
            }
          }

          return notification
        }
      )

      await redis.set(
        `notifications:${tolinerId}`,
        JSON.stringify(parsedNotifications)
      )
      return reply.status(200).send(parsedNotifications)
    }
  )
}
