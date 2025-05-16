import { prisma } from '../../../config/prisma'

export async function deleteSubcategoryService(id: string) {
  const subcategory = await prisma.subcategory.delete({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  })

  return subcategory
}
