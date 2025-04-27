import z from "zod";
import { FastifyTypedInstance } from "../../types";
import { messasing } from "../../utils/messages-pub-sub";

export async function getRealTimeMessageRoute(app: FastifyTypedInstance) {
    app.get(
        "/message/:conversationId",
        {
            schema: {
                tags: ["messages"],
                description: "Get user messages",
                params: z.object({
                    conversationId: z.string(),
                }),
            },
            websocket: true,
        },
        (connection, request) => {
            const { conversationId } = request.params;
            messasing.subscribe(conversationId, (message) => {
                connection.send(JSON.stringify(message));
            });
        }
    );
}
