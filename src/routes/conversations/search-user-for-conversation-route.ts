import z from "zod";
import { searchUserForConversationService } from "../../services/conversations/search-user-for-conversation-service";
import { FastifyTypedInstance } from "../../types";

export async function searchUserForConversationRoute(
    app: FastifyTypedInstance
) {
    app.get(
        "/conversations/search-user-for-conversation/me/:tag",
        {
            schema: {
                tags: ["Conversations"],
                description: "Search user for conversation",
                querystring: z.object({
                    search: z.string(),
                }),
                params: z.object({
                    tag: z.string(),
                }),
            },
        },
        async (request, reply) => {
            const tag = request.params.tag as string;
            const search = request.query.search as string;
            if (!search) return reply.status(200).send([]);
            const user = await searchUserForConversationService(search, tag);
            reply.status(200).send(user);
        }
    );
}
