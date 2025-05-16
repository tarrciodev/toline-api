import { prisma } from '../../../config/prisma'

export async function deleteSkillService(id: string) {
  const skill = await prisma.skill.delete({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  })

  return skill
}
