var mysql = require('mysql');
var LineByLineReader = require('line-by-line');

var databaseName = "ConflictStatistics";
var fileAdrConflict = "/home/johan/studier/2dv513/assignment3/conflictstatistics/datasets/conflict.csv";
var fileAdrPopulation = "/home/johan/studier/2dv513/assignment3/conflictstatistics/datasets/population.csv";
var fileAdrReligion = "/home/johan/studier/2dv513/assignment3/conflictstatistics/datasets/religion.csv";
var fileAdrGDP = "/home/johan/studier/2dv513/assignment3/conflictstatistics/datasets/gdp.csv";


var con;
var insertCountryValues = [];
var insertMacroValues = [];
var insertConflictValues = [];


con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: databaseName
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    readCSVPopulation(fileAdrPopulation);
});

//query("set names 'utf8mb4'");

/**
 * Reads from csv file, line by line
 * Population and macro data
 * @param {String} fileAdr 
 */
function readCSVPopulation(fileAdr) {
    var lr = new LineByLineReader(fileAdr);
    
    lr.on('error', function (err) {
        console.error(err);
    });
    
    var lineIndex = 0;
    lr.on('line', function (line) {
        line = mysql_real_escape_string(line);
        var startYear = 1960;
        var lineArr = line.split("\t");

        insertCountryValues.push([
            lineArr[1],
            lineArr[0]]
        );
        lineIndex++;
        var missingData = 1;
        for(var y = 1997; y <= 2017; y++ ) {
            
            var population = 0;
            if (lineArr[y-startYear+3] <= 0){
                population = parseInt(lineArr[y-startYear+3-missingData]);
                missingData++;
            } 
            else {
                population = parseInt(lineArr[y-startYear+3]);
            }
            insertMacroValues.push([
                lineIndex,
                y,
                population,
                y]
            );
        }
        
    });

    /**
     * All lines are read, file is closed now.
     */
    lr.on('end', function () {
        insertInto(insertCountryValues, "country")
        .then((result) => {
            console.log(result);
            insertInto(insertMacroValues, "macro")
                .then((result2) => {
                    console.log(result2);
                    readCSVConflict(fileAdrConflict);
                });
        })
        .catch((error) => {
            console.log(error);
            con.end();
        });
    });

}

/**
 * Reads from csv file, line by line
 * Conflict data
 * @param {String} fileAdr 
 */
function readCSVConflict(fileAdr) {
    var lr = new LineByLineReader(fileAdr);
    
    lr.on('error', function (err) {
        console.error(err);
    });

    lr.on('line', function (line) {
        line = mysql_real_escape_string(line);
        var lineArr = line.split("\t");
        
        var country_id = null;
        for (let index = 1; index <= insertCountryValues.length; index++) {
            if (lineArr[16].toLowerCase() === insertCountryValues[index-1][1].toLowerCase()) {
                country_id = index;
            } else if (lineArr[16] === "Palestine") {
                country_id = 98;
            }
        }
        if (country_id === null) {
            console.log(lineArr[16]);
        }
        var actor1 = null;
        if (lineArr[8] !== "") actor1 = lineArr[8];
        var actor2 = null;
        if (lineArr[11] !== "") actor2 = lineArr[11];
        var associative_actor1 = null;
        if (lineArr[9] !== "") associative_actor1 = lineArr[9];
        var associative_actor2 = null;
        if (lineArr[12] !== "") associative_actor2 = lineArr[12];
        var event_type = null;
        if (lineArr[7] !== "") event_type = lineArr[7];
        var fatalities = null;
        if (lineArr[27] >= 0) fatalities = parseInt(lineArr[27]);
        var event_date;
        if (lineArr[4] !== "") event_date = new Date(lineArr[4]).toISOString().slice(0, 10);
        var location;
        if (lineArr[4] !== "") location = lineArr[20];

        insertConflictValues.push([
            country_id,
            actor1,
            actor2,
            associative_actor1,
            associative_actor2,
            event_type,
            fatalities,
            event_date,
            location
        ]
        );
    });

    /**
     * All lines are read, file is closed now.
     */
    lr.on('end', function () {
        console.log("INSERT INTO CONFLICT");
        
        var chunk = 100000;
        insertInto(insertConflictValues.slice(0, chunk), "conflict")
        .then((result) => {
            console.log(result);
            insertInto(insertConflictValues.slice(chunk, chunk*2), "conflict")
            .then((result) => {
                console.log(result);
                insertInto(insertConflictValues.slice(chunk*2, chunk*3), "conflict")
                .then((result) => {
                    console.log(result);
                    insertInto(insertConflictValues.slice(chunk*3, chunk*4), "conflict")
                    .then((result) => {
                        console.log(result);
                        insertInto(insertConflictValues.slice(chunk*4, insertConflictValues.length-1), "conflict")
                        .then((result) => {
                            console.log(result);
                            readCSVGDP(fileAdrGDP);
                        })
                    })
                })
            })
        })
        .catch((error) => {
            console.log(error);
            con.end();
        });
    });

}

