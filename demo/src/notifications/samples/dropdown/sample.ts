namespace Demo.Notifications {

  var options = ['red', 'green', 'blue']

  class DropdownSample {

    constructor(
      private winNotification: Win.Notifications.NotificationService,
      $scope: ng.IScope
    ) {
      $scope.$on('win:notification', (e: any, params: Win.Notifications.INotificationParams<{foo:string}>) => {
        switch (params.argument) {
          case 'dropdown-ok':
            $scope.$apply(`vm.feedback = "You selected ${options[parseInt(params.inputs.foo)]}"`);
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
        message: 'What is your favorite color?',
        inputs: [
          {
            id: 'foo',
            options: _.map(options, (o, index) => { return { id: index.toString(), label: o }; } )
          }
        ],
        actions: [
          { label: 'Ok', value: 'dropdown-ok' }
        ]
      });
    }
  }

  app.controller('Notification.Dropdown', DropdownSample);
}
