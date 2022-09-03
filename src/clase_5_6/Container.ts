import { IProduct } from '../clase_3_4/Container';

const fs = require('fs');

class Container {
  
  FileName : string;

  private FilePath : string;
  
  constructor(fileName: string) {
    this.FileName = fileName;
    this.FilePath = `./src/mockup_data/${this.FileName}.json`;
  };

  private GetProducts(): Promise<IProduct[]> {
    return fs.promises
      .readFile(this.FilePath)
      .then((file : any) => JSON.parse(file) as IProduct[])
      .catch((error : any) => error);
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
      const products = await this.GetAll();
      const randomId = Math.floor(Math.random() * products.length);
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
};

export default Container;
