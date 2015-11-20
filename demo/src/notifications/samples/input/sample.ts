namespace Demo.Notifications {
  class InputSample {

    constructor(
      private winNotification: Win.Notifications.NotificationService,
      $scope: ng.IScope
    ) {
      $scope.$on('win:notification', (e: any, params: Win.Notifications.INotificationParams<{foo:string}>) => {
        switch (params.argument) {
          case 'input-ok':
            $scope.$apply(`vm.feedback = "You typed [${params.inputs.foo}]"`);
            break;
          default:
            $scope.$apply('vm.feedback = ""');
        }
        $scope.$digest();
      })
    }

    notify() {
      this.winNotification.notify({
        title: 'Test',
        message: 'Have something to say?',
        inputs: [
          { id: 'foo' }
        ],
        actions: [
          { label: 'Ok', value: 'input-ok' }
        ]
      });
    }
  }

  app.controller('Notification.Input', InputSample);
}