import z from 'zod'
import { UpdateCategoryService } from '../../services/categories/update-category-service'
import type { FastifyTypedInstance } from '../../types'

export async function updateCategoryRoute(app: FastifyTypedInstance) {
  app.put(
    '/category/:categoryId',
    {
      schema: {
        tags: ['Categories'],
        description: 'route to update categories',
        params: z.object({
          categoryId: z.string(),
        }),
        body: z.object({
          name: z.string(),
          description: z.string().optional(),
          subcategories: z.array(z.string()),
        }),
      },
    },
    async (request, reply) => {
      const { categoryId } = request.params
      const category = await UpdateCategoryService({
        data: request.body,
        categoryId,
      })
      return category
    }
  )
}
