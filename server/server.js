const express = require('express');
const cors = require('cors')
const http = require('http');
const socketIO = require('socket.io');


const app = express();
app.use(cors())
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const onlineUsers = {};       // List of users online now.
const onCallUsers = {};       // List of users on call or busy now.


io.on('connection', (socket) => {;

  console.log('A new user connected to server.')


  socket.on("infoExchange",(req)=>{
    const data = JSON.parse(req);
    onlineUsers[data.mail] = {token:data.token,mail:socket.id};
    console.log(onlineUsers)
  })


  socket.on("checkUser",(req)=>{
    console.log(req);
    const info = onlineUsers[req];
    if(info==undefined){
      socket.emit("userInfo",JSON.stringify({online:'false'}))
    }
    else if(onCallUsers[req]){
      socket.emit("userInfo",JSON.stringify({online:'true',busy:'true'}));
    }
    else{
      socket.emit("userInfo",JSON.stringify({online:'true',busy:'false'}));
    }
  })


  socket.on('disconnect', (so) => {
    console.log('A user disconnected');
    delete onlineUsers[socket.id];
    console.log(onlineUsers)
  });


});





const port = 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
