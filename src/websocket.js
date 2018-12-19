import io from 'socket.io-client';
 
const socket = io('http://localhost:3001');

//var socket = io('http://localhost');


socket.on('connect', function(){
    console.log("CONNECTED");
});

socket.on('event', function(data){
    console.log("EVENT: " + data);
});

socket.emit('event', "GIVE ME DATABASE");

socket.on('disconnect', function(){
    console.log("DISCONNECTED");
});

export default socket;

//module.exports = socket;