import { Server, Socket } from 'socket.io';
import { IProduct } from '../model/Product';
import products from './Products';

export const clientMessage = 'sendProduct';
export const serverMessage = 'sendProducts';

export const productReceiver = (client: Socket, server: Server) : void => {
  client.on(clientMessage, (product: IProduct) => {
    product.price = Number(product.price);
    products.AddProduct(product);
    server.emit(serverMessage, { products: products.GetProducts });
  });
};
