import type { FastifyTypedInstance } from '../../../types'
import { createSubcategoryRoute } from './create-subcategory-route'
import { deleteSubcategoryRoute } from './delete-subcategory-route'
import { updateSubcategoryRoute } from './update-subcategory-route'

export async function subcategorieRoutes(app: FastifyTypedInstance) {
  app.register(createSubcategoryRoute)
  app.register(deleteSubcategoryRoute)
  app.register(updateSubcategoryRoute)
}
