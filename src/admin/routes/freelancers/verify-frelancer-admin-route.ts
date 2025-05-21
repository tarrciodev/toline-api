import z from 'zod'
import { prisma } from '../../../config/prisma'
import { accountVeriedEmail } from '../../../emails/functions/account-verified-function'
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
          name: true,
          email: true,
        },
      })

      await accountVeriedEmail({
        name: freelancerVerified.name,
        email: freelancerVerified.email,
      })

      return reply.status(200).send(freelancerVerified)
    }
  )
}
