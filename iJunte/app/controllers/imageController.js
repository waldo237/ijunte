const assert = require('assert');
const fs = require('fs');
const mongodb = require('mongodb');
const multer = require('./multerMiddleware');
const { Product } = require('../models/Products/productdb');
const express = require('express');
const router = express.Router();
const path = require('path');

const uri = 'mongodb://localhost:27017/';
const dbName = 'userdb';
//create mongo Cliente
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });

//@desc create a product and image from a form  C
router.post('/api/images/', multer.upload.single('file'), async (req, res) => {
	const newId = await new mongodb.ObjectId(req.file.id);
	await uploadToDB(newId, req.file.path);
	const newProduct = await {
		name: req.body.name,
		brand: req.body.brand,
		category: req.body.category,
		description: req.body.description,
		price: parseInt(req.body.price),
		cost: parseInt(req.body.cost),
		image: newId,
	};
	const product = await new Product(newProduct);
	await product.save();
	//redirect  after doing all operations
	res.redirect('/');
});

//@desc deletes an image and files
router.delete('/api/images/:id', async (req, res)=>{
	const fileId = new mongodb.ObjectId(req.params.id);
	try {
		client.connect( async (err, client)=> {
			const db = await client.db(dbName);
			const bucket = await new mongodb.GridFSBucket(db);
			bucket.delete(fileId, (error)=> {
				if (error);
			});
		});
		res.send('done');
	} catch (error) {
		res.send('there was an error');
	}
});

// @desc Loads form
router.get('/', (req, res) => {
	Product.find().select({ __v: 0 }).exec((err, docs) => {
		res.render('index', { docs: docs, background: ' background-color:#f4f5f7' });
	});
});

router.get('/api/images/:id', async(req, res) => {
	const fileId = new mongodb.ObjectId(req.params.id);
	try {
		client.connect( async (err, client)=> {
			const db = client.db(dbName);
			const bucket = new mongodb.GridFSBucket(db);
			await bucket.openDownloadStream(fileId).on('error', (error)=> {
				res.send(`The files were not found ${error}`);}).
				on('finish', ()=> {}).
				pipe(res);
		});
		client.close();
	} catch (error) {
		res.send('there was an error');
	}
}
);

//@desc takes an image saved in the FS and sends it to mongo
const uploadToDB = (fileid, filePath) => {
	client.connect( error => {
		assert.ifError(error);
		const db = client.db(dbName);
		const bucket = new mongodb.GridFSBucket(db);
		fs.createReadStream(filePath).
			on('error',  error => { assert.ifError(error);}).
			pipe(bucket.openUploadStreamWithId(fileid, path.basename(filePath))).
			on('finish', ()=> {
				//deletes the image from the FS
				fs.unlink(filePath, err => {
					if (err) console.log('the file actually stayed in the FS');
				}); 
			});
	});
	client.close();
};

module.exports = router;




