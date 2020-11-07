const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./controllers/userController');
const products = require('./controllers/productController');
const images = require('./controllers/imageController');
const methodOverride = require('method-override');

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use(express.static('./views'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// connect with userdb
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true })
	.then(() => console.log('connected to DataBase successfully!'))
	.catch(err => console.log(`Could not connect to DataBase: ${err}`));

// routing
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/', images);
app.set('view engine', 'ejs');

// port
const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening for request on port ${port}`));

