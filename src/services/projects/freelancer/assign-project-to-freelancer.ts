import { prisma } from "../../../config/prisma";

export interface IDependenciesProps {
    projectId: string;
    freelancerId: string;
}
export async function assignProjectToFreealancer(
    dependencies: IDependenciesProps
) {
    const { projectId, freelancerId } = dependencies;

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
    });

    return { id: projectId };
}
