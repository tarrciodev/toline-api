import { prisma } from "../../config/prisma";
import { ClientError } from "../../errors/client-errors";

export async function getProjectByIdService(projectId: string) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            id: true,
            name: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            freelancerId: true,
            dueDate: true,
            subcategoryId: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                    user: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
            skills: {
                select: {
                    id: true,
                    name: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                    subcategories: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            subscriptions: {
                select: {
                    id: true,
                    toliner: {
                        select: {
                            id: true,
                            name: true,
                            user: {
                                select: {
                                    avatarUrl: true,
                                    id: true,
                                },
                            },
                        },
                    },
                    estimatedTime: true,
                    requiredInformations: true,
                    quotation: true,
                    similarExperiences: true,
                    createdAt: true,
                },
            },
            payment: {
                select: {
                    id: true,
                    ammount: true,
                    createdAt: true,
                    clientInvoice: true,
                    systemInvoice: true,
                    verifiedFromSystem: true,
                },
            },
            quotation: {
                select: {
                    id: true,
                    ammount: true,
                    description: true,
                },
            },
        },
    });

    if (!project) {
        throw new ClientError("Nenhum project Foi encontrado");
    }

    const parsedProjects = {
        id: project.id as string,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt.toLocaleDateString(),
        dueDate: project.dueDate?.toLocaleDateString() as string,
        updatedAt: project.updatedAt.toLocaleDateString(),
        category: project.category?.name as string,
        freelancerId: project.freelancerId as string,
        subcategory: project.category?.subcategories?.find(
            (subcategory) => subcategory.id === project.subcategoryId
        )?.name as string,
        skills: project.skills,
        owner: {
            id: project.owner?.id as string,
            name: project.owner?.name as string,
            userId: project.owner?.user?.id as string,
        },

        subscriptions: project.subscriptions?.map((subscription) => {
            const { toliner } = subscription;
            return {
                ...subscription,
                toliner: {
                    id: toliner.id as string,
                    name: toliner.name as string,
                    avatarUrl: toliner.user?.avatarUrl as string,
                    userId: toliner.user?.id as string,
                },
                createdAt: subscription.createdAt.toLocaleDateString(),
            };
        }),
        payment: {
            id: project.payment?.id as string,
            ammount: project.payment?.ammount as number,
            createdAt:
                project.payment?.createdAt.toLocaleDateString() as string,
            clientInvoice: project.payment?.clientInvoice as string,
            systemInvoice: project.payment?.systemInvoice as string,
            verifiedFromSystem: project.payment?.verifiedFromSystem as boolean,
        },
        quotation: {
            id: project.quotation?.id as string,
            ammount: project.quotation?.ammount as number,
            description: project.quotation?.description as string,
        },
    };

    return parsedProjects;
}
