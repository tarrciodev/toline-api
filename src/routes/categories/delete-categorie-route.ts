import z from 'zod'
import { deleteCategoryService } from '../../services/categories/delete-category-service'
import type { FastifyTypedInstance } from '../../types'

export async function deleteCategoryRoute(app: FastifyTypedInstance) {
  app.delete(
    '/category/:id',
    {
      schema: {
        tags: ['Categories'],
        description: 'Delete a category',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const category = await deleteCategoryService(id)
      return category
    }
  )
}
