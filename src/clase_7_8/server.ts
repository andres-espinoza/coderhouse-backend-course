import express from 'express';
import path from 'path';
import productsRoute from './routes/products';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', express.static(path.join(__dirname, '/public')));

app.use('/', (_req, res) => {
  res.send('<h1>Welcome to the Api Products<h1/>')
})
app.use('/api/products', productsRoute);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log('Listening Port: ', PORT));
server.on('error', (error) => console.error('Error: ', error?.message));
