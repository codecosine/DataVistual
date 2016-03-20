

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

            if (!scope.$echartsInstance){
                scope.$echartsInstance = {};
            }
            scope.$watch(attrs.option, function () {
                var option = scope.$eval(scope.option);
                element.addClass('chartBox');
                scope.$echartsInstance = echarts.init(element[0]);
                scope.$echartsInstance.setOption(option);
                scope.$echartsInstance.resize();
            });
        }
    });

