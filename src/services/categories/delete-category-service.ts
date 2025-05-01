import { prisma } from '../../config/prisma'

export async function deleteCategoryService(id: string) {
  const category = await prisma.category.delete({
    where: {
      id,
    },
    select: {
      id: true,
    },
  })
  return category
}
