import { prisma } from "../../config/prisma";

export async function deleteProject(projectId: string, ownerId: string) {
    const imTheOwner = await prisma.project.findFirst({
        where: {
            id: projectId,
            ownerId,
        },
    });

    if (!imTheOwner) throw new Error("You are not the owner of this project");
    const project = await prisma.project.delete({
        where: {
            id: projectId,
        },
    });
    return;
}
