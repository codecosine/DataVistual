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