(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('userService',userService);
    userService.$inject = ['$http'];
    /**
     *  与用户权限逻辑与后台交互的接口
     * @param $http
     * @returns {{signIn: signIn, signUp: signUp, first: first}}
     */
    function userService($http) {
        return {
            signIn: function(credentials) {
                return $http.post('/signin', credentials);
            },
            signUp: function(register){
                return $http.post('/signup',register);
            },
            first:function(){
                return $http.post('/isLoged');
            }
        }
    }
})();