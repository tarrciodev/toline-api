type IMEssage = {
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
    conversationId: string;
    saw: boolean;
};
type PublishParams = { conversationId: string; message: IMEssage };
type Subscriber = (message: IMEssage) => void;

class MessagesPubSub {
    private channel: Record<string, Subscriber[]> = {};
    subscribe(conversationId: string, subscriber: Subscriber) {
        if (!this.channel[conversationId]) {
            this.channel[conversationId] = [];
        }
        this.channel[conversationId].push(subscriber);
    }

    publish({ conversationId, message }: PublishParams) {
        if (!this.channel[conversationId]) {
            return;
        }
        for (const subscriber of this.channel[conversationId]) {
            subscriber(message);
        }
    }
}

export const messasing = new MessagesPubSub();
