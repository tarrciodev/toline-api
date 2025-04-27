import { prisma } from "../../config/prisma";
import { ClientError } from "../../errors/client-errors";

interface ISubscribeToProjectProps {
    dependencies: {
        projectId: string;
        tolinerId: string;
    };
    data: {
        quotation: number;
        estimatedTime: string;
        requiredInformations: string;
        similarExperiences: string;
        proposal: string;
    };
}
export async function subscribeToProjectService({
    dependencies,
    data,
}: ISubscribeToProjectProps) {
    const { projectId, tolinerId } = dependencies;

    const projectExists = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    if (!projectExists) throw new ClientError("Project not found");

    const tolinerExists = await prisma.toliner.findUnique({
        where: {
            id: tolinerId,
        },
    });

    if (!tolinerExists) throw new ClientError("Freelancer not found");

    const project = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            subscriptions: {
                create: {
                    toliner: {
                        connect: {
                            id: tolinerId,
                        },
                    },
                    ...data,
                },
            },
        },
        select: {
            id: true,
        },
    });
    return project;
}
