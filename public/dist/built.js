(function(){
    'use strict';

    angular
        .module('app', [
            'app.routes',
            'app.auth',
            'app.dataOrigin',
            'app.dashboard'
        ]);

})();

(function(){
    'use strict';

    angular
        .module('app.auth',[]);
})();

(function(){
    'use strict';

    angular
        .module('app.dashboard',[
            'angular-echarts',
            'ui.bootstrap',
            'rzModule',
            'ui.select',
            'ngHandsontable'
        ]);
})();

(function(){
    'use strict';

    angular
        .module('app.dataOrigin',['angularFileUpload']);
})();




(function(){
    'use strict';

    angular.module('app.routes',[
        'ui.router'
    ]);
    angular.module('app.routes')
        .controller('localController',localController);
    localController.$inject = ['$state','$stateParams','$scope','$window','$location','authenticationService','$uibModal'];
    function localController($state, $stateParams,$scope,$window,$location,authenticationService,$uibModal){
        $scope.$on('$stateChangeStart', function (event, nextRoute) {
            var option = {
                requiredLogin:nextRoute.access.requiredLogin,
                loged:$scope.isLogged(),
                localtoken:$window.sessionStorage.token,
                servicetoken:authenticationService.token(),
                userinfo:authenticationService.userinfo
            };
            console.log(option);
            //redirect only if both isLogged is false and no token is set
            if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredLogin
                && !$scope.isLogged()) {
                console.log('你没有权限访问这个页面，请登录后重试');
                $location.path("/welcome");
            }
        });
        $scope.$state = $state;
        $scope.$stateParams = $stateParams;
        $scope.isLogged = authenticationService.isLogged;
        $scope.userinfo = authenticationService.userinfo;
        $scope.signin = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/includes/signIn.html',
                controller: 'SignController',
                controllerAs:'auth'
            });
        };
        $scope.signup = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/includes/signUp.html',
                controller: 'SignController',
                controllerAs:'auth'
            });
        };
        $scope.shortcut = function(){
            if($scope.isLogged()){
                $location.path("/app/dashboard");
            }else {
                $scope.signin();
            }
        }
        $scope.logout = function(){
            authenticationService.logout();
        };


    }

    angular.module('app.routes')
        .config(routesConfig);
    routesConfig.$inject = ['$httpProvider','$stateProvider', '$urlRouterProvider'];
    function routesConfig($httpProvider,$stateProvider, $urlRouterProvider){
        $httpProvider.interceptors.push('tokenInterceptor');
        $urlRouterProvider.otherwise('/welcome');
        $stateProvider
            .state('welcome', {
                url: '/welcome',
                views: {
                    '': {
                        templateUrl: 'views/includes/base.html'
                    },
                    'main@welcome':{
                        templateUrl:'views/pages/welcome.html'
                    }
                },
                access: { requiredLogin: false }

            })
            .state('app', {
                url: '/app',
                views: {
                    '': {
                        templateUrl: 'views/includes/base.html'
                    }
                },
                access: { requiredLogin: true }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'main@app':{
                        templateUrl:'views/pages/dashBoard.html'
                    }
                },
                access: { requiredLogin: true }
            })
    }
})();


/**
 * Created by codecosine on 2016/5/6.
 */
/**
 * @Cosine
 * 2016-3-20 11:35:14
 */
(function(){
    'use strict';

    angular
        .module('angular-echarts', []);
    angular
        .module('angular-echarts')
        .directive('echarts',echartsDirective);
    echartsDirective.$inject = ['echartService'];
    function echartsDirective(echartService) {
        var directive = {
            link: link,
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                option:'='
            }
        };
        return directive;
        function link(scope, element, attrs) {
            /**
             * 变量声明
             */
            var echartsInstance;
            var div = initDiv();
            echartsInstance = echarts.init(div);
            if(scope.option){
                echartsInstance.setOption(scope.option);
            }
            echartService.push(echartsInstance,attrs.chartid);
            function initDiv() {
                var ndParent = element.parent()[0],
                    parentWidth = ndParent.clientWidth,
                    parentHeight = ndParent.clientHeight,
                    width, height;
                width = parseInt(attrs.width) || parentWidth || 700;
                height = parseInt(attrs.height) || parentHeight || 400;
                ndParent.style.width = width + 'px';
                ndParent.style.height = height + 'px';
                return ndParent;
            }

        }

    }
})();




