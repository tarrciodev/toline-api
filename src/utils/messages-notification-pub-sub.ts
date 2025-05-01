type IMEssage = {
  id: string
  senderId: string
  content: string
  createdAt: string
  conversationId: string
  saw: boolean
}
type PublishParams = { event: string; message: IMEssage }
type Subscriber = (message: IMEssage) => void

class MessagesNotificationPubSub {
  private channel: Record<string, Subscriber[]> = {}
  subscribe(event: string, subscriber: Subscriber) {
    if (!this.channel[event]) {
      this.channel[event] = []
    }
    this.channel[event].push(subscriber)
  }

  publish({ event, message }: PublishParams) {
    if (!this.channel[event]) {
      return
    }
    for (const subscriber of this.channel[event]) {
      subscriber(message)
    }
  }
}

export const notifyMessage = new MessagesNotificationPubSub()
