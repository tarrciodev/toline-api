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
          freelancerBio: true,
          avatarUrl: true,
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
    bio: user?.freelancerBio as string,
    avatarUrl: user?.avatarUrl as string,
    skills: user?.skills,
    categories: specialization?.map(category => ({
      id: category.id,
      name: category.name,
    })),
  }
}
