const fs = require('fs');
const path = require('path');
const express = require('express');
const { updateProduct,  validate, Product } = require('../models/Products/productdb');
const router = express.Router();
const mongodb = require('mongodb');
const axios = require('axios');



// This server gets a specific product R
router.get('/:id', async (req, res) => {
	const Oid = new mongodb.OjectId(req.params.id);
	try {
		const reqProduct = await Product.find({_id: Oid});
		if (!reqProduct) return res.status(404).send('Product not found');
		res.send(reqProduct);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});

// edit a specific product U
router.put('/:id', async(req, res) => {
	try {
		const reqProduct = await Product.find({_id: req.params.id});
		// validations
		if (!reqProduct) return res.status(404).send('Product not found');
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.message);
		const editedProduct = {
			name: req.body.name,
			brand: req.body.brand,
			category: req.body.category,
			description: req.body.description,
			price:  parseInt(req.body.price),
			cost:  parseInt(req.body.cost),
			image: req.file.id,
		};
		res.send(updateProduct(editedProduct));
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});

// This function deletes a specific product D
router.delete('/:id', async (req, res) => {
	try {
		const reqProduct = await Product.findById({_id: req.params.id});
		await axios.delete(`http://localhost:3000/api/images/${reqProduct.image}`);
		await Product.findByIdAndDelete({_id: req.params.id});
		res.redirect('/');
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}

});
// This function gets products by price R
router.get('/price/:price', async (req, res) => {
	try {
		const reqProduct = await Product.find({price: req.params.price});
		if (!reqProduct) return res.status(404).send('Product not found');
		res.send(reqProduct);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});
// This function gets products by productname R
router.get('/name/:name', async (req, res) => {
	try {
		const reqProduct = await Product.find({ name: req.params.name });
		console.log(reqProduct[1]);
		if (!reqProduct[0]) return res.status(400).send(`there are not products named: ${req.body.product}`);
		res.send(reqProduct);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});


router.get('/image/:id', async function (req, res) {
	
	const product = await Product.find({_id: req.params.id});
	if (!product) return res.status(404).send('Product not found');
	console.log(product[0].image);
	try {
		const fullPath = path.join(__dirname, product[0].image);
		const _img = await fs.readFile(fullPath, function read(err, data) {
			if (err) {
				throw err;
			}
			console.log(data);   
		});
		
res.render('index', {sg: 'File Uploaded!', file: _img});
	} catch (error) {
		console.log(error);
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});


module.exports = router;
