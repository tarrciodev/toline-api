export function freelancersWhereClause(query: {
  specialization?: string | null
  skills?: string[] | null
  search?: string | null
  page?: number
  limit?: number
}) {
  const { specialization, skills, search, page = 1, limit = 10 } = query

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const whereClause: { [key: string]: any } = {
    hasAprovedProfile: true,
    isActive: true,
  }

  const hasNoFilters =
    (!search || search.trim() === '') &&
    (!skills || skills.length === 0) &&
    (!specialization || specialization.trim() === '')

  if (!hasNoFilters) {
    if (search && search.trim() !== '') {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { user: { tags: { contains: search, mode: 'insensitive' } } },
      ]
    } else {
      if (skills && skills.length > 0 && !specialization) {
        whereClause.user = {
          skills: {
            some: {
              name: {
                in: skills,
                mode: 'insensitive',
              },
            },
          },
        }
      } else if (specialization && (!skills || skills.length === 0)) {
        whereClause.specialization = {
          some: {
            slug: specialization,
          },
        }
      } else if (specialization && skills && skills.length > 0) {
        whereClause.AND = [
          {
            specialization: {
              some: {
                slug: specialization,
              },
            },
          },
          {
            user: {
              skills: {
                some: {
                  name: {
                    in: skills,
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
        ]
      }
    }
  }

  return whereClause
}
