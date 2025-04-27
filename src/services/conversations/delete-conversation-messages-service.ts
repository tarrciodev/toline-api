import { prisma } from "../../config/prisma";

export async function deleteConversationMessagesService(
    conversationId: string
) {
    await prisma.message.deleteMany({
        where: {
            conversationId,
        },
    });
    return;
}
