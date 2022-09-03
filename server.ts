import express from 'express';

const  { ClimbingShoes } = require('./src/clase_3_4/Container');

const app = express();


app.get('/productos', async (_req, res) => {
  try {
    const allProducts = await ClimbingShoes.GetAll();
    res.send(allProducts)
  }
  catch(error : any) {
    console.error(error?.message);
    res.sendStatus(500);
  }
});

app.get('/productoRandom', async (_req, res) => {
  try {
    const randomProduct = await ClimbingShoes.GetRandomProduct();
    res.send(randomProduct);
  }
  catch(error : any) {
    console.error(error?.message);
    res.sendStatus(500);
  }
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
  
})

server.on('error', (error) => console.error('Error: ', error?.message));