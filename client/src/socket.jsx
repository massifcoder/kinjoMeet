import { io } from 'socket.io-client';
const URL = 'ws://localhost:5000';

const ios = io(URL);

export const socket = ios;