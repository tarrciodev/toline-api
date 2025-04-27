import { prisma } from "../../config/prisma";
import { ClientError } from "../../errors/client-errors";

export interface IDependenciesProps {
    projectId: string;
    ownerId: string;
}

interface Idata {
    ammount: number;
    clientInvoice: string;
    dueDate: string;
}

interface IUpadateProjctPaymentService {
    dependencies: IDependenciesProps;
    data: Idata;
}
export async function updateProjectPaymentService({
    dependencies,
    data,
}: IUpadateProjctPaymentService) {
    const { projectId, ownerId } = dependencies;

    const imTheOwner = await prisma.project.findFirst({
        where: {
            ownerId: ownerId,
            id: projectId,
        },
        select: {
            payment: true,
        },
    });

    if (!imTheOwner) throw new ClientError("Permissões insuficientes");

    if (imTheOwner.payment) {
        const project = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                payment: {
                    update: {
                        ammount: data.ammount,
                        clientInvoice: data.clientInvoice,
                    },
                },
                dueDate: data.dueDate,
            },
            select: {
                id: true,
            },
        });

        return project;
    }

    try {
        const project = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                payment: {
                    create: {
                        ammount: data.ammount,
                        clientInvoice: data.clientInvoice,
                    },
                },
                dueDate: data.dueDate,
            },
            select: {
                id: true,
            },
        });

        return project;
    } catch (err) {
        return err;
    }
}
