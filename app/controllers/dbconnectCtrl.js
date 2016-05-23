/**
 * Created by Administrator on 2016/3/21 0021.
 */
var mysql = require('mysql');
var mongoose = require('mongoose');
var Action = require('../models/user_action');

var config = {
    'database': 'recommend',
    'host':'202.116.148.193',
    'port':'27017'
};


exports.actionTest = function(req,res){

    mongoose.connect(config);
    var Action = new Action();
    Action.find({user_id:101781721},function(err,actions){
        if(err) return console.err(err);

        console.log(actions);
        res.json(actions);
    })

};


exports.mysqlTest = function(req, res) {
    console.log('mysqlconnect');
    var config = req.body.config;
    console.log(config);
    var connection = mysql.createConnection(config);
    connection.connect();
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
    });
    connection.end();
    res.json({success:true,msg:'连接成功'});
};
