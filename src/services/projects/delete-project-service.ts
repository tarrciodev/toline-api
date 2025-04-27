import { prisma } from "../../config/prisma";
import { ClientError } from "../../errors/client-errors";

export async function deleteProjectService({
    projectId,
    ownerId,
}: {
    projectId: string;
    ownerId: string;
}) {
    const projectExists = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    if (!projectExists) {
        throw new ClientError("Project not found");
    }

    if (projectExists.ownerId !== ownerId) {
        throw new ClientError("You are not the owner of this project");
    }

    if (projectExists.status === "Concluido") {
        await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                isActive: false,
            },
        });

        return projectExists;
    }
    const project = await prisma.project.delete({
        where: {
            id: projectId,
        },
    });

    return project;
}
