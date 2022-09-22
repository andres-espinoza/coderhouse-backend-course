import express from 'express';

const app = express();

//* construyendo algunos endpoints tipo get

app.get('/', (_req, res) =>
  res.send('<h1 style="color: violet">Welcome to the Express Server</h1>')
);

app.get('/api', (_req, res) => res.send('Welcome to our API'));

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});

server.on('error', (error) => console.error('Error: ', error?.message));
