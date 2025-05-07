import z from 'zod'
import { getFreelancerPaymentsService } from '../../services/freelancers/get-freelancer-payments-service'
import type { FastifyTypedInstance } from '../../types'

export async function getFreelancerPaymentsRoute(app: FastifyTypedInstance) {
  app.get(
    '/freelancer/:freelancerId/payments',
    {
      schema: {
        tags: ['Freelancers'],
        description: 'Get freelancer payments',
        params: z.object({
          freelancerId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { freelancerId } = request.params
      const payments = await getFreelancerPaymentsService({ freelancerId })
      return reply.status(200).send(payments)
    }
  )
}
