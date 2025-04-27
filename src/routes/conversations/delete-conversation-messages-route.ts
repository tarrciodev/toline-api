import z from "zod";
import { deleteConversationMessagesService } from "../../services/conversations/delete-conversation-messages-service";
import { FastifyTypedInstance } from "../../types";

export async function deleteConversationMessagesRoute(
    app: FastifyTypedInstance
) {
    app.delete(
        "/conversation/messages/delete/:conversationId",
        {
            schema: {
                tags: ["Conversations"],
                description: "Delete all Mesages from conversation",
                params: z.object({
                    conversationId: z.string(),
                }),
            },
        },
        async (request, reply) => {
            const conversationId = request.params.conversationId as string;
            await deleteConversationMessagesService(conversationId);
            reply.status(200).send();
        }
    );
}
