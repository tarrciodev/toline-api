import { prisma } from '../../../config/prisma'

export async function getFreelancerByIdService({
  freelancerId,
}: { freelancerId: string }) {
  const freelancer = await prisma.toliner.findUnique({
    where: {
      id: freelancerId,
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
      identification: true,
      specialization: true,
    },
  })

  if (!freelancer) {
    return null
  }

  const { user, specialization, ...rest } = freelancer

  return {
    ...rest,
    bio: user?.clientBio,
    skills: user?.skills,
    categories: specialization?.map(category => ({
      id: category.id,
      name: category.name,
    })),
  }
}
