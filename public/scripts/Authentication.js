angular
    .module('app.auth',[]);


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
            console.log('客户端储存的jwt已经过期')
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
angular
    .module('app.auth')
    .controller('SignController',SignController);
SignController.$inject = ['$location','$window','$uibModalInstance','$uibModal','userService','authenticationService'];
function SignController($location,$window,$uibModalInstance,$uibModal,userService,authenticationService){
    var vm = this;
    vm.credentials = {
        username: '',
        password: ''
    };
    vm.register = {
        username: '',
        password: '',
        passwordConfirm:''
    };
    vm.changeToSignIn = function(){
        $uibModalInstance.close();
        $uibModal.open({
            animation: true,
            templateUrl: 'views/includes/signIn.html',
            controller: 'SignController',
            controllerAs:'auth'
        });
    };
    vm.changeToSignUp = function(){
        $uibModalInstance.close();
        $uibModal.open({
            animation: true,
            templateUrl: 'views/includes/signUp.html',
            controller: 'SignController',
            controllerAs:'auth'
        });
    };
    vm.signUp = function(register){
        userService.signUp(register).success(function(json) {
            alert('注册成功，确定跳转到使用页');
            $location.path("/app/dashboard");
            console.log('success');
            console.log(json);

        }).error(function(status, data) {
            alert('由于故障，注册失败，请重试');
            console.log('failed');
            console.log(status);
            console.log(data);
        });

    };
    vm.signIn = function(credentials) {
        userService.signIn(credentials).success(function(json) {
                $uibModalInstance.close();
                authenticationService.updatetoken(json.token);
                authenticationService.login();
                authenticationService.userinfo.username = json.username;
                $window.sessionStorage.token = json.token;//H5本地session储存
                $location.path("/app/dashboard");

        }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
    };

}
