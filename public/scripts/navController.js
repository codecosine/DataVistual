/**
 * Created by xueyou2 on 2016/2/15.
 */
angular.module('app.navModule',[]);

angular
    .module('app.navModule')
    .controller('navController',navController);
function navController(){
    var vm = this;
    vm.brandName = '广工数字校园';
    vm.linkName_1 = '首页';
    vm.linkName_2 = '快速入门';
    vm.linkName_3 = '数据处理';
    vm.linkName_4 = '数据展示';
    vm.linkName_5 = '我的账户';

}
