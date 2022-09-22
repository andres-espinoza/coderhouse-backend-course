export interface IProduct {
  title: string;
  price: number;
  thumbnail: string;
  id?: number;
}

export const mastia: IProduct = {
  title: 'Zapatilla Escalada Mastia',
  price: 123900,
  thumbnail:
    'https://cdnx.jumpseller.com/tienda-ruta-outdoor/image/7200691/resize/480/480?1657573387 1x,https://cdnx.jumpseller.com/tienda-ruta-outdoor/image/7200691/resize/960/960?1657573387 2x',
};

export const masaiYellow: IProduct = {
  title: 'Zapatilla Escalada Masai Yellow',
  price: 81900,
  thumbnail:
    'https://cdnx.jumpseller.com/tienda-ruta-outdoor/image/7200677/resize/480/480?1657573189',
};

export const python: IProduct = {
  title: 'Zapatilla Escalada Python',
  price: 90990,
  thumbnail: 'https://shop.epictv.com/en/climbing-shoes/la-sportiva/python-2015',
};
