/**
 * Created by Administrator on 2016/3/15 0015.
 */
var mongooser = require('mongoose');
var User = require('../models/user');

exports.login = function(req, res) {
    var _user = req.body.user;
    var username = _user.username;
    var password = _user.password;
    console.log('test:login--'+username);
    User.findOne({username: username}, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.redirect('/');
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                req.session.user = user;
                console.log('session info:');
                console.log(req.session);

                console.log('test:loginSuccess--');
                return res.redirect('/home');
            }
            else {
                return res.redirect('/');
            }
        })
    })
};
exports.register = function(req, res) {
    var _user = req.body.signinUser;
    User.findOne({username: _user.username},  function(err, user) {
        if (err) {
            console.log(err)
        }
        //用户已存在
        if (user) {
            return res.redirect('/')
        }
        else {
            user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/')
            })
        }
    })
};
exports.loginRequired = function(req, res, next) {
    console.log('loginRequired中间件');
    console.log('user seesion info:');
    console.log(req.session.user);

    var user = req.session.user;
    if (!user) {
        return res.redirect('/')
    }
    next();
};