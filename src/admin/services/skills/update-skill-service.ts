import { prisma } from '../../../config/prisma'

interface Skill {
  id: string
  name: string
  description?: string
}
export async function updateSkillService(data: Skill) {
  const { id, ...skill } = data
  const updatedSkill = await prisma.skill.update({
    where: {
      id,
    },
    data: skill,
  })
  return updatedSkill
}
