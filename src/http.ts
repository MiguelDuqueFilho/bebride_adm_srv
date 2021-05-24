import { logger } from './logger';
import express from 'express';
import path from 'path';
// import './database';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { routes } from './routes';

const app = express();
const http = createServer(app); // protocolo http
const io = new Server(http); // protocolo WebSocket

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html');
});

app.get('/pages/admin', (request, response) => {
  return response.render('html/admin.html');
});

app.use(express.json());
app.use(routes);

export { http, io };
