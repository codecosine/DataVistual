/**
 * Created by codecosine on 2016/5/29.
 */
(function(){
    'use strict';

    angular
        .module('angular-echarts')
        .factory('echartService', echartService);

    echartService.$inject = ['echartsOptionsService'];

    function echartService(echartsOptionsService) {
        var $echartsInstancePools = {};
        function get(instanceId){
            if($echartsInstancePools[instanceId]){
                return $echartsInstancePools[instanceId]
            }else{
                return {};
            }
        }
        function getInstanceId(){
            return Object.keys($echartsInstancePools);
        }
        function push(instance,id){
            if(instance){
                if(id){
                    $echartsInstancePools[id] = instance;

                }else{
                    $echartsInstancePools[instance.id] = instance;

                }
            }
        }

        function render(id ,option,merge){
            if(id && option){
                get(id).setOption(option,merge);
            }else{
                throw new error();
            }
        }
        function dispose(id){
            get(id).dispose();
        }
        function clear(id){
            get(id).clear();
        }
        function resize(id){
            get(id).resize();
        }
        function getInstanceOption(id){
            return get(id).getOption();
        }

        function generateOption(optionParmas){
            return echartsOptionsService.getOption(optionParmas);
        }
        return {
            get:get,
            push:push,
            getInstanceId:getInstanceId,
            getInstanceOption:getInstanceOption,
            generateOption:generateOption,
            render:render,
            resize:resize,
            dispose:dispose,
            clear:clear
        };
    }

})();
