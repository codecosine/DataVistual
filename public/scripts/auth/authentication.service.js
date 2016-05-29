/**
 * Created by codecosine on 2016/5/28.
 */

(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authenticationService', authenticationService);
    /**
     * 权限认证的信息储存服务
     * @param $window
     * @returns {{isLogged: isLogged, login: login, logout: logout, userinfo: {username: string}}}
     */
    function authenticationService() {
        var logged = false;
        var token = '';
        return {
            isLogged: function(){
                return logged;
            },
            login: function(){
                logged = true;
            },
            logout:function(){
                logged = false;
                token = '';
            },
            token:function(){
                return token;
            },
            updatetoken:function(newtoken){
                token = newtoken;
            },
            userinfo:{
                username:'尚未登录',
                database:[]//{'type':,settings:{}}
            }
        };
    }
})();

