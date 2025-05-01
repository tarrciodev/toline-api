import { prisma } from '../../config/prisma'
import { ClientError } from '../../errors/client-errors'
import { generateSlug } from '../../utils/generate-slug'

interface ICategoryProps {
  name: string
  description?: string
  subcategories: string[]
}
export async function UpdateCategoryService({
  data,
  categoryId,
}: { data: ICategoryProps; categoryId: string }) {
  const categoryExists = await prisma.category.findFirst({
    where: { id: categoryId },
  })

  if (!categoryExists) {
    throw new ClientError('Category not found')
  }

  const category = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: data.name,
      description: data?.description,
      slug: generateSlug(data.name),
    },
    select: {
      id: true,
    },
  })

  return category
}
