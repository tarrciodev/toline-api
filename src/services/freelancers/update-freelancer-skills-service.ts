import { prisma } from '../../config/prisma'

export async function updateFreelancerSkillsService({
  skills,
  userId,
  action,
}: { skills: string[]; userId: string; action: 'add' | 'remove' }) {
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!userExists) throw new Error('Nenhum Usuario foi encontrado')
  const operation =
    action === 'add'
      ? {
          connect: skills.map(skill => ({ id: skill })),
        }
      : {
          disconnect: skills.map(skill => ({ id: skill })),
        }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      skills: operation,
    },
    select: {
      id: true,
    },
  })

  return user
}
