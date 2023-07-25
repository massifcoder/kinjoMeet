import { io } from 'socket.io-client';
const URL = 'ws://localhost:5000';

const ios = io(URL);

const token = '1324hlj1k34jh';
const username = 'lkj'
ios.on('connect',()=>{
console.log('Connected to server and now sharing my information with server.')
socket.emit("infoExchange",JSON.stringify({mail:username,token:token}));
});
console.log('AM CONNECTED TO THE SERVER')

export const socket = ios;