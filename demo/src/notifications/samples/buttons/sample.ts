namespace Demo.Notifications {
  class Button {
    feedback: string;

    constructor(
      private winNotification: Win.Notifications.NotificationService,
      private $scope: ng.IScope
    ) {
      $scope.$on('win:notification', (e: any, params: Win.Notifications.INotificationParams<{}>) => {
        this.handleNotification(params);
        $scope.$digest();
      })
      
      var notification = _(winNotification.notifications())
        .select(n => n.argument == 'button-ok' || n.argument == 'button-cancel')
        .last();
        
      if (notification) {
        this.handleNotification(notification);
      }
    }

    handleNotification(params: Win.Notifications.INotificationParams<{}>) {
      switch (params.argument) {
        case 'button-ok':
          this.feedback = 'You pressed the Ok button';
          break;
        case 'button-cancel':
          this.feedback = 'You pressed the Cancel button';
          break;
        default:
          this.feedback = '';
      }
    }

    notify() {
      this.winNotification.notify({
        title: 'Test',
        message: 'This notification has buttons',
        actions: [
          { label: 'Ok', value: 'button-ok' },
          { label: 'Cancel', value: 'button-cancel' }
        ]
      });
    }
  }

  app.controller('Notification.Button', Button);
}