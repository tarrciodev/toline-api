import { prisma } from "../../config/prisma";
import { ClientError } from "../../errors/client-errors";

export async function updateUserIdentificationService(
    data: { backUrl: string; frontUrl: string },
    userId: string
) {
    const userExists = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!userExists) throw new ClientError("Nenhum Usuario foi encontrado");

    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            toliner: {
                update: {
                    data: {
                        identification: data,
                    },
                },
            },
        },
        select: {
            id: true,
        },
    });

    return user;
}
