
angular.module('cos.plugin', [])
    .directive('echarts',function () {
        var directive = {
            link : link,
            restrict :'AE',
            scope:{
                option:'@',
            }
        };
        return directive;
        function link(scope, element, attrs) {
            console.log('echart-link~');
            console.log(scope);
            if (!scope.$echartsInstance){
                scope.$echartsInstance = {};
            }
            scope.$watch(attrs.option, function () {
                var option = scope.$eval(scope.option);
                element.addClass('chartBox');
                console.log('echarts');
                console.log(option);
                scope.$echartsInstance = echarts.init(element[0]);
                console.log(scope.$echartsInstance);
                scope.$echartsInstance.setOption(option);
            });
        }
    })
    .directive('acharts',function () {
        var directive = {
            link : link,
            restrict :'AE',
            scope:{
                option:'@'
            }
        };
        return directive;
        function link(scope, element, attrs) {
            console.log('achart-link~');
            console.log(scope);
            element.addClass('chartBox');
            if (!scope.$echartsInstance){
                scope.$echartsInstance = {};
            }
            scope.$watch(attrs.option, function () {
                console.log('watch');
            });
            var option = scope.$eval(scope.option);
            scope.$echartsInstance = echarts.init(element[0]);
            scope.$echartsInstance.setOption(option);

        }
    })
