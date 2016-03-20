/**
 * Created by Administrator on 2016/3/21 0021.
 */
exports.xlsx = function(req, res) {
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
exports.upload = function(req, res) {
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