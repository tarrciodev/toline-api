import { FastifyTypedInstance } from "../../types";
import { createMessageRoute } from "./create-message-route";
import { getMessageByConversationRoute } from "./get-message-by-conversation-route";
import { getNotificationMessageRoute } from "./get-notification-message-route";
import { getRealTimeMessageRoute } from "./get-real-time-message-route";
import { updateMessageRoute } from "./update-message-route";

export async function messagesRoute(app: FastifyTypedInstance) {
    app.register(updateMessageRoute);
    app.register(getRealTimeMessageRoute);
    app.register(getMessageByConversationRoute);
    app.register(createMessageRoute);
    app.register(getNotificationMessageRoute);
}
