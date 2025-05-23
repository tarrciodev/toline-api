import { prisma } from '../../config/prisma'
import { ClientError } from '../../errors/client-errors'

interface CreateProjectProps {
  name: string
  description: string
  categoryId: string
  subcategoryId?: string
  skills?: string[]
  quotation?: number
}
export async function createProjectService(
  data: CreateProjectProps,
  ownerId: string
) {
  if (data.skills && data.skills.length > 0) {
    const storedSkills = await prisma.skill.findMany({
      where: {
        id: {
          in: data.skills,
        },
      },
    })

    if (!storedSkills) throw new ClientError('Skills not found')

    const skills = storedSkills.map(skill => ({ id: skill.id }))
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        ownerId,
        skills: {
          connect: skills,
        },
        quotation: data.quotation
          ? {
              create: {
                ammount: data.quotation,
              },
            }
          : undefined,
      },
      select: {
        id: true,
        name: true,
        owner: {
          select: {
            email: true,
            id: true,
            name: true,
          },
        },
      },
    })

    return project
  }

  const project = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      ownerId,
    },
    select: {
      id: true,
      name: true,
      owner: {
        select: {
          email: true,
          id: true,
          name: true,
        },
      },
    },
  })

  return project
}
