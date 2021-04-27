import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('connected', (data) => {
  console.log({ data });
});

export default socket;
