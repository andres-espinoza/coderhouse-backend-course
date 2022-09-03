import express from 'express';
import Container from './Container';

const app = express();

const ClimbingShoes = new Container('climbingShoes');


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
    console.log(randomProduct);
    
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