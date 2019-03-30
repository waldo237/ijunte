const express = require('express');
const { createProduct, getProductById, updateProduct, deleteProduct, validate, 
	getProductByPrice, getProductByName } = require('../models/Products/productdb');
const router = express.Router();

// This server gets a specific product R
router.get('/:id', async (req, res) => {
	try {
		const reqProduct = await getProductById(req.params.id);
		if (!reqProduct) return res.status(404).send('Product not found');
		res.send(reqProduct);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});

// edit a specific product U
router.put('/:id', async(req, res) => {
	try {
		const reqProduct = await getProductById(req.params.id);
		// validations
		if (!reqProduct) return res.status(404).send('Product not found');
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.message);
		const editedProduct = {
			name: req.body.name,
			category: req.body.category,
			description: req.body.description,
			price: req.body.price,
			cost: req.body.cost,
			picture: {
				title: req.body.title,
				body: req.body.body,
			}
		};
		res.send(updateProduct(editedProduct));
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});

// post a new product to the database C
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);
	const product = {
		name: req.body.name,
		category: req.body.category,
		description: req.body.description,
		price: req.body.price,
		cost: req.body.cost,
		picture: {
			title: req.body.title,
			body: req.body.body,
		}
	};
	try {
		const result = await createProduct(product);
		res.send(result);
    
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});

// This function deletes a specific product D
router.delete('/:id', async (req, res) => {
	try {
		const reqProduct = await getProductById(req.params.id);
		if (!reqProduct) return res.status(404).send('Product not found');
		res.send(`Product: ${ await deleteProduct(req.params.id)} was deleted`);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});
// This function gets products by price R
router.get('/price/:price', async (req, res) => {
	console.log(req.url);
	try {
		const reqProduct = await getProductByPrice(req.params.price);
		console.log(reqProduct[1]);
		if (reqProduct[1]!== undefined) return res.status(200).send(false);
		res.send(true);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
		console.log(error);
	}
});
// This function gets products by productname R
router.get('/product/:product', async (req, res) => {
	try {
		const reqProduct = await getProductByName(req.params.product);
		console.log(reqProduct[1]);
		if (reqProduct[0]) return res.status(200).send(false);
		res.send(true);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});
module.exports = router;
