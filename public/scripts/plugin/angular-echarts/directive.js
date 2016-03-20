/**
 * @Cosine
 * 2016-3-20 11:35:14
 */
angular.module('angular-echarts', [])
    .directive('echarts',function () {
        var directive = {
            link : link,
            restrict :'EA',
            template:'<div></div>',
            scope:{
                config: '=config',
                data: '=data'
            }
        };
        return directive;
        function link(scope, element, attrs) {
            /**
             * 变量声明
             */
            var echartsInstance;
            var charttype = 'bar';
            var div = initDiv(scope.config);
            var option = getOptions(scope.data,scope.config,charttype);
            echartsInstance = echarts.init(div);
            echartsInstance.setOption(option);

            // update when charts config changes
             scope.$watch(function () { return scope.config; }, function (value) {
                 if (value) {
                     option = getOptions(scope.data,scope.config,charttype);
                     echartsInstance.setOption(option);
                 }
             }, true);
            scope.$watch(function () { return scope.data; }, function (value) {
                if (value) {
                    option = getOptions(scope.data,scope.config,charttype);
                    echartsInstance.setOption(option);
                }
            }, true);


            /**
             * 初始化 echarts图表需要的容器
             * @param config
             * @returns {*}
             */
            function initDiv(config) {
                var ndWrapper  = element.find('div')[0],
                    ndParent = element.parent()[0],
                    parentWidth = ndParent.clientWidth,
                    parentHeight = ndParent.clientHeight,
                    width, height;
                width = config.width || parseInt(attrs.width) || parentWidth || 700;
                height = config.height || parseInt(attrs.height) || parentHeight || 400;
                ndWrapper.style.width = width + 'px';
                ndWrapper.style.height = height + 'px';
                return ndWrapper;
            }

            /**
             * 根据不同的图表生成不同的option
             * @param data
             * @param config
             * @param type
             * @returns {{title: *, tooltip: *, legend: *, toolbox: *, xAxis: *[], yAxis: *[], series: *}}
             */
            function getOptions(data,config,type){
                return data;
            }
          /*  function getOptions(data, config, type) {
                // merge default config
                config = angular.extend({
                    showXAxis: true,
                    showYAxis: true,
                    showLegend: true
                }, config);

                var xAxis = angular.extend({
                    orient: 'top',
                    axisLine: { show: false }
                }, angular.isObject(config.xAxis) ? config.xAxis : {});

                var yAxis = angular.extend({
                    type: 'value',
                    orient: 'right',
                    scale: false,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: function (v) {
                            return util.formatKMBT(v);
                        }
                    }
                }, angular.isObject(config.yAxis) ? config.yAxis : {});

                // basic config
                var options = {
                    title: util.getTitle(data, config, type),
                    tooltip: util.getTooltip(data, config, type),
                    legend: util.getLegend(data, config, type),
                    toolbox: angular.extend({ show: false }, angular.isObject(config.toolbox) ? config.toolbox : {}),
                    xAxis: [ angular.extend(xAxis, util.getAxisTicks(data, config, type)) ],
                    yAxis: [ yAxis ],
                    series: util.getSeries(data, config, type)
                };

                if (!config.showXAxis) {
                    angular.forEach(options.xAxis, function (axis) {
                        axis.axisLine = { show: false };
                        axis.axisLabel = { show: false };
                        axis.axisTick = { show: false };
                    });
                }

                if (!config.showYAxis) {
                    angular.forEach(options.yAxis, function (axis) {
                        axis.axisLine = { show: false };
                        axis.axisLabel = { show: false };
                        axis.axisTick = { show: false };
                    });
                }

                if (!config.showLegend || type === 'gauge' || type === 'map') {
                    delete options.legend;
                }

                if (!util.isAxisChart(type)) {
                    delete options.xAxis;
                    delete options.yAxis;
                }

                if (config.dataZoom) {
                    options.dataZoom = angular.extend({
                        show : true,
                        realtime : true
                    }, config.dataZoom);
                }

                if (config.dataRange) {
                    options.dataRange = angular.extend({}, config.dataRange);
                }

                if (config.polar) {
                    options.polar = config.polar;
                }

                return options;
            }*/
        }
    });

/**=========================================================
 * Module: sparkline.js
 * SparkLines Mini Charts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('angular-echarts')
        .directive('sparkline', sparkline);

    function sparkline () {
        var directive = {
            restrict: 'EA',
            scope: {
                'sparkline': '='
            },
            controller: Controller
        };
        return directive;

    }
    Controller.$inject = ['$scope', '$element', '$timeout', '$window'];
    function Controller($scope, $element, $timeout, $window) {
        var runSL = function(){
            initSparLine();
        };

        $timeout(runSL);

        function initSparLine() {
            var options = $scope.sparkline,
                data = $element.data();

            if(!options) // if no scope options, try with data attributes
                options = data;
            else
            if(data) // data attributes overrides scope options
                options = angular.extend({}, options, data);

            options.type = options.type || 'bar'; // default chart is bar
            options.disableHiddenCheck = true;

            $element.sparkline('html', options);

            if(options.resize) {
                $($window).resize(function(){
                    $element.sparkline('html', options);
                });
            }
        }

    }


})();