import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('Socket connected!');
  socket.emit('connected', 'hello!');

  socket.on('test', () => {
    console.log('algo');
  });
});

httpServer.listen(5000);
