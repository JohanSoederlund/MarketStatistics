var mysql = require('mysql');
var LineByLineReader = require('line-by-line');


var fileAdrConflict = "/home/johan/studier/2dv513/assignment3/conflictstatistics/datasets/conflict.csv";
var fileAdrPopulation = "/home/johan/studier/2dv513/assignment3/conflictstatistics/datasets/population.csv";
var fileAdrReligion = "/home/johan/studier/2dv513/assignment3/conflictstatistics/datasets/religion.csv";
var fileAdrGDP = "/home/johan/studier/2dv513/assignment3/conflictstatistics/datasets/gdp.csv";

var con;
var insertCountryValues = [];
var insertMacroValues = [];
var insertConflictValues = [];
var insertActorValues = [];

var databaseName = "ConflictStatistics";
const host = "localhost";
const user = "root";
const password = "";


con = mysql.createConnection({
    host: host,
    user: user,
    password: password
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
    createDatabase()
    .then((result) => {
        console.log(result);
        connectAndCreateTables();
    })
    
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

    var conflict_id = 1;
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
        var conflict_date;
        if (lineArr[4] !== "") conflict_date = new Date(lineArr[4]).toISOString().slice(0, 10);
        var conflict_year;
        if (lineArr[4] !== "") conflict_year = conflict_date.slice(0, 4);
        var location;
        if (lineArr[4] !== "") location = lineArr[20];

        insertConflictValues.push([
            country_id,
            event_type,
            fatalities,
            conflict_date,
            conflict_year,
            location
        ]);

        if (conflict_id < 425693) {
            insertActorValues.push([
                conflict_id,
                actor1,
                associative_actor1,
                true
            ]);
            
            insertActorValues.push([
                conflict_id,
                actor2,
                associative_actor2,
                false
            ]);
        }
        
        conflict_id++;
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

            insertInto(insertActorValues.slice(0, chunk), "actor")
            .then((result) => {
            console.log(result);

            insertInto(insertActorValues.slice(chunk, chunk*2), "actor")
            .then((result) => {
                
            console.log(result);
            insertInto(insertActorValues.slice(chunk*2, chunk*3), "actor")
            .then((result) => {
                
            console.log(result);
            insertInto(insertActorValues.slice(chunk*3, chunk*4), "actor")
            .then((result) => {
                
            console.log(result);
            insertInto(insertActorValues.slice(chunk*4, chunk*5), "actor")
            .then((result) => {
            console.log(result);

            insertInto(insertActorValues.slice(chunk*5, chunk*6), "actor")
            .then((result) => {
                
            console.log(result);
            insertInto(insertActorValues.slice(chunk*6, chunk*7), "actor")
            .then((result) => {
                
            console.log(result);
            insertInto(insertActorValues.slice(chunk*7, chunk*8), "actor")
            .then((result) => {

            console.log(result);
            insertInto(insertActorValues.slice(chunk*8, insertActorValues.length-1), "actor")
            .then((result) => {
                readCSVGDP(fileAdrGDP);
            });
            })})})})})})})})
            
        })})})})})
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
        var selectQuery = 'SELECT country_id FROM Country WHERE country_name="' + country + '"';
        
        con.query(selectQuery, function (error, result, rows, fields) {
            if (error){
                console.log(country);
                console.log(error);
            } 

            country_id = result[0].country_id;
            // Every line of data is 62 elements, where last index represents year 2017.
            for(var i = 61; i > 40; i--) {
                if (lineArr[i] === "") {
                    gdp = 0;
                } else {
                    gdp = parseInt(lineArr[i]);
                }
                
                var updateQuery = 'UPDATE Macro SET gdp = "' + gdp + '" WHERE country_id="' + country_id + '" AND macro_year="' + macro_year + '"';
            
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
            sql = "INSERT INTO Conflict (country_id, event_type, fatalities, conflict_date, conflict_year, location) VALUES ?";   
            break;
        case "country":
            sql = "INSERT INTO Country (country_code, country_name) VALUES ?";
            break;
        case "macro":
            sql = "INSERT INTO Macro (country_id, gdp, population, macro_year) VALUES ?";
            break;
        case "actor":
            sql = "INSERT INTO Actor (conflict_id, actor_name, associative_actor, agressor) VALUES ?";
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
function createDatabase() {
    return new Promise((resolve) => {
        var query = "CREATE DATABASE " + databaseName;
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
 */
function connectAndCreateTables() {
    con.end();
    
    con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: databaseName
      });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        try {
            query("ALTER DATABASE ConflictStatistics CHARACTER SET = 'utf8mb4' COLLATE = 'utf8mb4_unicode_ci'");
            var sql = [];
            sql.push("CREATE TABLE Country (country_id int PRIMARY KEY auto_increment, country_code varchar(3), country_name varchar(40))");
            sql.push("CREATE TABLE Conflict (conflict_id int PRIMARY KEY auto_increment, country_id int NOT NULL DEFAULT 0, event_type varchar(1000), fatalities int, conflict_date Date, conflict_year int, location varchar(1000))");
            sql.push("CREATE TABLE Macro (macro_id int PRIMARY KEY auto_increment, country_id int NOT NULL DEFAULT 0, gdp bigint(20), population bigint(20), macro_year int)");
            sql.push("CREATE TABLE Actor (actor_id int PRIMARY KEY auto_increment, conflict_id int NOT NULL DEFAULT 0, actor_name varchar(1000), associative_actor varchar(1000), agressor boolean)");
            var counter = 0;
            sql.forEach(element => {
                createTable(element)
                .then((result) => {
                    counter++;
                    console.log(result);
                    
                    if(counter === 4) {
                        query("ALTER TABLE Conflict ADD CONSTRAINT fk_country_id FOREIGN KEY (country_id) REFERENCES Country(country_id);")
                        .then((alterResult) => {
                            console.log("alterResult CONFLICT");
                            console.log(alterResult);
                            
                            query("ALTER TABLE Macro ADD CONSTRAINT fk_country_id2 FOREIGN KEY (country_id) REFERENCES Country(country_id);")
                            .then((alterResult2) => {
                                console.log("alterResult Macro");
                                console.log(alterResult2);
                                query("ALTER TABLE Actor ADD CONSTRAINT fk_conflict_id FOREIGN KEY (conflict_id) REFERENCES Conflict(conflict_id);")
                                .then((alterResult3) => {
                                    console.log("alterResult Actor");
                                    console.log(alterResult3);
                                    readCSVPopulation(fileAdrPopulation);
                                });
                            })
                        })
                    }
                    
                    
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
 */
function connectAndCreateDatabase(fileAdr) {
    con = mysql.createConnection({
        host: host,
        user: user,
        password: password
      });
    
    con.connect(function(err) {
        createDatabase()
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
