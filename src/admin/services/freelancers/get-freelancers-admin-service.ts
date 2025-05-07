import { prisma } from '../../../config/prisma'

interface Filters {
  page?: number
  limit?: number
  status: string
}

export async function getFreelancersAdminService(filters: Filters) {
  const freelancers = await prisma.toliner.findMany({
    where: {
      // biome-ignore lint/complexity/noUselessTernary: <explanation>
      isVerified: filters.status === 'verifieds' ? true : false,
      user: {
        type: 'freelancer',
      },
    },
    select: {
      id: true,
      name: true,
      isVerified: true,
      user: {
        select: {
          clientBio: true,
          skills: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

  const parsedFreelancers = freelancers.map(freelancer => {
    const { user, ...rest } = freelancer
    return {
      ...rest,
      bio: user?.clientBio,
      skills: user?.skills,
    }
  })

  return freelancers
}
