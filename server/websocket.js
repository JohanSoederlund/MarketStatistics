const server = require('http').createServer();
const io = require('socket.io')(server);
var databaseManager = require('./DatabaseManager');

//var databaseManager = new DatabaseManager();

io.on('connection', client => {
    console.log("io.on connection");
    /*
    client.on('connect', function(){
        console.log("CONNECTED");
    });
    */

  client.on('updateTable', query => { 
      console.log("updateTable: " + query);
      
      databaseManager.query(query)
      .then((res) => {
        client.emit("updateTable", res);
      })
      .catch((err) => {
        console.log(err);
        client.emit("updateTable", err);
      });
      
  });

  client.on('getCountries', query => { 
    console.log("getCountries: " + query);
    
    databaseManager.query(query)
    .then((res) => {
      client.emit("getCountries", res);
    })
    .catch((err) => {
      console.log(err);
      client.emit("getCountries", err);
    });
    
  });

  client.on('disconnect', () => {
    console.log("DISCONNECTED");
  });
});
server.listen(3001);
