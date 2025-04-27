import { prisma } from "../../../config/prisma";

export interface IDependenciesProps {
    projectId: string;
    freelancerId: string;
}
export async function unassignProjectToFreealancer(
    dependencies: IDependenciesProps
) {
    const { projectId, freelancerId } = dependencies;

    const project = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            freelancer: {
                disconnect: {
                    id: freelancerId,
                },
            },
        },
    });

    return { id: projectId };
}
