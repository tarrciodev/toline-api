import { FastifyTypedInstance } from "../../types";
import { createConversationRoute } from "./create-conversation-route";
import { deleteConversationMessagesRoute } from "./delete-conversation-messages-route";
import { deleteConversationRoute } from "./delete-conversation-route";
import { getUserConversationsRoute } from "./get-user-conversations-route";
import { searchUserForConversationRoute } from "./search-user-for-conversation-route";

export async function converastionsRoutes(app: FastifyTypedInstance) {
    app.register(createConversationRoute);
    app.register(searchUserForConversationRoute);
    app.register(getUserConversationsRoute);
    app.register(deleteConversationRoute);
    app.register(deleteConversationMessagesRoute);
}
