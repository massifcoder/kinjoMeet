import { Children, createContext } from 'react';
import { io } from 'socket.io-client';


const URL = 'ws://localhost:5000';
const ios = io(URL);
const token = '1324hlj1k34jh';
const username = 'lkj';
ios.on('connect',(sockets)=>{
console.log('Connected to server and now sharing my information with server.')
sockets.emit("infoExchange",JSON.stringify({mail:username,token:token}));
});
console.log('AM CONNECTED TO THE SERVER')

const FirstName = createContext();

function Socket(){
    return (
        <FirstName.Provider value={ios}>
            {Children}
        </FirstName.Provider>
    )
}

export default Socket;