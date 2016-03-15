var express = require('express')
    , path = require('path')
    , ejs = require('ejs')
    , app = express()
    , routes = require('./app/routes/index')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , moogoose = require('mongoose')
    , dburl = 'mongodb://localhost/datavistual'
    , server = require('http').createServer(app);


moogoose.connect(dburl);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
routes(app);

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});



