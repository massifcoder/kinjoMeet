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


io.on('connection', (socket) => {

  socket.on("infoExchange",(mail)=>{
    onlineUsers[mail] = {id:socket.id};
  })

  socket.on("checkUser",(mail,name,caller)=>{
    const recvId = onlineUsers[mail];
    if(recvId==undefined){
      socket.emit("userInfo",'false','true','null');
    }
    else if(onCallUsers[mail] || recvId.id == socket.id){
      socket.emit("userInfo",'true','true','null');
    }
    else{
      socket.emit("userInfo",'true','false',recvId.id);
      io.to(recvId.id).emit('getCall',socket.id,name,caller);
    }
  })

  socket.on('cancelCall',(otherId)=>{
    io.to(otherId).emit('reject','true');
  })

  socket.on('leaveRoom',(room)=>{
    console.log('Room left by ',socket.id);
    socket.leave(room);
    io.to(room).emit('leftRoom');
  });

  socket.on('present',()=>{
    console.log('Am present.')
  })

  socket.on('joinRoom',(room)=>{
    socket.join(room);
    
  })

  socket.on('giveId',()=>{
    console.log('Phone aaya he.')
    io.to(socket.id).emit('returnId');
  })

  socket.on('gettingId',(id,room)=>{
    console.log('Yeah dubey ji liye he.');
    io.to(room).emit('getId',id);
  })

  socket.on('answerCall',(callerId)=>{
    socket.join(callerId)
    io.to(callerId).emit('accept',callerId);
  })

  socket.on('disconnect', () => {
    console.log('One person disconnected!')
  });

  socket.on('log-out',(mail)=>{
    console.log('Someone log out ',mail);
    delete onlineUsers[mail];
    console.log(onlineUsers);
  })

  socket.on('chat',(room,msg)=>{
    io.to(room).emit('msg',msg);
  })

  socket.on('send-signal',(data,room)=>{
    console.log('Signalling started ',socket.id);
    io.to(room).emit('receive-signal',data);
  })


});





const port = 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
