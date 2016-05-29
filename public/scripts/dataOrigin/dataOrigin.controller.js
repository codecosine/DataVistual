(function(){
    'use strict';

    angular
        .module('app.dataOrigin')
        .controller('DataBaseSet',DataBaseSet);
    DataBaseSet.$inject = ['FileUploader','authenticationService','dataDealService','originSetting'];
    function DataBaseSet(FileUploader,authenticationService,dataDealService,originSetting){
        var vm = this;
        vm.databaseSetting = {
            type:'',
            'mysql':{},
            'excel':{
                paths:[]
            },
            'json':{}
        };
        vm.mysqlSetting= {
            host:'',
            port:'',
            database:'',
            user:'',
            password:''
        };
        vm.jsonArea = "请在此处粘贴导入的JSON文本";
        vm.jsonSure = function(){
            var obj = JSON.parse(vm.jsonArea);
            vm.databaseSetting.json = obj;
        };
        vm.mysqlTest = function(settings){
            vm.pageElement.mysqlTestSuccess = false;
            vm.pageElement.mysqlTestFail = false;
            dataDealService.mysqlTest(settings).then(function(res){
                if(res.data.success){
                    vm.databaseSetting.mysql = vm.mysqlSetting;
                    vm.pageElement.mysqlTestSuccess = true;
                }
            },function(err){
                vm.pageElement.mysqlTestFail = true;
                if(err){
                    throw err;
                }
            });
        };
        vm.saveSetting = function (type) {
            vm.databaseSetting.type = type;
            originSetting.setSettings(vm.databaseSetting);
        };
        vm.pageElement = {
            mysqlTestSuccess:false,
            mysqlTestFail:false,
            jsonTestFail:false,
            jsonTestSuccess:false
        };
        var connectOrigins = ['mysql','excel','json'];
        vm.show = function(index){
            return connectOrigins[index]===vm.origin;
        };
        vm.origin = connectOrigins[0];
        vm.select = function(index){
            vm.origin = connectOrigins[index];
        };
        vm.xlsxUploader = new FileUploader({
            url: '/uploadXlsx',
            headers:{
                Authorization : authenticationService.token()
            }
        });
        vm.UploadItem = {
            onSuccess:function(res){
                if(res.success){
                    var setting = {};
                    setting.name = res.name;
                    setting.path = res.path;
                    vm.databaseSetting.excel.paths.push(setting);
                }
            }
        };
    }

})();
