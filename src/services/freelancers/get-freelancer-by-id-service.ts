import { prisma } from '../../config/prisma'

export async function getFreelancerByIdService(freelancerId: string) {
  const freelancer = await prisma.toliner.findUnique({
    where: {
      id: freelancerId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      isVerified: true,
      jobDescription: true,
      nacionality: true,
      user: {
        select: {
          freelancerBio: true,
          avatarUrl: true,
          skills: {
            select: {
              id: true,
              name: true,
              categoryId: true,
              subcategoryId: true,
              slug: true,
            },
          },
        },
      },
      projectsFreelanced: {
        select: {
          id: true,
          name: true,
          status: true,
        },
      },
      specialization: {
        select: {
          id: true,
          name: true,
        },
      },
      portifolio: true,
    },
  })

  if (!freelancer) {
    return null
  }

  const { user, ...rest } = freelancer

  const parseFreelancer = {
    ...rest,
    skills: user?.skills.map(skill => ({
      id: skill.id,
      name: skill.name,
    })),
    bio: user?.freelancerBio,
    avatarUrl: user?.avatarUrl,
    createdAt: rest.createdAt.toLocaleDateString(),
  }

  return parseFreelancer
}
