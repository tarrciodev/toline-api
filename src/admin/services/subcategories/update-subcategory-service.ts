import { prisma } from '../../../config/prisma'
import { generateSlug } from '../../../utils/generate-slug'

export async function updateSubcategoryService({
  id,
  data,
}: { id: string; data: { name: string; description?: string } }) {
  try {
    const subcategory = await prisma.subcategory.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        slug: generateSlug(data.name),
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    })

    return subcategory
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update subcategory')
  }
}
