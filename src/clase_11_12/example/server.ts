import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const socketServer = new Server(httpServer, {});

app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/', (_req, res) => res.sendFile('index.html'));

socketServer.on('connection', (client) => {
  console.log('Connected User: ', client);
  console.log(client.id);
  client.on('disconnect', () => console.log('Disconnected Client'));
  client.on('mensaje', (mensaje) => {
    console.log('Mensaje recibido: ', mensaje);
    client.emit('respuesta', 'agradecido');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Http Server listening port: ${PORT}`));
