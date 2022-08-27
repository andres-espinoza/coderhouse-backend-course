const fs = require('fs');

interface IProduct {
  title: string;
  price: number;
  thumbnail: string;
  id?: number;
}

const mastia : IProduct = {
  title: 'Zapatilla Escalada Mastia',
  price: 123900,
  thumbnail: 'https://cdnx.jumpseller.com/tienda-ruta-outdoor/image/7200691/resize/480/480?1657573387 1x,https://cdnx.jumpseller.com/tienda-ruta-outdoor/image/7200691/resize/960/960?1657573387 2x'
}

const masaiYellow: IProduct = {
  title: 'Zapatilla Escalada Masai Yellow',
  price: 81900,
  thumbnail: 'https://cdnx.jumpseller.com/tienda-ruta-outdoor/image/7200677/resize/480/480?1657573189'
}

class Container {
  
  FileName : string;

  private ProductID: number = 0;
  
  constructor(fileName: string) {
    this.FileName = `./${fileName}.json`;
    fs.writeFileSync(this.FileName, '[]', 'utf8');
  };

  private GetProducts(): Promise<IProduct[]> {
    return fs.promises
      .readFile(this.FileName)
      .then((file : any) => JSON.parse(file) as IProduct[])
      .catch((error : any) => error);
  };

  private SaveJSONProductsInFile(products : IProduct[]) : Promise<void> {
    const newProductsJSON = JSON.stringify(products);
    return fs
      .promises
      .writeFile(this.FileName, newProductsJSON, 'utf8');
  };

  async Save(product: IProduct) : Promise<number | null> {
    try {
      const products = await this.GetProducts();
      this.ProductID+=1;
      products.push({ ...product, id: this.ProductID});
      await this.SaveJSONProductsInFile(products);
      return this.ProductID;
    }
    catch(error : any) {
      console.error(error?.message);
      return null;
    };
  };

  async GetById(id : number) : Promise<IProduct | null> {
    try {
      const products = await this.GetProducts();
      const product = products.find((prod) => prod.id === id);
      return (product || null);

    }
    catch(error : any) {
      console.error(error?.message);
      return null;
    };
  };

  async GetAll() : Promise<IProduct[]> {
    try {
     return await this.GetProducts();
    }
    catch(error : any) {
      console.error(error?.message);
      return [];
    };
  };

  async DeleteById(id : number) : Promise<void> {
    try {
      const products = await this.GetProducts();
      const filteredProducts = products.filter((prod) => prod.id !== id);
      await this.SaveJSONProductsInFile(filteredProducts);
    }
    catch(error : any) {
      console.error(error?.message);
    };
  };

  async DeleteAll() : Promise<void> {
    try {
      await fs.promises.writeFile(this.FileName, '[]', 'utf8');
    }
    catch (error : any) {
      console.error(error?.message);
    };
  };
};


//* ----------------- DEMO --------------------------


const ClimbingShoes = new Container('climbingShoes');

ClimbingShoes
  .Save(mastia)
  .then(()=> ClimbingShoes.Save(masaiYellow))
  .then(() => ClimbingShoes.GetAll())
  .then((prods) => console.log('Estos son todos los productos: ', prods))
  .then(() => ClimbingShoes.GetById(2))
  .then((prod) => console.log('Producto con ID 2: ', prod))
  .then(() => ClimbingShoes.DeleteById(2))
  .then(() => console.log('El Producto con ID 2 ha sido eliminado'))
  .then(() => ClimbingShoes.GetById(2))
  .then((prod) => console.log('Buscando producto con ID 2: ', prod))
  .then(() => ClimbingShoes.DeleteAll())
  .then(() => console.log('Productos eliminados!'))
  .then(() => ClimbingShoes.GetAll())
  .then((prods) => console.log('Ya no hay productos: ', prods))
  .catch((error : any) => console.log(error?.message))
  .finally(() => console.log('Demo finalizada :)'))
