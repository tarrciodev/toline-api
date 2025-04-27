import { prisma } from "../../config/prisma";
import { ClientError } from "../../errors/client-errors";

interface InviteFreelancerToProjectProps {
    projectId: string;
    tolinerId: string;
    clientId: string;
}
export async function inviteFreelancerToMyProjectService(
    dependencies: InviteFreelancerToProjectProps
) {
    const imTheOwner = await prisma.project.findFirst({
        where: {
            id: dependencies.projectId,
            ownerId: dependencies.clientId,
        },
    });

    if (!imTheOwner) throw new ClientError("Permissões insuficientes");

    // const project = await prisma.projectSubscription.create({
    //     data: {
    //         tolinerId: dependencies.tolinerId,
    //         projectId: dependencies.projectId,
    //         invitation: {
    //             invited: true,
    //             acepted: false,
    //             denied: false,
    //         },
    //     },
    //     select: {
    //         id: true,
    //     },
    // });

    return null;
}
