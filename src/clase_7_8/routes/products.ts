import { Router } from 'express';
import products from '../controller/Products';
import { IProduct } from '../model/Product';

const route = Router();

route.get('/', (_req, res) => {
  try {
    const prods = products.GetProducts;
    res.status(200).send(prods);
  } catch (error: any) {
    res.sendStatus(500);
  }
});

route.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const prod = products.GetProductById(Number(id));
    res.status(200).send(prod);
  } catch (error: any) {
    res.sendStatus(500);
  }
});

route.post('/', (req, res) => {
  try {
    const newProduct: IProduct = req.body;
    newProduct.price = Number(newProduct.price);
    const addedProduct = products.AddProduct(newProduct);
    res.status(200).send(addedProduct);
  } catch (error: any) {
    res.sendStatus(500);
  }
});

route.put('/:id', (req, res) => {
  try {
    const updateDate: IProduct = req.body;
    const { id } = req.params;
    const updatedProduct = products.UpdateProduct(updateDate, Number(id));
    res.status(200).send(updatedProduct);
  } catch (error: any) {
    res.sendStatus(500);
  }
});

route.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = products.DeleteProductById(Number(id));
    res.status(200).send(deleteProduct);
  } catch (error: any) {
    res.sendStatus(500);
  }
});

export default route;
