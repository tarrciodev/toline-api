import z from 'zod'
import { createCategoryService } from '../../services/categories/create-category-service'
import type { FastifyTypedInstance } from '../../types'

export async function createCategoryRoute(app: FastifyTypedInstance) {
  app.post(
    '/category',
    {
      schema: {
        tags: ['Categories'],
        description: 'route to create categories',
        body: z.object({
          name: z.string(),
          description: z.string().optional(),
          subcategories: z.array(z.string()),
        }),
      },
    },
    async (request, reply) => {
      const { name, description, subcategories } = request.body
      const category = await createCategoryService({
        name,
        description,
        subcategories,
      })
      return category
    }
  )
}
