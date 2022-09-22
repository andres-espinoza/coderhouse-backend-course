import { Router } from 'express';
import products from '../controller/Products';
import { IProduct } from '../model/Product';

const route = Router();

route.get('/', (_req, res) => {
  try {
    const prods = products.GetProducts;
    if (prods.length > 0) res.status(200).render('main', { product: [...prods] });
    else res.status(200).render('main', { product: false });
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
    products.AddProduct(newProduct);
    res.status(200).redirect('/');
  } catch (error: any) {
    res.sendStatus(500);
  }
});

route.put('/:id', (req, res) => {
  try {
    const { title, price, thumbnail }: IProduct = req.body;
    const { id } = req.params;
    const updatedProduct = products.UpdateProduct({ title, price, thumbnail }, Number(id));
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
