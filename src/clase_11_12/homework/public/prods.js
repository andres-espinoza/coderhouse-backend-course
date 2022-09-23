// eslint-disable-next-line no-undef
const clientSocket = io();

const messages = {
  chat: 'chatMessage',
  productClient: 'sendProduct',
  productServer: 'sendProducts',
};

const productForm = document.querySelector('#product-form');
const productTitleInput = document.querySelector('#product-title');
const productPriceInput = document.querySelector('#product-price');
const productThumbnailInput = document.querySelector('#product-thumbnail');

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = productTitleInput.value;
  let price = productPriceInput.value;
  let thumbnail = productThumbnailInput.value;
  const product = {
    title,
    price,
    thumbnail,
  };
  clientSocket.emit(messages.productClient, product);
  console.log('enviado');
});

const productsTable = document.querySelector('#products-table-template').innerHTML;
const template = Handlebars.compile(productsTable);
const output = document.querySelector('.output');

clientSocket.on(messages.productServer, (p) => {
  console.log('products: ', p.products);
  if (p.products.length > 0) {
    console.log('template: ', template({ products: [{
      title: 'prueba',
      price: '$1',
      thumbnail: 'wwww.algo.cl',
      id: '2'
    }] }));
    return (output.innerHTML = template(p));
  } else console.log('nope');
});
