import express from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import path from 'path';
import { create } from 'express-handlebars';
import productsRoute from './routes/products';

const app = express();
const httpServer = createServer(app);
const socketServer = new Server(httpServer, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = create({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: path.join(__dirname, '/views/handlebars/layouts'),
  partialsDir: path.join(__dirname, '/views/handlebars/partials'),
});

app.engine('hbs', hbs.engine);
app.set('views', path.join(__filename, '..', 'views', 'handlebars'));
app.set('view engine', 'hbs');

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/api/products', productsRoute);

socketServer.on('connection', (client: Socket) => {
  client.on('chatMessage', (msg) => console.log(msg));
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Http Server listening port: http://localhost:${PORT}`));
