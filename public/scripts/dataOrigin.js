/**
 * Created by codecosine on 2016/5/4.
 */

angular
    .module('app.dataOrigin',['angularFileUpload']);
angular
    .module('app.dataOrigin')
    .controller('DataBaseSet',DataBaseSet);
DataBaseSet.$inject = ['FileUploader','authenticationService','dataDealService','originSetting'];


/**
 * 导入数据源
 * 数据源数据清洗
 *
 * @constructor
 */
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
angular
    .module('app.dataOrigin')
    .factory('originSetting', originSetting);
function originSetting() {
    var localSetting = {};
    return {
        setSettings:function(settings){
            localSetting = settings;
        },
        getSettings: function(){
            return localSetting;
        }
    }
}

angular
    .module('app.dataOrigin')
    .factory('dataDealService', dataDealService);
dataDealService.$inject = ['$http','$q'];
function dataDealService($http,$q) {
    var data = [];
    return {
        mysql:function(settings){
            return $http.post('/mysql',settings);
        },
        mysqlTest:function(settings){
            return $http.post('/mysqlTest',settings);
        },
        xlsx:function(settings){
            return $http.post('/xlsx',settings);
        },
        getTypeName :function(){
            if(!data[0]){
                throw new Error();
            }
            var typeNames = Object.keys(data[0]);
            typeNames = typeNames.map(function(ele){
                var obj = {};
                obj.data = ele;
                obj.title = ele;
                obj.readOnly = false;
                return obj;
            });
            return typeNames;        },

        importData :function(originSetting){
            return $q(function(resolve, reject) {
                if(originSetting.type == 'json'){
                    data = originSetting.json;
                    resolve('Hello, ' + name + '!');
                }
                if(originSetting.type = 'excel'){
                    $http.post('/xlsx',originSetting['excel']).then(function(res){
                        console.log('xlsx return')
                        data = res.data;
                        resolve('Hello');
                    },function(err){
                        reject('Greeting ' + err + ' is not allowed.');
                    })
                }
            });

        },
        getData:function(dimensions){
           var result = data.map(function(ele){
                var obj = [];
                dimensions.forEach(function(type){
                    obj.push(ele[type.data]);
                });
                return obj;
            });
            return result;
        }
    };
}
