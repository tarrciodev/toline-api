// import { prisma } from './config/prisma'
// import { categories } from './mock/categories'
// import { skills } from './mock/skills'
// import { subcategories } from './mock/subcategories'
// import { generateSlug } from './utils/generate-slug'

// async function seed() {
//   const parsedCategories = categories.map(category => ({
//     ...category,
//     slug: generateSlug(category.name),
//   }))
//   const createdCategories = await prisma.category.createMany({
//     data: parsedCategories,
//   })

//   const parseSubcategories = subcategories.map(subcategory => ({
//     ...subcategory,
//     slug: generateSlug(subcategory.name),
//   }))

//   const createdSubcategories = await prisma.subcategory.createMany({
//     data: parseSubcategories,
//   })

//   const parsedSkills = skills.map(skill => {
//     return {
//       ...skill,
//       slug: generateSlug(skill.name),
//     }
//   })

//   const createdSkills = await prisma.skill.createMany({
//     data: parsedSkills,
//   })

//   console.log({ createdSkills, createdCategories, createdSubcategories })

//   // await redis.del('notifications:fd700f61-4acc-4338-9830-01d9e019a047')
// }

// seed()

import { PrismaClient } from '@prisma/client'
import { generateTagFromEmail } from './utils/generate-tag-from-email'

// Initialize two Prisma clients: one for production, one for local
const prodPrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgress_cpbh_user:w56M7QYX1OxqXwDwhQiP0quXVf7QfxTV@dpg-d0c9k33uibrs73dv5u80-a.oregon-postgres.render.com/postgress_cpbh',
    },
  },
})

const localPrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:devmaster@localhost:5430/tolinedb?schema=public',
    },
  },
})

async function migrateToliners() {
  try {
    // Step 1: Fetch all Toliners from production
    console.log('Fetching Toliners from production database...')
    const prodToliners = await prodPrisma.toliner.findMany({
      include: {
        user: true, // Include related user data (e.g., skills, tags)
        specialization: true, // Include related specialization data
      },
    })

    console.log(`Found ${prodToliners.length} Toliners in production.`)

    // Step 2: Clear the local database (optional, remove if you don't want to truncate)
    await localPrisma.toliner.deleteMany({})
    console.log('Cleared local Toliners table.')

    // Step 3: Insert Toliners into the local database
    for (const toliner of prodToliners) {
      try {
        // Handle related data (e.g., user and specialization)
        const userData = toliner.user
          ? {
              connectOrCreate: {
                where: { id: toliner.user.id },
                create: {
                  id: toliner.user.id,
                  username: toliner.user.username,
                  type: toliner.user.type,
                  email: toliner.user.email,
                  tag: generateTagFromEmail(toliner.user.email),
                },
              },
            }
          : undefined

        // Insert the Toliners record into the local database
        const tolliners = await localPrisma.toliner.create({
          data: {
            id: toliner.id,
            name: toliner.name,
            email: toliner.email,
            isVerified: toliner.isVerified,
            hasAprovedProfile: toliner.hasAprovedProfile,
            createdAt: toliner.createdAt,
            jobDescription: 'Freelancer',
            user: userData,
          },
        })
        console.log(`Migrated Toliners: ${toliner.name}`)
      } catch (error) {
        console.error(`Failed to migrate Toliners ${toliner.name}:`, error)
      }
    }

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Error during migration:', error)
  } finally {
    // Disconnect both Prisma clients
    await prodPrisma.$disconnect()
    await localPrisma.$disconnect()
  }
}

// Run the migration
migrateToliners()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
