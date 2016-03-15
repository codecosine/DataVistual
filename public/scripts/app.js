angular
    .module('app', [
        'app.routes',
        'app.forms',
        'app.chartModule',
        'app.navModule'
    ]);
angular.module('app')
    .run(function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
