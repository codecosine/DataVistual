/**
 * Created by codecosine on 2016/5/28.
 */
(function(){
    'use strict';
    angular
        .module('app.dataOrigin')
        .factory('originSetting', originSetting);
    function originSetting() {
        var localSetting = {};
        return {
            setSettings:function(settings){
                localSetting = settings;
            },
            getSettings: function(){
                return localSetting;
            }
        }
    }
})();