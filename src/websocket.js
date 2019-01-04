import io from 'socket.io-client';
 
const socket = io('http://localhost:3001');

/*
socket.on('connect', function(){
    console.log("CONNECTED");
});
*/

socket.on('disconnect', function(){
    console.log("DISCONNECTED");
});

export default socket;
