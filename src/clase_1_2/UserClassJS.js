class User {
  constructor(name, lastName, books, pets) {
    this.Name = name;
    this.LastName = lastName;
    this.Books = books;
    this.Pets = pets;
  }

  GetFullName() {
    return `${this.Name} ${this.LastName}`;
  }

  AddPet(pet) {
    this.Pets.push(pet);
  }

  AddBook(name, author) {
    this.Books.push({ name, author });
  }

  GetBookNames() {
    return this.Books.map(({ name }) => name);
  }
}

const favoriteBooks = require('./favoriteBooks');

const petFriends = ['Kokoro'];

const Andy = new User('Andrés', 'Espinoza', favoriteBooks, petFriends);

console.log(Andy.GetFullName());
Andy.AddPet('Pan');
Andy.AddBook('La Insoportable Levedad del Ser', 'Milan Kundera');
console.log(Andy.GetBookNames());
console.log(Andy.Pets);
