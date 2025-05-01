export interface INotification {
  id: string
  type: string
  target: string
  payload: {
    message: string
    saw: boolean
    createdAt: string
    redirectId: string
  }
}
type PublishParams = { event: string; notification: INotification }
type Subscriber = (notification: INotification) => void

class NotificationPubSub {
  private channel: Record<string, Subscriber[]> = {}
  subscribe(event: string, subscriber: Subscriber) {
    if (!this.channel[event]) {
      this.channel[event] = []
    }
    this.channel[event].push(subscriber)
  }

  publish({ event, notification }: PublishParams) {
    if (!this.channel[event]) {
      return
    }
    for (const subscriber of this.channel[event]) {
      subscriber(notification)
    }
  }
}

export const notify = new NotificationPubSub()
