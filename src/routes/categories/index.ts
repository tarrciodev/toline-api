import type { FastifyTypedInstance } from '../../types'
import { createCategoryRoute } from './create-category-route'
import { deleteCategoryRoute } from './delete-categorie-route'
import { getCategoriesRoutes } from './get-categories'
import { updateCategoryRoute } from './update-categorie-route'

export async function categoriesRoutes(app: FastifyTypedInstance) {
  app.register(getCategoriesRoutes)
  app.register(createCategoryRoute)
  app.register(deleteCategoryRoute)
  app.register(updateCategoryRoute)
}
