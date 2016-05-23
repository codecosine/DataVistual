/**
 * Created by Administrator on 2016/3/15 0015.
 */

var User = require('../models/user');
var config = require("../config/database");
var jwt = require('jsonwebtoken');

exports.signin = function(req,res){
    var _username = req.body.username;
    var _password = req.body.password;
    User.findOne({
        username: _username
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            return res.redirect('/');
        } else {
            user.comparePassword(_password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user, config.secret,{ expiresIn: 3600 });
                    res.json({success: true, username:_username,token:"JWT "+ token});

                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
};
exports.signup = function(req,res){
    var _username = req.body.username;
    var _password = req.body.password;
    var _user = {
        username : _username,
        password : _password
    };
    User.findOne({username: _username
    },  function(err, user) {
        if (err) {throw err; }
        if (user) {
            res.json({success: false, msg: '用户名已经存在，注册失败.'});
        } else {
            user = new User(_user);
            user.save(function(err) {
                if (err) {   console.log(err)   }
                res.json({success: true, msg: '注册成功.'});
            })
        }
    })
};

