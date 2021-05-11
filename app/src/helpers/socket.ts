import { io } from 'socket.io-client';

export const roomId = window.location.search.split('room=')[1];

const socket = io('https://chess-js-server.herokuapp.com');

socket.on('connected', () => {
  if (!roomId) alert('Te faltó la sala. (?room=roomId)');
  else socket.emit('join room', roomId);
});

export default socket;
