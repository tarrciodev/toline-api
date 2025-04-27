import { prisma } from "../../config/prisma";
import { notifyMessage } from "../../utils/messages-notification-pub-sub";
import { messasing } from "../../utils/messages-pub-sub";

export async function createMessageService(
    conversationId: string,
    message: { senderId: string; content: string }
) {
    const messageCreated = await prisma.message.create({
        data: {
            ...message,
            conversationId,
        },
    });

    const parsedMessage = {
        ...messageCreated,
        createdAt: messageCreated.createdAt.toLocaleDateString(),
    };

    messasing.publish({
        conversationId,
        message: parsedMessage,
    });

    notifyMessage.publish({
        event: "message",
        message: parsedMessage,
    });
    return parsedMessage;
}
