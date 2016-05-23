var path = require('path');

var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');

var routes =  require('./app/config/routes');
var config = require('./app/config/database');
var authStrategy = require('./app/config/passport');
var app = express();

var mongoose = require('mongoose');

var server = require('http').createServer(app);


mongoose.connect(config.database);


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app');
app.set('view engine', 'ejs');
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
authStrategy(passport);
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

server.listen(app.get('port'), function () {
    console.log('数字校园项目服务器启动,监听端口:' + app.get('port'));
});



