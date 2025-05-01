import { prisma } from '../../config/prisma'
import { redis } from '../../config/redis'
import { ClientError } from '../../errors/client-errors'
import { type INotification, notify } from '../../utils/notify'

interface ISubscribeToProjectProps {
  dependencies: {
    projectId: string
    tolinerId: string
  }
  data: {
    quotation: number
    estimatedTime: string
    requiredInformations: string
    similarExperiences: string
    proposal: string
  }
}
export async function subscribeToProjectService({
  dependencies,
  data,
}: ISubscribeToProjectProps) {
  const { projectId, tolinerId } = dependencies

  const projectExists = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  })

  if (!projectExists) throw new ClientError('Project not found')

  const tolinerExists = await prisma.toliner.findUnique({
    where: {
      id: tolinerId,
    },
  })

  if (!tolinerExists) throw new ClientError('Freelancer not found')

  const project = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      subscriptions: {
        create: {
          toliner: {
            connect: {
              id: tolinerId,
            },
          },
          ...data,
        },
      },
    },
    select: {
      id: true,
      subscriptions: {
        where: {
          toliner: {
            id: tolinerId,
          },
        },
      },
    },
  })

  const notification = {
    type: 'New Subscription',
    target: projectExists.ownerId,
    id: project.subscriptions[0].id,
    payload: {
      message: `${tolinerExists.name} enviou uma proposta para o seu projeto ${projectExists.name}`,
      saw: false,
      createdAt: new Date().toISOString(),
      redirectId: projectExists.id,
    },
  }

  const notifications = await redis.get(
    `notifications:${projectExists.ownerId}`
  )

  const notificationsParsed = JSON.parse(
    notifications as string
  ) as INotification[]

  const validateNotification = Array.isArray(notificationsParsed)
    ? notificationsParsed
    : []

  await redis.set(
    `notifications:${projectExists.ownerId}`,
    JSON.stringify([...validateNotification, notification])
  )

  notify.publish({
    event: 'notifications',
    notification,
  })
  return project
}
