/**
 * Created by Administrator on 2016/3/21 0021.
 */
var mysql = require('mysql');


exports.mysqlconnect = function(req, res) {
    var config = req.body.config;
    var connection = mysql.createConnection(config);

    /*  var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'me',
        password : 'secret',
        database : 'my_db'
    });*/

    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;

        console.log('The solution is: ', rows[0].solution);
    });

    connection.end();
};
