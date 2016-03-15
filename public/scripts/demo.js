/**
 * Created by codec on 2016/2/2.
 */
angular.module('Demo', ['ngEcharts'])
    .controller('TestCtrl', ['$scope', function ($scope) {

        $scope.textOption =JSON.stringify({
            tooltip: {
                show: true
            },
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
        });
        $scope.$watch('textOption',function(newValue,oldValue){
            console.log('newValue');
            var option = angular.extend({},$scope.$eval(newValue));
            $scope.$echartsInstance.setOption(option);
        });
        $scope.option = {
            tooltip: {
                show: true
            },
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



        setTimeout(function () {
            console.log($scope.$echartsInstance);
        }, 5000)
    }]);