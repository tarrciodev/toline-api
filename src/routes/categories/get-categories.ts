import { getCategoriesServices } from '../../services/categories/get-categories-services'
import type { FastifyTypedInstance } from '../../types'

export async function getCategoriesRoutes(app: FastifyTypedInstance) {
  app.get(
    '/categories',
    {
      schema: {
        tags: ['Categories'],
        description: 'List all categories',
      },
    },
    async (request, replay) => {
      const categories = await getCategoriesServices()
      return replay.status(200).send(categories)
    }
  )
}
