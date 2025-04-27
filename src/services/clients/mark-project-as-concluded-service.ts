import { prisma } from '../../config/prisma'

interface IEvaluateFreelancerService {
  data: {
    rate: string
    comment: string
    freelancerId: string
  }
  dependencies: {
    evaluatorId: string
    projectId: string
  }
}
export async function markProjectAsConcludedService({
  data,
  dependencies,
}: IEvaluateFreelancerService) {
  const { evaluatorId, projectId } = dependencies

  const updatedProject = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      status: 'Concluido',
      concludedAt: new Date(),
    },
    select: {
      id: true,
    },
  })
  const evaluation = await prisma.freelancerEvaluation.create({
    data: {
      evaluatorId,
      tolinerId: data.freelancerId,
      rate: data.rate,
      comment: data.comment,
    },
  })

  return updatedProject
}
