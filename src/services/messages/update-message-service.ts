import { prisma } from "../../config/prisma";

export async function updateMessageService({
    saw,
    messageId,
}: {
    saw: boolean;
    messageId: string;
}) {
    const message = await prisma.message.update({
        where: {
            id: messageId,
        },
        data: {
            saw,
        },
        select: {
            id: true,
        },
    });

    return message;
}
