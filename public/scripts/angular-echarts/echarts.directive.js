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



