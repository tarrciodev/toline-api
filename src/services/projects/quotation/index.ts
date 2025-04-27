import { prisma } from "../../../config/prisma";
import { ClientError } from "../../../errors/client-errors";

interface IProjectQuoatationProps {
    dependencies: {
        projectId: string;
        ownerId: string;
    };
    data: {
        ammount: number;
        description: string;
    };
}
export async function updateProjectQuotationService({
    dependencies,
    data,
}: IProjectQuoatationProps) {
    const projectExists = await prisma.project.findUnique({
        where: {
            id: dependencies.projectId,
        },
        select: {
            ownerId: true,
            quotation: true,
        },
    });

    if (!projectExists) throw new ClientError("Nenhum projeto foi encontrado");

    const imTheOwner = projectExists.ownerId === dependencies.ownerId;

    if (!imTheOwner) throw new ClientError("Permissões insuficientes");

    const quotationExists = projectExists.quotation;

    if (quotationExists) {
        const updatedProject = await prisma.project.update({
            where: {
                id: dependencies.projectId,
            },
            data: {
                quotation: {
                    update: {
                        ammount: data.ammount,
                        description: data.description,
                    },
                },
            },
            select: {
                id: true,
            },
        });
        return updatedProject;
    }

    const createdProjectQuotation = await prisma.project.update({
        where: {
            id: dependencies.projectId,
        },
        data: {
            quotation: {
                create: {
                    ammount: data.ammount,
                    description: data.description,
                },
            },
        },
        select: {
            id: true,
        },
    });

    return createdProjectQuotation;
}