/**
 * Reads from csv file, line by line
 * GDP data
 * @param {String} fileAdr 
 */
function readCSVGDP(fileAdr) {
    var lr = new LineByLineReader(fileAdr);
    lr.on('error', function (err) {
        console.error(err);
    });

    lr.on('line', function (line) {
        line = mysql_real_escape_string(line);
        
        var lineArr = line.split("\t");
        var country = lineArr[0];
        var country_id;
        var macro_year = 2017;
        var gdp;

        lr.pause();
        var selectQuery = 'SELECT country_id FROM country WHERE country_name="' + country + '"';
         
        con.query(selectQuery, function (error, result, rows, fields) {
            if (error) console.log(error);

            country_id = result[0].country_id;
            // Every line of data is 62 elements, where last index represents year 2017.
            for(var i = 61; i > 40; i--) {
                if (lineArr[i] === "") {
                    gdp = 0;
                } else {
                    gdp = parseInt(lineArr[i]);
                }
                
                var updateQuery = 'UPDATE macro SET gdp = "' + gdp + '" WHERE country_id="' + country_id + '" AND macro_year="' + macro_year + '"';
            
                con.query(updateQuery, function (error, result, rows, fields) {
                    if (error) {
                        console.log(error);
                    }
                });

                macro_year--;
            }
            lr.resume();
        });
        
    });

    lr.on('end', function () {
        console.log("INSERT INTO GDP MACRO");
        con.end();
    });

}

/**
 * Insert into table.
 * @param {Array} values 
 */
function insertInto(values, tableName) {
    var sql;
    switch (tableName) {
        case "conflict":
            sql = "INSERT INTO conflict (country_id, actor1, actor2, associative_actor1, associative_actor2, event_type, fatalities, conflict_date, location) VALUES ?";   
            break;
        case "country":
            sql = "INSERT INTO country (country_code, country_name) VALUES ?";
            break;
        case "macro":
            sql = "INSERT INTO macro (country_id, gdp, population, macro_year) VALUES ?";
            break;
        default:
            break;
    }
    
    return new Promise((resolve) => {
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
    
}

/**
 * Query the database connected to.
 * @param {String} sql 
 */
function query(sql) {
    return new Promise((resolve) => {
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            resolve(result, fields);
        });
    });
}

/**
 * Create a new Database.
 */
function createDatabase(name) {
    return new Promise((resolve) => {
        var query = "CREATE DATABASE "+name;
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
            resolve(result);
        });
    });
}   

/**
 * Create table in connected database.
 */
function createTable(sql) {
    return new Promise((resolve) => {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
            resolve(result);
        });
    });
}

/**
 * Drops comments table from database.
 */
function dropTable (tableName) {
    var sql = "DROP TABLE " + tableName;
    return new Promise((resolve, reject) => {
        con.query(sql, function (err, result) {
            if (err) reject(err);
            console.log("Table deleted");
            resolve(result);
        });
    });
}

/**
 * Creates three tables in database
 * @param {String} dbName 
 */
function connectAndCreateTables(dbName) {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: dbName
      });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        try {
            var sql = [];
            sql.push("CREATE TABLE Conflict (conflict_id int PRIMARY KEY auto_increment, country_id int FOREIGN KEY, actor1 varchar(15), actor2 varchar(15), associative_actor1 varchar(15), associative_actor2 varchar(15), event_type varchar(15), date Date, fatalities int, location varchar(15))");
            sql.push("CREATE TABLE Country (country_id int PRIMARY KEY auto_increment, country_code varchar(3), name varchar(20))");
            sql.push("CREATE TABLE Macro (macro_id int PRIMARY KEY auto_increment, country_id int FOREIGN KEY, GDP int, population int, year int)");
            sql.forEach(element => {
                createTable(element)
                .then((result) => {
                    console.log(result);
                    query("set names 'utf8mb4'");
                })
                .catch((err) => {
                    console.log(err);
                }); 
            })
        } catch (error) {
            console.error(error);
        }
    });
}

/**
 * Creates a database
 * @param {String} fileAdr 
 * @param {String} dbName 
 */
function connectAndCreateDatabase(fileAdr, dbName) {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
      });
    
    con.connect(function(err) {
        createDatabase(dbName)
        .then((result) => { 
            console.log(result);
            con.end();
            });
      });
}

/**
 * Removes escape sub-strings from input-string.
 * @param {String} str 
 */
function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; 
            default:
                break;
        }
    });
}
