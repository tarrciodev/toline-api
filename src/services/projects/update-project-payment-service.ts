import { prisma } from '../../config/prisma'
import { ClientError } from '../../errors/client-errors'

export interface IDependenciesProps {
  projectId: string
  ownerId: string
  paymentMethod?: string
}

interface Idata {
  ammount: number
  clientInvoice?: string
  dueDate?: string
  referenceNumber?: string
}

interface IUpadateProjctPaymentService {
  dependencies: IDependenciesProps
  data: Idata
}
export async function updateProjectPaymentService({
  dependencies,
  data,
}: IUpadateProjctPaymentService) {
  const { projectId, ownerId, paymentMethod } = dependencies

  const imTheOwner = await prisma.project.findFirst({
    where: {
      ownerId: ownerId,
      id: projectId,
    },
    select: {
      owner: {
        select: {
          balance: {
            select: {
              ammount: true,
            },
          },
        },
      },
      freelancerId: true,
      payment: true,
    },
  })

  if (!imTheOwner) throw new ClientError('Permissões insuficientes')
  const insertData =
    paymentMethod === 'toline'
      ? {
          ammount: data.ammount,
          paymentMethod,
          status: 'resolved' as 'pending' | 'resolved' | 'rejected',
        }
      : {
          ammount: data.ammount,
          clientInvoice: data.clientInvoice,
          paymentMethod,
          referenceNumber: data.referenceNumber,
        }

  if (imTheOwner.payment) {
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        payment: {
          update: insertData,
        },
        dueDate: data.dueDate,
      },
      select: {
        id: true,
      },
    })

    return project
  }

  try {
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        payment: {
          create: {
            ...insertData,
            tolinerId: ownerId,
            freelancerId: imTheOwner.freelancerId as string,
          },
        },
        dueDate: data.dueDate,
      },
      select: {
        id: true,
      },
    })

    if (paymentMethod === 'toline') {
      const userbalance = imTheOwner?.owner?.balance?.ammount ?? 0
      await prisma.toliner.update({
        where: {
          id: ownerId,
        },
        data: {
          balance: {
            update: {
              ammount: userbalance - data.ammount,
            },
          },
        },
      })
    }

    return project
  } catch (err) {
    console.log(err)
    throw new ClientError('Erro ao atualizar o projeto')
  }
}
