import express from 'express';
// import { create } from 'express-handlebars';
import path from 'path';
import productsRoute from './routes/products';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
///
///
///
//* ---------------- Using Handlebars ------------------------
/*
const hbs = create({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: path.join(__dirname, '/views/handlebars/layouts'),
  partialsDir: path.join(__dirname, '/views/handlebars/partials')
})
app.engine('hbs', hbs.engine);
app.set('views', path.join(__filename, '..', 'views', 'handlebars'));
app.set('view engine', 'hbs');
*/
//* ----------------------------------------------------------
///
///
///
//* -------------------- Using Pug ---------------------------
/*
app.set('view engine', 'pug');
app.set('views', path.join(__filename, '..', 'views', 'pug'));
*/
//* ----------------------------------------------------------
///
///
///
//* -------------------- Using EJS ---------------------------
app.set('view engine', 'ejs');
//* ----------------------------------------------------------
///
///
///
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/api/products', productsRoute);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log('Listening Port: ', PORT));
server.on('error', (error) => console.error('Error: ', error?.message));
