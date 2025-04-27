import { prisma } from "../../config/prisma";
import { ClientError } from "../../errors/client-errors";

export async function updateUserBankAccountService(
    data: { bankName: string; cardName: string; cardNumber: string },
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
                        bankAccount: data,
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
