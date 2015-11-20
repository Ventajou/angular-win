namespace Demo {
  app
    .config((
      $locationProvider: ng.ILocationProvider,
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $stateProvider: ng.ui.IStateProvider
    ) => {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('layout', {
          abstract: true,
          templateUrl: 'layout/layout.html'
        })
        .state('layout.home', {
          templateUrl: 'home/home.html',
          url: '/'
        })
        .state('layout.notifications', {
          templateUrl: 'notifications/notifications.html',
          url: '/notifications'
        })
        .state('layout.tiles', {
          templateUrl: 'tiles/tiles.html',
          url: '/tiles'
        })
    })
    .run((
      $rootScope: ng.IRootScopeService,
      $state: ng.ui.IStateService
    ) => {
      $rootScope.$on('win:notification', () => {
        $state.go('layout.notifications');
      })
    });
}