/**
 * Created by codecosine on 2016/5/29.
 */
(function(){
    'use strict';

    angular
        .module('angular-echarts')
        .factory('echartService', echartService);

    echartService.$inject = ['echartsOptionsService'];

    function echartService(echartsOptionsService) {
        var $echartsInstancePools = {};
        function get(instanceId){
            if($echartsInstancePools[instanceId]){
                return $echartsInstancePools[instanceId]
            }else{
                return {};
            }
        }
        function getInstanceId(){
            return Object.keys($echartsInstancePools);
        }
        function push(instance,id){
            if(instance){
                if(id){
                    $echartsInstancePools[id] = instance;

                }else{
                    $echartsInstancePools[instance.id] = instance;

                }
            }
        }

        function render(id ,option,merge){
            if(id && option){
                get(id).setOption(option,merge);
            }else{
                throw new error();
            }
        }
        function dispose(id){
            get(id).dispose();
        }
        function clear(id){
            get(id).clear();
        }
        function resize(id){
            get(id).resize();
        }
        function getInstanceOption(id){
            return get(id).getOption();
        }

        function generateOption(optionParmas){
            return echartsOptionsService.getOption(optionParmas);
        }
        return {
            get:get,
            push:push,
            getInstanceId:getInstanceId,
            getInstanceOption:getInstanceOption,
            generateOption:generateOption,
            render:render,
            resize:resize,
            dispose:dispose,
            clear:clear
        };
    }

})();

/**
 * Created by codecosine on 2016/5/29.
 */
(function(){
    'use strict';

    angular
        .module('angular-echarts')
        .factory('echartsOptionsService', echartsOptionsService);



    function echartsOptionsService(){
        var chartOptions = {
            'parallel':{
                backgroundColor: '#333',
                legend: {
                    bottom: 30,
                    data: [],
                    itemGap: 20,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    }
                },
                parallelAxis: [
                ],
                parallel: {
                    left: '5%',
                    right: '18%',
                    bottom: 100,
                    parallelAxisDefault: {
                        type: 'value',
                        name: '平行轴',
                        nameLocation: 'end',
                        nameGap: 20,
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 12
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#aaa'
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#777'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                series: [
                    {
                        type: 'parallel',
                        lineStyle: {
                            normal: {
                                width: 1,
                                opacity: 0.5
                            }
                        }
                    }
                ]
            },
            'scatter': {
                legend: {
                    data: [],
                    left: 'right'
                },
                xAxis : [
                    {
                        type : 'value',
                        scale:true
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        scale:true
                    }
                ],
                series : [
                    {
                        type:'scatter',
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    }

                ]

            },
            'bar': {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:[]
                },
                xAxis: [
                    {
                        type: 'category',
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        type:'bar'
                    }
                ]
            }

        };
        var formater = {
            'bar':function(){

            },
            'line':function(){

            },
            'scatter':function(){

            },
            'parallel':function(optionParmas){
                var dismension =  optionParmas[0].dismension;
                dismension = dismension.map(function(ele,index){
                    var obj = {};
                    obj.dim = index;
                    obj.name = ele;
                    return obj;
                });
                console.log(dismension);
                this.parallelAxis = dismension;

            }
        };
        /**
         * 参数说明,和原生的series格式类似
         * @param optionParmas 数组类型
         * [{
     *     name:'若是图表数据，则填写对应的数据系列名',
     *     axis:'若是坐标轴数据，则填写坐标轴属性名，否则不填',
     *     type:'填写是何种图表类型,或者坐标轴类型'
     *     data:'系列数据',//参考图表和坐标轴数据格式
     *     dismension:['数据列名','数据列名']//指明数组数据对应的数据列名
     * }]
         */

        function getOption(optionParmas) {
            var chartType = optionParmas[0].type;
            var option = angular.extend({}, chartOptions[chartType]);
            var seriesNames = optionParmas.map(function(ele){
                return ele.name;
            });
            var series = [];
            optionParmas.forEach(function(ele){
                if(!ele.axis){
                    var seriesStyle = angular.extend({}, option.series[0]);
                    seriesStyle.name = ele.name;
                    seriesStyle.data = ele.data;
                    seriesStyle.type = ele.type;
                    series.push(seriesStyle);
                }else {
                    console.log('坐标轴设置');
                    console.log(ele);
                    console.log(option);
                    console.log(option);
                    if(option[ele.axis]){
                        option[ele.axis].data = ele.data;
                        option[ele.axis].name = ele.name;
                        option[ele.axis].type = ele.type;

                    }else {
                        throw new Error('当前图表类型不支持这种坐标轴');
                    }
                }

            });
            option.legend.data = seriesNames;
            option.series = series;
            formater[chartType].call(option,optionParmas);
            return option;
        }

        return {
            getOption:getOption
        };
    }
})();
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
/**
 * Created by codecosine on 2016/5/28.
 */
