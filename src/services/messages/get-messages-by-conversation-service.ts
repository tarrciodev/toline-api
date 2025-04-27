import { prisma } from "../../config/prisma";

export async function getMessagesByConversationService(conversationId: string) {
    const messages = await prisma.message.findMany({
        where: {
            conversationId,
        },
        select: {
            id: true,
            content: true,
            senderId: true,
            saw: true,
            createdAt: true,
            hasFile: true,
            fileInfo: true,
        },
    });

    return messages;
}
