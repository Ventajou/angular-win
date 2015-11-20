namespace Demo.Notifications {
  class SimpleSample {

    title: string;
    message: string;

    constructor(
      private winNotification: Win.Notifications.NotificationService
    ) { }

    notify() {
      this.winNotification.notify({
        title: this.title,
        message: this.message
      });
    }
  }

  app.controller('Notification.Simple', SimpleSample);
}
