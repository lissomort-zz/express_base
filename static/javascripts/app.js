var nodeApp = angular.module('nodeApp', ['ngRoute', 'nodeControllers']);

nodeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/welcome',
        controller: 'IndexController'
      }).
      when('/link1', {
        templateUrl: '/templates/link1.html',
        controller: 'FirstController'
      }).
      when('/link2', {
        templateUrl: '/templates/link2.html',
        controller: 'SecondController'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
