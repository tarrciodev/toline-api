import type { FastifyTypedInstance } from '../../../types'
import { createSubcategoryRoute } from './create-subcategory-route'

export async function subcategorieRoutes(app: FastifyTypedInstance) {
  app.register(createSubcategoryRoute)
}
