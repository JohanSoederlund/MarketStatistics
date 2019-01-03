

var con = require('./DatabaseConnection');

//con();

/**
 * Query the database connected to.
 * @param {String} sql 
 */
module.exports = {
    
    query(sql) {
        return new Promise((resolve) => {
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result, fields);
                //con.end();
            });
        });
    }
    
}