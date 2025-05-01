import { prisma } from '../../config/prisma'
import { ClientError } from '../../errors/client-errors'
import { generateSlug } from '../../utils/generate-slug'

interface ICategoryProps {
  name: string
  description?: string
  subcategories: string[]
}
export async function createCategoryService(data: ICategoryProps) {
  const categoryExists = await prisma.category.findFirst({
    where: { name: data.name },
  })

  if (categoryExists) {
    throw new ClientError('Essa categoria já foi criada')
  }

  const category = await prisma.category.create({
    data: {
      name: data.name,
      description: data?.description,
      slug: generateSlug(data.name),
      subcategories: data.subcategories && {
        createMany: {
          data: data.subcategories.map(category => {
            return {
              name: category,
              slug: generateSlug(category),
            }
          }),
        },
      },
    },
  })

  return category
}
