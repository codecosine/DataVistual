/**
 * Created by Administrator on 2016/3/14 0014.
 */
var path = require('path');
var mongoose = require('mongoose');
var User = require('../controllers/userCtrl');
var passport = require('passport');
var Connecter = require('../controllers/dbconnectCtrl');
var XLSX = require('../controllers/xlsxCtrl');
module.exports = function(app) {
    app.get('/',function(req,res){
        res.render('app');
    });
    app.post('/signin',User.signin);
    app.post('/signup',User.signup);

    app.post('/isLoged',
        passport.authenticate('jwt',{session: false}),
        function(req,res){
        console.log(req.user);
        res.json({success:true,username: req.user.username});

    });
    app.post('/cosine',Connecter.actionTest);

    app.get('/mysqlTest',passport.authenticate('jwt',{session: false}),Connecter.mysqlTest);

    app.post('/uploadXlsx',passport.authenticate('jwt',{session: false}),XLSX.uploadXlsx);
    app.post('/xlsx',passport.authenticate('jwt',{session: false}),XLSX.xlsx);


};
