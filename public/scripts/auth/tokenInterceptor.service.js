(function(){
    'use strict';
    angular
        .module('app.auth')
        .factory('tokenInterceptor', tokenInterceptor);
    tokenInterceptor.$inject = ['$q','authenticationService'];
    function tokenInterceptor($q, authenticationService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                var token = authenticationService.token();
                if (token) {
                    config.headers.Authorization = token;
                }
                return config;
            },
            response: function (response) {
                return response || $q.when(response);
            }
        };
    }
})();
