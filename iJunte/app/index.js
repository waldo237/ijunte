const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./controllers/userController');
const products = require('./controllers/productController');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

// connect with userdb
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true })
	.then(() => console.log('connected to DataBase successfully!'))
	.catch(err => console.log(`Could not connect to DataBase: ${err}`));

// routing
app.use('/api/products', products);
app.use('/api/users', users);

// port
const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening for request on port ${port}`));

