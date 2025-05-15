import { prisma } from '../../../config/prisma'
import { generateSlug } from '../../../utils/generate-slug'

interface Skill {
  name: string
  description?: string
  subcategoryId?: string
  categoryId: string
}
export async function createSkillService(skill: Skill) {
  const skillCreated = await prisma.skill.create({
    data: {
      ...skill,
      slug: generateSlug(skill.name),
    },
  })

  return skillCreated
}
