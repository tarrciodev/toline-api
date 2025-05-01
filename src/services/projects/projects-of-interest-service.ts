import { prisma } from '../../config/prisma'

export async function getProjectsOfInterestService({
  userEmail,
  categorySlug,
}: {
  userEmail: string
  categorySlug: string
}) {
  const userSkills = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
    select: {
      skills: true,
    },
  })

  if (userSkills?.skills.length === 0) {
    const projects = await prisma.project.findMany({
      where: {
        owner: {
          email: {
            not: userEmail,
          },
        },
      },
      include: {
        subscriptions: true,
        skills: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            subcategories: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 4,
    })

    const parsedProjects = projects.map(project => {
      const { subcategoryId, category, ...rest } = project
      return {
        ...rest,
        category: category?.name,
        subcategory: project.category?.subcategories?.find(
          subcategory => subcategory.id === subcategoryId
        )?.name,
      }
    })

    return parsedProjects
  }

  const projects = await prisma.project.findMany({
    where: {
      skills: {
        some: {
          id: {
            in: userSkills?.skills.map(skill => skill.id),
          },
        },
      },
    },
    include: {
      subscriptions: true,
      skills: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          subcategories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  })

  const parsedProjects = projects.map(project => {
    const { subcategoryId, category, ...rest } = project
    return {
      ...rest,
      category: category?.name,
      subcategory: project.category?.subcategories?.find(
        subcategory => subcategory.id === subcategoryId
      )?.name,
    }
  })

  return parsedProjects
}
