/**
 * Created by Administrator on 2016/3/14 0014.
 */
  //  User = require('../models/user.js');

var Index = require('../controllers/indexCtrl');
var User = require('../controllers/userCtrl');
var Connecter = require('../cotrollers/dbconnectCtrl');
module.exports = function(app) {
    app.get('/',Index.welcome);
    app.get('/test',Index.home);
    app.get('/home',User.loginRequired,Index.home);
    app.post('/login',User.login);
    app.post('/register',User.register);


    app.post('/mysqlconnect',User.loginRequired,Connecter.mysqlconnect);



};
