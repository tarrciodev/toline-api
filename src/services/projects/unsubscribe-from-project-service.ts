import { prisma } from "../../config/prisma";

interface IDependenciesProps {
    projectId: string;
    tolinerId: string;
}
export async function unsubscribeFromProjectService(
    dependencies: IDependenciesProps
) {
    const { projectId, tolinerId } = dependencies;

    const project = await prisma.projectSubscription.delete({
        where: {
            projectId_tolinerId: {
                projectId,
                tolinerId,
            },
        },
    });

    return;
}
