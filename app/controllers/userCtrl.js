/**
 * Created by Administrator on 2016/3/15 0015.
 */
var mongooser = require('mongoose');
var User = require('../models/user');

// signup
exports.showRegister = function(req, res) {
    res.render('register', {
        title: '注册页面'
    })
};

exports.showLogin = function(req, res) {
    res.render('login', {
        title: '登录页面'
    })
};
exports.login = function(req, res) {
    var _user = req.body.user;
    var username = _user.username;
    var password = _user.password;
    console.log('test:login--'+name);
    User.findOne({username: username}, function(err, user) {
        if (err) {
            console.log(err)
        }

        if (!user) {
            return res.redirect('/register')
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err)
            }

            if (isMatch) {
                req.session.user = user
                console.log('test:loginSuccess--');
                return res.redirect('/')
            }
            else {
                return res.redirect('/register')
            }
        })
    })
};
exports.register = function(req, res) {
    var _user = req.body.user;
    User.findOne({username: _user.username},  function(err, user) {
        if (err) {
            console.log(err)
        }

        if (user) {
            return res.redirect('/register')
        }
        else {
            user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/login')
            })
        }
    })
};


exports.loginRequired = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/login')
    }
    next();
};