(function(){
    'use strict';
    angular
        .module('app.dashboard')
        .controller('ChartsCreate',ChartsCreate);

    ChartsCreate.$inject = ['$scope','dataDealService','originSetting'];
    function ChartsCreate($scope,dataDealService,originSetting){
        var vm = this;
        vm.active = 1;
        vm.step = 1;
        vm.step_2 = function(chartId){
            vm.chartType = vm.chartTypeArray[chartId];
            vm.step = 2;
        };
        vm.typeBar = [
            {index: 1, name: '散点图'},
            {index: 2, name: '折线图'},
            {index: 3, name: '柱状图'},
            {index: 4, name: '饼图'},
            {index: 5, name: '平行坐标'},
            {index: 6, name: '热力图'},
            {index: 7, name: '矩形图'},
            {index: 8, name: '雷达图'},
            {index: 9, name: '地图'}
        ];
        vm.chartTypeArray = [
            {id:0,index: 1, name: '标准散点图',value:'scatter',imageUrl:'img/gallery/scatter-weight.png',src:'views/includes/scatter.html'},
            {id:1,index: 2, name: '标准折线图',value:'line',imageUrl:'img/gallery/dynamic-data2.png',src:'views/includes/line.html'},
            {id:2,index: 3, name: '标准柱状图',value:'bar',imageUrl:'img/gallery/bar1.png',src:'views/includes/bar.html'},
            {id:3,index: 4, name: '标准饼图',value:'pie',imageUrl:'img/gallery/pie-nest.png',src:'views/includes/pie.html'},
            {id:4,index: 5, name: '平行坐标系',value:'parallel',imageUrl:'img/gallery/parallel-aqi.png',src:'views/includes/parallel-aqi.html'},
            {id:5,index: 6, name: '热力图',value:'heatmap',imageUrl:'img/gallery/bar1.png',src:'views/includes/heatmap.html'},
            {id:6,index: 7, name: '矩形图',value:'treemap',imageUrl:'img/gallery/treemap-disk.png',src:'views/includes/treemap.html'},
            {id:7,index: 8, name: '雷达图',value:'radar',imageUrl:'img/gallery/radar-aqi.png',src:'views/includes/radar.html'},
            {id:8,index: 9, name: '地图',value:'map',imageUrl:'img/gallery/map-china-dataRange.png',src:'views/includes/map.html'}
        ];
        vm.dataTypeList = [
            { data: '数据属性名1', title: '数据属性名1',readOnly: 'false' },
            { data: '数据属性名2', title: '数据属性名1',readOnly: 'false' },
            { data: '数据属性名3', title: '数据属性名1',readOnly: 'false' },
            { data: '数据属性名4', title: '数据属性名1',readOnly: 'false' }
        ];
        vm.typeForm = {
            typeName:'',
            selectTypes:[]
        };
        vm.chartType = vm.chartTypeArray[0];
        vm.serise = [];
        vm.createType = function(typeForm){
            var data = dataDealService.getData(typeForm.selectTypes);
            var seriesObj = {};
            seriesObj.name = typeForm.typeName;
            seriesObj.type = vm.chartType.value;
            seriesObj.data = data;
            vm.serise.push(seriesObj);
        };
        vm.importOrigin = function(){
            var promise = dataDealService.importData(originSetting.getSettings());
            promise.then(function() {
                console.log('promise');
                vm.dataTypeList = dataDealService.getTypeName();
            }, function(reason) {
                alert('导入数据失败：未配置数据源或其他原因：' + reason);
            });
        };
        vm.createChart = function(){
            $scope.$emit('createChart',vm.serise);
        }

    }
})();
/**
 * Created by codecosine on 2016/5/28.
 */
