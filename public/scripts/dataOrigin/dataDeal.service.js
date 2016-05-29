/**
 * Created by codecosine on 2016/5/28.
 */
(function(){
    'use strict';
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
                            data = res.data;
                            resolve('xlsx deal success');
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

})();