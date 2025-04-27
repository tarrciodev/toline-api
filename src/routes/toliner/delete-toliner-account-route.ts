import z from 'zod'
import { deleteTolinerAccountService } from '../../services/toliners/delete-toliner-account-service'
import type { FastifyTypedInstance } from '../../types'

export async function deleteTolinerAccountRoute(app: FastifyTypedInstance) {
  app.delete(
    '/toliner/delete-account/:email',
    {
      schema: {
        tags: ['Toliner'],
        description: 'Delete toliner account',
        params: z.object({
          email: z.string(),
        }),
      },
    },
    async (request, replay) => {
      const { email } = request.params
      const toliner = await deleteTolinerAccountService(email)
      return replay.status(200).send(toliner)
    }
  )
}
