var mysql = require('mysql');

const databaseName = "ConflictStatistics";
const host = "localhost";
const user = "root";
const password = "";

var con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: databaseName
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;

