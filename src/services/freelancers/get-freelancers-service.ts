import { prisma } from '../../config/prisma'
import { freelancersWhereClause } from '../../utils/freelancers-where-clause'

interface IGetFreelancersProps {
  query: {
    specialization?: string | null
    skills?: string[] | null
    search?: string | null
    page?: number
    limit?: number
  }
}

export async function getFreelancersService({ query }: IGetFreelancersProps) {
  const { specialization, skills, search, page = 1, limit = 10 } = query

  const whereClause = freelancersWhereClause({
    specialization,
    skills,
    search,
    page,
    limit,
  })

  try {
    const [freelancers, total] = await Promise.all([
      prisma.toliner.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          user: {
            select: {
              skills: true,
              avatarUrl: true,
              freelancerBio: true,
            },
          },
          specialization: {
            select: {
              id: true,
              name: true,
            },
          },
          createdAt: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.toliner.count({ where: whereClause }),
    ])

    const parsedFreelancers = freelancers.map(freelancer => {
      const { user, ...freelancerWithoutUser } = freelancer
      return {
        ...freelancerWithoutUser,
        avatarUrl: user?.avatarUrl,
        bio: user?.freelancerBio,
        createdAt: freelancer.createdAt.toLocaleDateString(),
        skills: user?.skills.map(skill => ({
          id: skill.id,
          name: skill.name,
        })),
      }
    })

    return {
      freelancers: parsedFreelancers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error('Error fetching freelancers:', error)
    throw new Error('Failed to fetch freelancers')
  }
}
