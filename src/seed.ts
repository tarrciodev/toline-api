import { prisma } from './config/prisma'
import { categories } from './mock/categories'
import { skills } from './mock/skills'
import { subcategories } from './mock/subcategories'
import { generateSlug } from './utils/generate-slug'

async function seed() {
  const parsedCategories = categories.map(category => ({
    ...category,
    slug: generateSlug(category.name),
  }))
  const createdCategories = await prisma.category.createMany({
    data: parsedCategories,
  })

  const parseSubcategories = subcategories.map(subcategory => ({
    ...subcategory,
    slug: generateSlug(subcategory.name),
  }))

  const createdSubcategories = await prisma.subcategory.createMany({
    data: parseSubcategories,
  })

  const parsedSkills = skills.map(skill => {
    return {
      ...skill,
      slug: generateSlug(skill.name),
    }
  })

  const createdSkills = await prisma.skill.createMany({
    data: parsedSkills,
  })

  console.log({ createdSkills, createdCategories, createdSubcategories })
}

seed()
