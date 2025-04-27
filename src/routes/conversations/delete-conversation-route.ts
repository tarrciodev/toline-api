import z from "zod";
import { deleteConversationService } from "../../services/conversations/delete-conversation-service";
import { FastifyTypedInstance } from "../../types";

export async function deleteConversationRoute(app: FastifyTypedInstance) {
    app.delete(
        "/conversation/:conversationId",
        {
            schema: {
                tags: ["Conversations"],
                description: "Delete conversation",
                params: z.object({
                    conversationId: z.string(),
                }),
            },
        },
        async (request, reply) => {
            const conversationId = request.params.conversationId as string;
            const conversation = await deleteConversationService(
                conversationId
            );
            reply.status(200).send(conversation);
        }
    );
}
