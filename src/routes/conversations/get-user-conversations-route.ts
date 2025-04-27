import z from "zod";
import { getUserConversationsService } from "../../services/conversations/get-user-conversations-service";
import { FastifyTypedInstance } from "../../types";

export async function getUserConversationsRoute(app: FastifyTypedInstance) {
    app.get(
        "/conversations/user/:userId",
        {
            schema: {
                tags: ["Conversations"],
                description: "Get conversations",
                params: z.object({
                    userId: z.string(),
                }),
            },
        },

        async (request, reply) => {
            const userId = request.params.userId as string;
            const conversations = await getUserConversationsService(userId);
            reply.status(200).send(conversations);
        }
    );
}
