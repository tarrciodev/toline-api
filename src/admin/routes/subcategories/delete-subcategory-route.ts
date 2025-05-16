import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { deleteSubcategoryService } from '../../services/subcategories/delete-subcategory-service'

export async function deleteSubcategoryRoute(app: FastifyTypedInstance) {
  app.delete(
    '/adm/subcategory/:subcategoryId',
    {
      schema: {
        params: z.object({
          subcategoryId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { subcategoryId } = request.params

      const result = await deleteSubcategoryService(subcategoryId)
      return reply.status(200).send(result)
    }
  )
}
