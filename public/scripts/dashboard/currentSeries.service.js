/**
 * Created by codecosine on 2016/5/28.
 */
(function(){
    'use strict';
    angular
        .module('app.dashboard')
        .factory('currentSeries', currentSeries);
    function currentSeries() {
        var logged = false;
        return {
            isLogged: function(){
                return logged;
            }
        }
    }
})();