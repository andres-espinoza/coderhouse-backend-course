const fs = require('fs');

interface IProduct {
  title: string;
  price: number;
  thumbnail: string;
  id?: number;
}

export const mastia : IProduct = {
  title: 'Zapatilla Escalada Mastia',
  price: 123900,
  thumbnail: 'https://cdnx.jumpseller.com/tienda-ruta-outdoor/image/7200691/resize/480/480?1657573387 1x,https://cdnx.jumpseller.com/tienda-ruta-outdoor/image/7200691/resize/960/960?1657573387 2x'
}

export const masaiYellow: IProduct = {
  title: 'Zapatilla Escalada Masai Yellow',
  price: 81900,
  thumbnail: 'https://cdnx.jumpseller.com/tienda-ruta-outdoor/image/7200677/resize/480/480?1657573189'
}

export const hiangle: IProduct = {
  title: 'Zapatilla Escalada Hiangle',
  price: 159990,
  thumbnail: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dd3da032976048bb95c7aafb003005a5_9366/Zapatillas_de_Escalada_Five_Ten_Hiangle_Blanco_EE9033_01_standard.jpg'
}


class Container {
  
  FileName : string;

  private FilePath : string;

  private ProductID: number = 0;
  
  constructor(fileName: string) {
    this.FileName = fileName;
    this.FilePath = `../mockup_data/${this.FileName}.json`;
    fs.writeFileSync(this.FilePath, '[]', 'utf8');
  };

  private GetProducts(): Promise<IProduct[]> {
    return fs.promises
      .readFile(this.FilePath)
      .then((file : any) => JSON.parse(file) as IProduct[])
      .catch((error : any) => error);
  };

  private SaveJSONProductsInFile(products : IProduct[]) : Promise<void> {
    const newProductsJSON = JSON.stringify(products);
    return fs
      .promises
      .writeFile(this.FilePath, newProductsJSON, 'utf8');
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

  async GetRandomProduct() : Promise<IProduct | null> {
    try{
      const productsLength = await (await this.GetAll()).length;
      const randomId = Math.floor(Math.random() * productsLength);
      return await this.GetById(randomId);
    }
    catch(error : any){
      console.error(error?.message);
      return null;
    }
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
      await fs.promises.writeFile(this.FilePath, '[]', 'utf8');
    }
    catch (error : any) {
      console.error(error?.message);
    };
  };
};




const ClimbingShoes = new Container('climbingShoes');

//* ----------------- DEMO --------------------------

// ClimbingShoes
//   .Save(mastia)
//   .then(()=> ClimbingShoes.Save(masaiYellow))
//   .then(() => ClimbingShoes.GetAll())
//   .then((prods) => console.log('Estos son todos los productos: ', prods))
//   .then(() => ClimbingShoes.GetById(2))
//   .then((prod) => console.log('Producto con ID 2: ', prod))
//   .then(() => ClimbingShoes.DeleteById(2))
//   .then(() => console.log('El Producto con ID 2 ha sido eliminado'))
//   .then(() => ClimbingShoes.GetById(2))
//   .then((prod) => console.log('Buscando producto con ID 2: ', prod))
//   .then(() => ClimbingShoes.DeleteAll())
//   .then(() => console.log('Productos eliminados!'))
//   .then(() => ClimbingShoes.GetAll())
//   .then((prods) => console.log('Ya no hay productos: ', prods))
//   .catch((error : any) => console.log(error?.message))
//   .finally(() => console.log('Demo finalizada :)'))

  ClimbingShoes
  .Save(mastia)
  .then(()=> ClimbingShoes.Save(masaiYellow))
  .then(() => ClimbingShoes.Save(hiangle))
  .catch((error : any) => console.log(error?.message))

module.exports = {
  ClimbingShoes
};
