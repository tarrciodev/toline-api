import z from 'zod'
import { createChargeService } from '../../services/toliners/create-charge-service'
import type { FastifyTypedInstance } from '../../types'

export async function createRechargeRoute(app: FastifyTypedInstance) {
  app.post(
    '/toliner/:tolinerId/recharge',
    {
      schema: {
        tags: ['Toliners'],
        description: 'Create a new recharge',
        params: z.object({
          tolinerId: z.string().uuid(),
        }),
        body: z.object({
          invoice: z.string(),
          ammount: z.number().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { tolinerId } = request.params
      const { invoice, ammount } = request.body

      const charge = await createChargeService({
        tolinerId,
        ammount,
        invoice,
      })

      return charge
    }
  )
}
