/**
 * Created by Administrator on 2016/3/15 0015.
 */


//渲染angular主页？
exports.home = function (req, res) {
    //传递用户信息进首页
    res.render('app');
};
exports.welcome = function (req, res) {
    res.render('welcome');
};