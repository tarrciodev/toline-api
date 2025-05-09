import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { getFreelancerByIdService } from '../../services/freelancers/get-freelancer-by-id-service'

export async function getFreelancerByIdRoute(app: FastifyTypedInstance) {
  app.get(
    '/adm/freelancers/:freelancerId',
    {
      schema: {
        params: z.object({
          freelancerId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { freelancerId } = request.params
      const freelancer = await getFreelancerByIdService({ freelancerId })
      return reply.status(200).send(freelancer)
    }
  )
}
