import React, { useEffect } from 'react';
// import { socket } from "../../socket"
import GetCaller from '../meet/getCaller';

const App = () => {
  // useEffect(() => {
  //   console.log('Welcome')
  //   socket.emit('message', 'Hello, server!');
  //   socket.on('message', (data) => {
  //     console.log('Received message from server:', data);
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <>
        <GetCaller/>
    </>
  );
};

export default App;
