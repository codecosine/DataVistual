(function(){
    'use strict';
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

})();