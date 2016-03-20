
angular.module('app.routes',[
    'ui.router'
]);
angular.module('app.routes')
    .config(routesConfig);

routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function routesConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/app/profile');
    $stateProvider
        .state('app', {
            url: '/app',
            views: {
                '': {
                    templateUrl: 'views/includes/base.html'
                },
                'main@app':{
                    templateUrl:'views/pages/profile.html'
                }
            }
        })
        .state('app.profile', {
            url: '/profile',
            views: {
                'main@app':{
                    templateUrl:'views/pages/profile.html'
                }
            }
        })
        .state('app.dataOrigin',{
            url:'/origin' ,
            views:{
                'main@app': {
                    templateUrl:'views/pages/dataOrigin.html'
                }
            }
        })
        .state('app.dataDispose',{
            url:'/dispose',
            views:{
                'main@app':{
                    templateUrl:'views/pages/dataDispose.html'
                }
            }
        })
        .state('app.analyze',{
            url:'/dispose',
            views:{
                'main@app':{
                    templateUrl:'views/pages/analyze.html'
                }
            }
        })
        .state('app.dashBoard',{
            url:'/dashBoard',
            views:{
                'main@app':{
                    templateUrl:'views/pages/dashBoard.html'
                }
            }
        });
}
