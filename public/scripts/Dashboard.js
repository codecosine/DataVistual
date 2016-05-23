/**
 * Created by codecosine on 2016/3/28.
 */
/**
 * Created by codecosine on 2016/2/2.
 * 图表工作区的核心板块
 */
angular
    .module('app.dashboard',[
        'angular-echarts',
        'ui.bootstrap',
        'rzModule',
        'ui.select',
        'ngHandsontable'
    ]);


angular
    .module('app.dashboard')
    .controller('ChartsCreate',ChartsCreate);
angular
    .module('app.dashboard')
    .controller('DashBoardCtrl',DashBoardCtrl);

angular
    .module('app.dashboard')
    .factory('currentSeries', currentSeries);
function currentSeries() {
    var logged = false;
    var token = '';
    return {
        isLogged: function(){
            return logged;
        }
    }
}



DashBoardCtrl.$inject = ['$scope','$timeout','echartService'];
function DashBoardCtrl($scope,$timeout,echartService) {
    var timeout='';
    var vm = this;
    vm.active = 1;
    vm.showpanel = function(index){
        return index==vm.active;
    };
    vm.pageElement = {
        menuShow:false,
        excelShow:false,
        toolbarShow:true,
        editShow:false,
        enewShow:false,
        projectShow:false
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
 //   vm.htmlTooltip = $sce.trustAsHtml('<li><p>数值轴,适用于连续数据。</p> </li><li><p>类目轴,适用于离散的类目数据</p></li><li><p>时间轴,适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。</p></li><li><p>对数轴,适用于对数数据。</p></li> ');
    vm.chartWidthOption = {
            floor: 600,
            ceil: 2000,
            showTicks: 200
    };
    vm.chartWidth = 1000;
    vm.cosine = function(){
        var a = {series:[
            {
                name:'蒸发量',
                type:'bar',
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
            },
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint : {
                    data : [
                        {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                        {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]

       };

        echartService.render('cosine',a);
    };

    vm.baseStyle = {
        title :{
            text:''
        }
    };
    vm.Axis = {
        xAxis : [
            {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ]
    };

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
        console.log('createChart');
        console.log(data);
        var option = echartService.generateOption(data);
        console.log(option);
        echartService.render('cosine',option);
    });


}


ChartsCreate.$inject = ['$scope','dataDealService','originSetting'];
function ChartsCreate($scope,dataDealService,originSetting){
    var vm = this;
    vm.typeArray = [
        {id: 1, name: '柱状图',value:'bar',imageUrl:'img/gallery/bar1.png'},
        {id: 2, name: '折线图',value:'line',imageUrl:'img/gallery/dynamic-data2.png'},
        {id: 3, name: '散点图',value:'scatter',imageUrl:'img/gallery/scatter-weight.png'},
        {id: 4, name: '饼图',value:'pie',imageUrl:'img/gallery/pie-nest.png'},
        {id: 5, name: '雷达图',value:'radar',imageUrl:'img/gallery/radar-aqi.png'},
        {id: 6, name: '热力图',value:'heatmap',imageUrl:'img/gallery/bar1.png'},
        {id: 7, name: '矩形图',value:'treemap',imageUrl:'img/gallery/treemap-disk.png'},
        {id: 8, name: '中国地图',value:'map',imageUrl:'img/gallery/map-china-dataRange.png'}
    ];
    vm.typeValue = vm.typeArray[0];
    vm.dataTypeList = [
        { data: '数据属性名1', title: '数据属性名1',readOnly: 'false' },
        { data: '数据属性名2', title: '数据属性名1',readOnly: 'false' },
        { data: '数据属性名3', title: '数据属性名1',readOnly: 'false' },
        { data: '数据属性名4', title: '数据属性名1',readOnly: 'false' }

    ];
    vm.typeForm = {
        typeName:'数据分类名',
        chartType:vm.typeArray[0].value,
        selectTypes:[]
    };

    vm.serise = [];
    vm.createType = function(typeForm){
        var data = dataDealService.getData(typeForm.selectTypes);
        var seriesObj = {};
        seriesObj.name = typeForm.typeName;
        seriesObj.type = vm.typeValue.value;
        seriesObj.data = data;
        vm.serise.push(seriesObj);
    };
    vm.importOrigin = function(){
        var promise = dataDealService.importData(originSetting.getSettings());
        promise.then(function(res) {
            console.log('promise');
            console.log(res);

            vm.dataTypeList = dataDealService.getTypeName();

        }, function(reason) {
            alert('Failed: ' + reason);
        });
    };

    vm.createChart = function(){
        $scope.$emit('createChart',vm.serise);
    }

}