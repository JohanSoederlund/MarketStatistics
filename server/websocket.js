const server = require('http').createServer();
const io = require('socket.io')(server);
var databaseManager = require('./DatabaseManager');

//var databaseManager = new DatabaseManager();

io.on('connection', client => {
    console.log("io.on connection");
    client.on('connect', function(){
        console.log("CONNECTED");
    });

  client.on('query', query => { 
      console.log("query: " + query);
      
      databaseManager.query(query)
      .then((res) => {
        client.emit("query", res);
      })
      .catch((err) => {
        console.log(err);
        client.emit("query", err);
      });
      
  });

  client.on('disconnect', () => {
    console.log("DISCONNECTED");
  });
});
server.listen(3001);
