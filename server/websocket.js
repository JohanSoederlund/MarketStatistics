const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
    console.log("io.on connection");
    client.on('connect', function(){
        console.log("CONNECTED");
    });

  client.on('event', data => { 
        console.log("EVENT: " + data);
    });

  client.on('disconnect', () => {
    console.log("DISCONNECTED");
  });
});
server.listen(3001);


/*
var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){

});

socket.on('event', function(data){

});

socket.on('disconnect', function(){

});
*/