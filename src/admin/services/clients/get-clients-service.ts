import { prisma } from '../../../config/prisma'

export async function getClientsService() {
  const clients = await prisma.toliner.findMany({
    where: {
      user: {
        type: 'client',
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      user: {
        select: {
          clientBio: true,
          avatarUrl: true,
        },
      },
      specialization: true,
    },
  })

  const parseClients = clients.map(client => {
    const { user, createdAt, ...rest } = client
    return {
      ...rest,
      createdAt: createdAt.toLocaleDateString(),
      bio: user?.clientBio as string,
      avatarUrl: user?.avatarUrl as string,
    }
  })

  return parseClients
}
