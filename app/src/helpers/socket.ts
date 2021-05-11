import { io } from 'socket.io-client';

export const roomId = window.location.search.split('room=')[1];

const socket = io('https://chess-js-server.herokuapp.com');

socket.on('connected', () => {
  socket.emit('join room', roomId);
});

export default socket;
