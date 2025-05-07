import { prisma } from '../../config/prisma'

export async function getClientPaymentsService({
  tolinerId,
}: { tolinerId: string }) {
  const payments = await prisma.payment.findMany({
    where: {
      tolinerId,
    },
    select: {
      id: true,
      ammount: true,
      createdAt: true,
      status: true,
      project: {
        select: {
          id: true,
          name: true,
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
          freelancer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

  const parsedPayments = payments.map(payment => {
    const { project, ...rest } = payment
    return {
      ...rest,
      createdAt: payment.createdAt.toLocaleDateString(),
      project: {
        id: project.id,
        name: project.name,
      },
      client: {
        id: project.owner?.id,
        name: project.owner?.name,
      },
      freelancer: {
        id: payment.project.freelancer?.id,
        name: payment.project.freelancer?.name,
      },
    }
  })

  return parsedPayments
}
