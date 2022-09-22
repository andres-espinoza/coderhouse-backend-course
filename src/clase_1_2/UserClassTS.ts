export interface IBooks {
  name: String;
  author: String;
}

class User {
  Name: String;

  LastName: String;

  Books: IBooks[];

  Pets: String[];

  constructor(name: String, lastName: String, books: IBooks[], pets: String[]) {
    this.Name = name;
    this.LastName = lastName;
    this.Books = books;
    this.Pets = pets;
  }

  GetFullName(): String {
    return `${this.Name} ${this.LastName}`;
  }

  AddPet(pet: String): void {
    this.Pets.push(pet);
  }

  AddBook(name: String, author: String): void {
    this.Books.push({ name, author });
  }

  GetBookNames(): String[] {
    return this.Books.map(({ name }) => name);
  }
}

const favoriteBooks: IBooks[] = require('./favoriteBooks');

const petFriends: String[] = ['Kokoro'];

const Andy: User = new User('Andrés', 'Espinoza', favoriteBooks, petFriends);

console.log(Andy.GetFullName());
Andy.AddPet('Pan');
Andy.AddBook('La Insoportable Levedad del Ser', 'Milan Kundera');
console.log(Andy.GetBookNames());
console.log(Andy.Pets);
