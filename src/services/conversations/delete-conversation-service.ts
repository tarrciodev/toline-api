import { prisma } from "../../config/prisma";

export async function deleteConversationService(conversationId: string) {
    const conversation = await prisma.conversation.delete({
        where: {
            id: conversationId,
        },
    });

    return conversation;
}
