import { prisma } from '../../config/prisma'

export async function updateProjectDueDate(dueDate: Date, projectId: string) {
  const project = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      dueDate,
    },
    select: {
      id: true,
    },
  })

  return project
}
