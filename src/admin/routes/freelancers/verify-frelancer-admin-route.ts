import z from 'zod'
import { prisma } from '../../../config/prisma'
import type { FastifyTypedInstance } from '../../../types'

export async function verifyFrelancerAdminRoute(app: FastifyTypedInstance) {
  app.post(
    '/adm/freelancers/:freelancerId/verify',
    {
      schema: {
        params: z.object({
          freelancerId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { freelancerId } = request.params

      const freelancerVerified = await prisma.toliner.update({
        where: {
          id: freelancerId,
        },
        data: {
          isVerified: true,
          hasAprovedProfile: true,
        },
        select: {
          id: true,
        },
      })

      console.log({ freelancerVerified, freelancerId })

      return reply.status(200).send(freelancerVerified)
    }
  )
}
