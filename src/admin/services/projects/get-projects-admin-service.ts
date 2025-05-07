import { prisma } from '../../../config/prisma'

interface Filters {
  page?: number
  limit?: number
  search?: string
  status: string
}
export async function getProjectsAdminService(query: Filters) {
  const projects = await prisma.project.findMany({
    where: {
      status:
        (query.status as 'created' | 'onGoing' | 'completed') ?? 'created',
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          name: true,
        },
      },
      skills: {
        select: {
          id: true,
          name: true,
        },
      },
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
      isAproved: true,
    },
  })

  const parsedProjects = projects.map(project => {
    const { category, ...rest } = project
    return {
      ...rest,
      category: category?.name,
    }
  })

  return parsedProjects
}
