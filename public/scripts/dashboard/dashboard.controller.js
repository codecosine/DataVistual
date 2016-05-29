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

