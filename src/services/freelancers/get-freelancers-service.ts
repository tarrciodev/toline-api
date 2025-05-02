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

  // Initialize where clause with default condition
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const whereClause: { [key: string]: any } = {
    hasAprovedProfile: true,
  }

  // Apply search filter if present (overrides other filters)
  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { user: { bio: { contains: search, mode: 'insensitive' } } },
    ]
  } else {
    // Apply specialization and/or skills filters only if no search
    if (specialization && (!skills || skills.length === 0)) {
      // Only specialization filter
      whereClause.specialization = {
        some: {
          slug: specialization,
        },
      }
    } else if (skills && skills.length > 0 && !specialization) {
      // Only skills filter
      whereClause.skills = {
        some: {
          name: {
            in: skills,
            mode: 'insensitive',
          },
        },
      }
    } else if (specialization && skills && skills.length > 0) {
      // Both specialization and skills filters
      whereClause.AND = [
        {
          specialization: {
            some: {
              slug: specialization,
            },
          },
        },
        {
          skills: {
            some: {
              name: {
                in: skills,
                mode: 'insensitive',
              },
            },
          },
        },
      ]
    }
  }

  console.log({ whereClause })

  return whereClause

  //   try {
  //     const [freelancers, total] = await Promise.all([
  //       prisma.toliner.findMany({
  //         where: whereClause,
  //         select: {
  //           id: true,
  //           name: true,
  //           isVerified: true,
  //           hasAprovedProfile: true,
  //           createdAt: true,
  //         },
  //         skip: (page - 1) * limit,
  //         take: limit,
  //         orderBy: { createdAt: 'desc' },
  //       }),
  //       prisma.toliner.count({ where: whereClause }),
  //     ])

  //     return {
  //       freelancers,
  //       total,
  //       page,
  //       limit,
  //       totalPages: Math.ceil(total / limit),
  //     }
  //   } catch (error) {
  //     console.error('Error fetching freelancers:', error)
  //     throw new Error('Failed to fetch freelancers')
  //   }
}
