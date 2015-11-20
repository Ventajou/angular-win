/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../../.tmp/build/typings/angular-win.d.ts" />

namespace Demo {
  export var app = angular.module('demo', ['ui.router', 'ui.ace', 'angular-cache', 'ngWin'])

  app.run((winApplication: Win.App.ApplicationService) => {
    winApplication.setAppBarColors('#428bca', '#fff');
  });
}