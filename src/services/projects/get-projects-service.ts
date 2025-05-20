import { prisma } from '../../config/prisma'

interface IGetProjectProps {
  query: {
    slug: string
    page: number
    take: number
    me: string
  }
}
export async function getProjectsService({ query }: IGetProjectProps) {
  const { page, take, slug } = query
  const skip = (page - 1) * take

  const [projects, totalItems] = await Promise.all([
    prisma.project.findMany({
      where: {
        category: {
          slug: {
            contains: slug,
          },
        },
        ownerId: {
          not: query.me,
        },
        isAproved: true,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        status: true,
        subcategoryId: true,
        subscriptions: {
          select: {
            id: true,
            toliner: {
              select: {
                id: true,
                name: true,
                user: {
                  select: {
                    avatarUrl: true,
                  },
                },
              },
            },
            createdAt: true,
          },
        },
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
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      cacheStrategy: { ttl: 60 },
    }),
    prisma.project.count({
      where: {
        category: {
          slug: {
            contains: slug,
          },
        },
      },
    }),
  ])

  const parseProjects = projects.map(project => {
    const { subcategoryId, ...rest } = project
    return {
      ...rest,
      subcategory: project.category?.subcategories?.find(
        subcategory => subcategory.id === subcategoryId
      )?.name as string,
      category: project.category?.name as string,
      subscriptions: project.subscriptions.map(subscription => {
        return {
          ...subscription,
          toliner: {
            id: subscription.toliner.id,
            name: subscription.toliner.name,
            avatarUrl: subscription.toliner?.user?.avatarUrl as string,
          },
        }
      }),
    }
  })

  return {
    projects: parseProjects,
    totalItems,
  }
}
