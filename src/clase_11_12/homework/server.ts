import express from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import path from 'path';
import { create } from 'express-handlebars';
import { productReceiver, serverMessage } from './controller/messageProducts';
import products from './controller/Products';

const app = express();
const httpServer = createServer(app);
export const socketServer = new Server(httpServer, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = create({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: path.join(__dirname, '/public/layouts'),
  partialsDir: path.join(__dirname, '/public/partials'),
});

app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use('/', (_req, res) => res.render('./layouts/index.hbs'));

socketServer.on('connection', (client: Socket) => {
  socketServer.emit(serverMessage, { products: products.GetProducts });
  productReceiver(client, socketServer);
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Http Server listening port: http://localhost:${PORT}`));