(function(){
    'use strict';
    angular
        .module('app.dashboard')
        .factory('currentSeries', currentSeries);
    function currentSeries() {
        var logged = false;
        return {
            isLogged: function(){
                return logged;
            }
        }
    }
})();
/**
 * Created by codecosine on 2016/3/28.
 */
/**
 * Created by codecosine on 2016/2/2.
 * 图表工作区的核心板块
 */
(function(){
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashBoardCtrl',DashBoardCtrl);
    DashBoardCtrl.$inject = ['$scope','$timeout','echartService'];
    function DashBoardCtrl($scope,$timeout,echartService) {
        var timeout='';
        var vm = this;
        vm.active = 1;
        vm.start = function(){
            vm.pageElement.menuShow = true;
            vm.active = 4;
        };
        vm.showpanel = function(index){
            return index==vm.active;
        };
        vm.pageElement = {
            menuShow:false,
            excelShow:false,
            toolbarShow:false,
            editShow:false,
            enewShow:false,
            projectShow:true
        };
        vm.themeArray = [
            {name: 'shine',value:'shine',imageUrl:'img/theme/shine.png'},
            {name: 'infographic',value:'infographic',imageUrl:'img/theme/infographic.png'},
            {name: 'dark',value:'dark',imageUrl:'img/theme/dark.png'},
            {name: 'roma',value:'roma',imageUrl:'img/theme/roma.png'},
            {name: 'vintage',value:'vintage',imageUrl:'img/theme/vintage.png'},
            {name: 'macarons',value:'macarons',imageUrl:'img/theme/macarons.png'}
        ];
        vm.AxisArray = [
            {name: '数值轴',value:'value'},
            {name: '类目轴',value:'category'},
            {name: '时间轴',value:'time'},
            {name: '对数轴',value:'log'},
        ];
        vm.chartWidthOption = {
            floor: 600,
            ceil: 2000,
            showTicks: 200
        };
        vm.chartWidth = 1000;

        vm.render = function(){
            echartService.render('cosine',vm.config);
        };
        vm.dispose = function(){
            echartService.dispose('cosine');
        };

        $scope.$watch('dash.chartWidth', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                if (timeout){
                    $timeout.cancel(timeout); //如果当前时间已经有一个timeout在开启，那么先取消掉这个开启的timeout
                }
                timeout = $timeout(function() {
                    echartService.resize('cosine');
                }, 500);
            }
        }, true);
        $scope.$watch('dash.baseStyle', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                if (timeout){
                    $timeout.cancel(timeout); //如果当前时间已经有一个timeout在开启，那么先取消掉这个开启的timeout
                }
                timeout = $timeout(function() {
                    echartService.render('cosine',newVal);
                }, 700);
            }
        }, true);

        $scope.$on('createChart',function(event,data){
            vm.pageElement.projectShow = false;
            var option = echartService.generateOption(data);
            console.log(option);
            echartService.render('cosine',option);
        });


    }


})();


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

/**
 * Created by codecosine on 2016/5/28.
 */
(function(){
    'use strict';
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
})();