const assert = require('assert');
const fs = require('fs');
const mongodb = require('mongodb');
const multer = require('./insertProduct');
const { Product } = require('../models/Products/productdb');
const express = require('express');
const router = express.Router();
const path = require('path');

const uri = 'mongodb://localhost:27017/';
const dbName = 'userdb';

const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });

router.post('/upload', multer.upload.single('file'), async (req, res) => {
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
	res.redirect('/');
});

router.delete('/idimage/:id', async (req, res)=>{
	const fileId = new mongodb.ObjectId(req.params.id);
	try {
		await client.connect( async (err, client)=> {
        	const db = await client.db(dbName);
        	const bucket = await new mongodb.GridFSBucket(db);
			await bucket.delete(fileId, (error)=> {
				if (error) 	console.log(`I deleted the files but: ${error}`);
			
			});
		});
		res.redirect('/');
	} catch (error) {
		res.send('there was an error');
	}
})
// @route GET /
// @desc Loads form
router.get('/', (req, res) => {
	Product.find().select({ __v: 0 }).exec((err, docs) => {
		res.render('index', { docs: docs, background: ' background-color:#f4f5f7' });
	});
});

router.get('/idimage/:id', async(req, res) => {
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

const uploadToDB = (fileid, filePath) => {
	client.connect( error => {
		assert.ifError(error);
		const db = client.db(dbName);
		const bucket = new mongodb.GridFSBucket(db);
		fs.createReadStream(filePath).
			on('error',  error => { assert.ifError(error);}).
			pipe(bucket.openUploadStreamWithId(fileid, path.basename(filePath))).
			on('finish', ()=> {
				fs.unlink(filePath, err => {
					if (err) console.log('the file actually stayed in the FS');
				}); 
			});
	});
	client.close();
};


module.exports = router;




