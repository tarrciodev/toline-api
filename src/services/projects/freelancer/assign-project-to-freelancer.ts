import crypto from 'node:crypto'
import { prisma } from '../../../config/prisma'
import { redis } from '../../../config/redis'
import { type INotification, notify } from '../../../utils/notify'

export interface IDependenciesProps {
  projectId: string
  freelancerId: string
}
export async function assignProjectToFreealancer(
  dependencies: IDependenciesProps
) {
  const { projectId, freelancerId } = dependencies

  const project = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      freelancer: {
        connect: {
          id: freelancerId,
        },
      },
    },
    include: {
      owner: {
        select: {
          name: true,
        },
      },
    },
  })

  const notification = {
    type: 'Proposta Aceita',
    target: freelancerId,
    id: crypto.randomUUID(),
    payload: {
      message: `${project.owner.name} aceitou sua proposta no projeto ${project.name}`,
      saw: false,
      createdAt: new Date().toISOString(),
      redirectId: project.id,
    },
  }

  const notifications = await redis.get(`notifications:${freelancerId}`)

  const notificationsParsed = JSON.parse(
    notifications as string
  ) as INotification[]

  const validateNotification = Array.isArray(notificationsParsed)
    ? notificationsParsed
    : []

  await redis.set(
    `notifications:${freelancerId}`,
    JSON.stringify([...validateNotification, notification])
  )

  notify.publish({
    event: 'notifications',
    notification,
  })

  return { id: projectId }
}
