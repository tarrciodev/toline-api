import z from "zod";
import { updateMessageService } from "../../services/messages/update-message-service";
import { FastifyTypedInstance } from "../../types";

export async function updateMessageRoute(app: FastifyTypedInstance) {
    app.put(
        "/message/:messageId/update",
        {
            schema: {
                tags: ["messages"],
                description: "Get user messages",
                params: z.object({
                    messageId: z.string(),
                }),
                body: z.object({
                    saw: z.boolean(),
                }),
            },
        },
        async (request, reply) => {
            const { saw } = request.body;
            const { messageId } = request.params;
            const message = await updateMessageService({ messageId, saw });
            return reply.status(200).send(message);
        }
    );
}
