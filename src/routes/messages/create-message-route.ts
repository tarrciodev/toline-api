import { z } from 'zod'
import { createMessageService } from '../../services/messages/create-messages-service'
import type { FastifyTypedInstance } from '../../types'

export async function createMessageRoute(app: FastifyTypedInstance) {
  app.post(
    '/message/create',
    {
      schema: {
        tags: ['messages'],
        description: 'create messages',
        body: z.object({
          conversationId: z.string(),
          message: z.object({
            senderId: z.string(),
            content: z.string(),
            hasFile: z.boolean().optional(),
            fileInfo: z
              .object({
                name: z.string(),
                extension: z.string(),
                size: z.number(),
                type: z.string(),
              })
              .optional(),
          }),
        }),
      },
    },
    async (request, reply) => {
      const { conversationId, message } = request.body

      const messageCreated = await createMessageService(conversationId, message)

      return reply.send(messageCreated)
    }
  )
}
