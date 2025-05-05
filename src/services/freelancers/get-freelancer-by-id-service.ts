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
      user: {
        select: {
          clientBio: true,
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
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          dueDate: true,
          subcategoryId: true,
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
          skills: true,
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
              skills: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          subscriptions: {
            select: {
              id: true,
              createdAt: true,
            },
          },
          payment: {
            select: {
              id: true,
              ammount: true,
              createdAt: true,
              clientInvoice: true,
              systemInvoice: true,
              isVerified: true,
            },
          },
          quotation: {
            select: {
              id: true,
              ammount: true,
              description: true,
            },
          },
        },
      },

      subscriptions: {
        select: {
          id: true,
          project: {
            select: {
              status: true,
            },
          },
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
    bio: user?.clientBio,
    projects: freelancer.projectsFreelanced?.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      createdAt: project.createdAt.toLocaleDateString(),
      dueDate: project.dueDate?.toLocaleDateString(),
      updatedAt: project.updatedAt.toLocaleDateString(),
      category: project.category?.name as string,
      freelancerId: freelancer.id as string,
      subcategory: project.category?.subcategories?.find(
        subcategory => subcategory.id === project.subcategoryId
      )?.name as string,

      owner: {
        id: project.owner?.id as string,
        name: project.owner?.name as string,
      },
      payment: {
        id: project.payment?.id as string,
        ammount: project.payment?.ammount as number,
        createdAt: project.payment?.createdAt.toLocaleDateString() as string,
        clientInvoice: project.payment?.clientInvoice as string,
        systemInvoice: project.payment?.systemInvoice as string,
        verifiedFromSystem: project.payment?.isVerified as boolean,
      },
      quotation: {
        id: project.quotation?.id as string,
        ammount: project.quotation?.ammount as number,
        description: project.quotation?.description as string,
      },
    })),
  }

  return parseFreelancer
}
