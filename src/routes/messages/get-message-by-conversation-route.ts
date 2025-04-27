import z from "zod";
import { getMessagesByConversationService } from "../../services/messages/get-messages-by-conversation-service";
import { FastifyTypedInstance } from "../../types";

export async function getMessageByConversationRoute(app: FastifyTypedInstance) {
    app.get(
        "/messages/conversation/:conversationId",
        {
            schema: {
                tags: ["messages"],
                description: "Get conversation messages",
                params: z.object({
                    conversationId: z.string(),
                }),
            },
        },
        async (request, reply) => {
            const { conversationId } = request.params as {
                conversationId: string;
            };
            if (!conversationId) return reply.status(200).send([]);
            const messages = await getMessagesByConversationService(
                conversationId
            );
            reply.status(200).send(messages);
        }
    );
}
