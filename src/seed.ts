import { redis } from './config/redis'

async function seed() {
  // const parsedCategories = categories.map(category => ({
  //   ...category,
  //   slug: generateSlug(category.name),
  // }))
  // const createdCategories = await prisma.category.createMany({
  //   data: parsedCategories,
  // })

  // const parseSubcategories = subcategories.map(subcategory => ({
  //   ...subcategory,
  //   slug: generateSlug(subcategory.name),
  // }))

  // const createdSubcategories = await prisma.subcategory.createMany({
  //   data: parseSubcategories,
  // })

  // const parsedSkills = skills.map(skill => {
  //   return {
  //     ...skill,
  //     slug: generateSlug(skill.name),
  //   }
  // })

  // const createdSkills = await prisma.skill.createMany({
  //   data: parsedSkills,
  // })

  // console.log({ createdSkills, createdCategories, createdSubcategories })

  await redis.del('notifications:fd700f61-4acc-4338-9830-01d9e019a047')
}

seed()
