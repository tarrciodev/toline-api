import z from "zod";
import { createConversationService } from "../../services/conversations/create-conversation-service";
import { FastifyTypedInstance } from "../../types";

export async function createConversationRoute(app: FastifyTypedInstance) {
    app.post(
        "/conversation/create",
        {
            schema: {
                tags: ["Conversations"],
                description: "Create conversation",
                body: z.object({
                    members: z.array(z.string()).min(2),
                }),
            },
        },
        async (request, reply) => {
            const members = request.body.members;
            const conversation = await createConversationService(members);
            reply.status(201).send(conversation);
        }
    );
}
