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

const onlineUsers = {};
const onCallUsers = {};


io.on('connection', (socket) => {;

  console.log('A new user connected to server.')


  socket.on("infoExchange",(req)=>{
    const data = JSON.parse(req);
    onlineUsers[data.mail] = {token:data.token,id:socket.id};
    console.log(onlineUsers)
  })


  socket.on("checkUser",(req)=>{
    req = JSON.parse(req);
    console.log(onlineUsers)
    const info = onlineUsers[req.mail];
    if(info==undefined){
      socket.emit("userInfo",JSON.stringify({online:'false'}))
    }
    else if(onCallUsers[req.mail]){ //){
      socket.emit("userInfo",JSON.stringify({online:'true',busy:'true'}));
    }
    else{
      socket.emit("userInfo",JSON.stringify({online:'true',busy:'false',userId:info.id}));
      const tk = info.id;
      io.to(tk).emit('getCall',JSON.stringify({call:'true',room:socket.id,from:req.caller,name:req.name}));
    }
  })


  socket.on('cancelCall',(req)=>{
    const tk = req;
    console.log('Cancelling call and sending info to ',req);
    io.to(tk).emit('reject','true');
  })

  socket.on('answerCall',(req)=>{
    const tk = req;
    io.to(tk).emit('accept','true');
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
