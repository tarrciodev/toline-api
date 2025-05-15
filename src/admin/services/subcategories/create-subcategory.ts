import { prisma } from '../../../config/prisma'
import { generateSlug } from '../../../utils/generate-slug'

interface Subcategory {
  name: string
  description?: string
  categoryId: string
}
export async function createSubcategoryService({
  subcategory,
  skills,
}: { subcategory: Subcategory; skills: string[] }) {
  const { name, description, categoryId } = subcategory
  try {
    const subcategoryCreated = await prisma.subcategory.create({
      data: {
        name,
        description,
        categoryId,
        slug: generateSlug(name),
      },
    })

    if (skills.length > 0) {
      await prisma.skill.createMany({
        data: skills.map(skill => ({
          name: skill,
          slug: generateSlug(skill),
          subcategoryId: subcategoryCreated.id,
        })),
      })
    }

    return subcategoryCreated
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create subcategory')
  }
}
