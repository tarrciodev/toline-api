import { prisma } from '../../config/prisma'

export async function getTolinerService(tolinerEmail: string) {
  const toliner = await prisma.toliner.findUnique({
    where: {
      email: tolinerEmail,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
      user: {
        select: {
          id: true,
          username: true,
          type: true,
          avatarUrl: true,
          tag: true,
          createdAt: true,
          clientBio: true,
          freelancerBio: true,
          skills: {
            select: {
              id: true,
              name: true,
            },
          },
          conversations: {
            select: {
              id: true,
            },
          },
        },
      },
      projectsOwned: {
        where: {
          isActive: true,
        },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          dueDate: true,
          freelancerId: true,
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
          subcategoryId: true,
          skills: {
            select: {
              id: true,
              name: true,
            },
          },
          payment: {
            select: {
              id: true,
              ammount: true,
              clientInvoice: true,
              systemInvoice: true,
              verifiedFromSystem: true,
              createdAt: true,
            },
          },
          quotation: {
            select: {
              id: true,
              ammount: true,
              description: true,
            },
          },
          freelancer: {
            select: {
              id: true,
              name: true,
              email: true,
              user: {
                select: {
                  avatarUrl: true,
                },
              },
            },
          },
          subscriptions: {
            select: {
              id: true,
              toliner: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  user: {
                    select: {
                      avatarUrl: true,
                      id: true,
                    },
                  },
                },
              },
              estimatedTime: true,
              requiredInformations: true,
              similarExperiences: true,
              proposal: true,
              quotation: true,
            },
          },
        },
      },
      projectsFreelanced: {
        where: {
          isActive: true,
          status: {
            not: 'Concluido',
          },
        },
        select: {
          id: true,
          name: true,
          status: true,
          description: true,
          createdAt: true,
          subcategoryId: true,
          owner: {
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
          skills: {
            select: {
              id: true,
              name: true,
            },
          },
          subscriptions: {
            select: {
              id: true,
              toliner: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  user: {
                    select: {
                      avatarUrl: true,
                      id: true,
                    },
                  },
                },
              },
              estimatedTime: true,
              requiredInformations: true,
              similarExperiences: true,
              proposal: true,
              quotation: true,
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
              freelancer: true,
            },
          },
        },
      },
      especialiazation: {
        select: {
          id: true,
          name: true,
        },
      },
      portifolio: {
        select: {
          id: true,
          title: true,
          cover: true,
          assets: true,
          description: true,
          completedAt: true,
        },
      },
      bankAccount: true,
      identification: true,
    },
  })
  if (!toliner) {
    throw new Error('Toliner not found')
  }
  const { user, projectsOwned, projectsFreelanced, portifolio, ...rest } =
    toliner
  const projects = projectsOwned?.map(project => {
    return {
      ...project,
      owner: {
        name: toliner.name,
        id: toliner.id,
        userId: toliner.user?.id,
      },
      createdAt: project.createdAt.toLocaleDateString(),
      category: project.category?.name,
      subcategory: project?.category?.subcategories?.map(
        subcategory => subcategory.id === project.subcategoryId
      ),
      subscriptions: project.subscriptions?.map(subscription => {
        return {
          ...subscription,
          freelancer: {
            id: subscription.toliner.id,
            name: subscription.toliner.name,
            userId: subscription.toliner.user?.id,
            avatarUrl: subscription.toliner.user?.avatarUrl,
          },
        }
      }),
    }
  })

  const projectsFreelancedParsed = projectsFreelanced.map(project => {
    return {
      ...project,
      owner: {
        name: toliner.name,
        id: toliner.id,
        userId: toliner.user?.id,
      },
      createdAt: project.createdAt.toLocaleDateString(),
      category: project.category?.name,
      subcategory: project?.category?.subcategories?.map(
        subcategory => subcategory.id === project.subcategoryId
      ),
      subscriptions: project.subscriptions?.map(subscription => {
        return {
          ...subscription,
          freelancer: {
            id: subscription.toliner.id,
            name: subscription.toliner.name,
            userId: subscription.toliner.user?.id,
            avatarUrl: subscription.toliner.user?.avatarUrl,
          },
        }
      }),
    }
  })

  return {
    ...rest,
    avatarUrl: user?.avatarUrl,
    clientBio: user?.clientBio,
    freelancerBio: user?.freelancerBio,
    type: user?.type,
    createdAt: user?.createdAt.toLocaleDateString(),
    userId: user?.id,
    projects,
    projectsFreelanced: projectsFreelancedParsed,
    skills: user?.skills,
    showCases: toliner.portifolio,
  }
}
