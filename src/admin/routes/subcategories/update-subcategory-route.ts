import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { updateSubcategoryService } from '../../services/subcategories/update-subcategory-service'

export async function updateSubcategoryRoute(app: FastifyTypedInstance) {
  app.put(
    '/adm/subcategory/:subcategoryId',
    {
      schema: {
        params: z.object({
          subcategoryId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().min(1).max(255),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { subcategoryId } = request.params
      const data = request.body

      const result = await updateSubcategoryService({ id: subcategoryId, data })
      return reply.status(200).send(result)
    }
  )
}
