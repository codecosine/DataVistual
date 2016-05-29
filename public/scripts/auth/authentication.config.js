(function(){
    'use strict';

    angular
        .module('app.auth')
        .run(runConfig);
    runConfig.$inject = ['$window','userService','authenticationService']
    /**
     * 页面初次加载检查本地是否有token
     * @param userService
     * @param authenticationService
     */
    function runConfig($window,userService,authenticationService){
        if($window.sessionStorage.token){
            console.log('存在客户端令牌jwt');
            authenticationService.updatetoken($window.sessionStorage.token);
            userService.first().then(function(json){
                authenticationService.login();
                authenticationService.userinfo.username = json.data.username;
            },function(){
                console.log('客户端储存的令牌已经过期');
            });
        }
    }
    angular
        .module('app.auth')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        });

})();

