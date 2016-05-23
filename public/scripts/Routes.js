
angular.module('app.routes',[
    'ui.router'
]);
angular.module('app.routes')
    .controller('localController',localController);
localController.$inject = ['$state','$stateParams','$scope','$window','$location','authenticationService','$uibModal'];
function localController($state, $stateParams,$scope,$window,$location,authenticationService,$uibModal){
    $scope.$on('$stateChangeStart', function (event, nextRoute) {
        var option = {
            requiredLogin:nextRoute.access.requiredLogin,
            loged:$scope.isLogged(),
            localtoken:$window.sessionStorage.token,
            servicetoken:authenticationService.token(),
            userinfo:authenticationService.userinfo
        };
        console.log(option);
        //redirect only if both isLogged is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredLogin
           && !$scope.isLogged()) {
            console.log('你没有权限访问这个页面，请登录后重试');
            $location.path("/welcome");
        }
    });
    $scope.$state = $state;
    $scope.$stateParams = $stateParams;
    $scope.isLogged = authenticationService.isLogged;
    $scope.userinfo = authenticationService.userinfo;
    $scope.signin = function () {
        $uibModal.open({
            animation: true,
            templateUrl: 'views/includes/signIn.html',
            controller: 'SignController',
            controllerAs:'auth'
        });
    };
    $scope.signup = function () {
        $uibModal.open({
            animation: true,
            templateUrl: 'views/includes/signUp.html',
            controller: 'SignController',
            controllerAs:'auth'
        });
    };
    $scope.shortcut = function(){
        if($scope.isLogged()){
            $location.path("/app/dashboard");
        }else {
            $scope.signin();
        }
    }
    $scope.logout = function(){
        authenticationService.logout();
    };


}




angular.module('app.routes')
    .config(routesConfig);

routesConfig.$inject = ['$httpProvider','$stateProvider', '$urlRouterProvider'];
function routesConfig($httpProvider,$stateProvider, $urlRouterProvider){
    $httpProvider.interceptors.push('tokenInterceptor');
    $urlRouterProvider.otherwise('/welcome');
    $stateProvider
        .state('welcome', {
            url: '/welcome',
            views: {
                '': {
                    templateUrl: 'views/includes/base.html'
                },
                'main@welcome':{
                    templateUrl:'views/pages/welcome.html'
                }
            },
            access: { requiredLogin: false }

        })
        .state('app', {
            url: '/app',
            views: {
                '': {
                    templateUrl: 'views/includes/base.html'
                }
            },
            access: { requiredLogin: true }
        })
        .state('app.dashboard', {
            url: '/dashboard',
            views: {
                'main@app':{
                    templateUrl:'views/pages/dashBoard.html'
                }
            },
            access: { requiredLogin: true }
        })
}
