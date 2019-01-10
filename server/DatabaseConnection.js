var mysql = require('mysql');

var databaseName = "ConflictStatistics";
var pw = "";

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: pw,
    database: databaseName
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;

/*
var connection = {
    con: mysql.createConnection({
        host: "localhost",
        user: "root",
        password: pw,
        database: databaseName
    }),

    end: mysql.end()
} 
*/

//var end = con.end();

/*
module.exports = {
    con,
    end
}
*/
