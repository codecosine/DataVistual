/**
 * Created by codecosine on 2016/2/2.
 */
angular
    .module('app.chartModule',[
     'angular-echarts',
    'ui.bootstrap'
]);
angular
    .module('app.chartModule')
    .controller('ChartsManager',ChartsManager);
function ChartsManager() {
    var vm = this;
    vm.data = {
        legend: {
            data: ['销量']
        },
        xAxis: [
            {
                type: 'category',
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                "name": "销量",
                "type": "bar",
                "data": [5, 20, 40, 10, 10, 20]
            }
        ]
    };
    vm.config = {
        title: 'Line Chart',
        subtitle: 'Subtitle',
        debug: true,
        showXAxis: true,
        showYAxis: true,
        showLegend: true,
        stack: false
    };
}

