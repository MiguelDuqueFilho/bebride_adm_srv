import { logger } from './logger';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import { routes } from './routes';
import './database';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html');
});

const http = createServer(app); // protocolo http
const io = new Server(http); // protocolo WebSocket

io.on('connection', (socket: Socket) => {
  logger.debug(`connect socket.id = ${socket.id}`);
});

app.use(express.json());
app.use(routes);

export { http, io };
