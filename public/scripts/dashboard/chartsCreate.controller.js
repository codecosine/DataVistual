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