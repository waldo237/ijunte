const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const router = express.Router();
const {Product}  = require('../models/Products/productdb');



// Mongo URI
const mongoURI = 'mongodb://localhost:27017/userdb';
let gfs;
// Create mongo connection
mongoose.connect(mongoURI, { useNewUrlParser: true })
	.then(() => {
		gfs = Grid(mongoose.connection.db, mongoose.mongo);
		gfs.collection('uploads');
	}).catch(err => console.log(`Could not connect to DataBase: ${err}`));
// Create storage engine
const storage = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: 'uploads'
				};
				resolve(fileInfo);
			});
		});
	}
});
const upload = multer({ storage });
// @route GET /
// @desc Loads form
router.get('/', (req, res) => {
	Product.find().select({__v: 0 }).exec(async (err, docs) => {
		const file = gfs.files.findOne({ _id: docs.image });
		if (!file || file.length === 0) {
			res.render('index', { files: false });
		} else {
			if (file.contentType === 'image/jpeg' ||
				file.contentType === 'image/png') {
				file.isImage = true;
			}
			else {
				file.isImage = false;
			}
			res.render('index', { docs: docs, background: ' background-color:#f4f5f7' });
			// res.render('index', { file: file });
		}
	});
});
// @route POST /upload
// @desc  Uploads file to DB
router.post('/upload', upload.single('file'), async (req, res) => {
	console.log(req.file.id);
	console.log(req.body);
	const newProduct = {
		name: req.body.name,
		brand: req.body.brand,
		category: req.body.category,
		description: req.body.description,
		price: parseInt(req.body.price),
		cost: parseInt(req.body.cost),
		image: req.file.id,
	};
	const product = new Product(newProduct);
	product.save();
	res.redirect('/');
});


// @route GET /files
// @desc  Display all files in JSON
router.get('/products', (req, res) => {
	Product.find().select({__v:0}).exec(async(err, docs) => {
		if (!docs || docs.length === 0) {
			return res.status(404).json({
				err: 'No files exist'
			});
		}
		return res.json(docs);
	});
});
// @desc  Display one product by id in JSON
router.get('/products/:id', (req, res) => {
	Product.findOne({_id: req.params.id}).select({__v:0}).exec(async(err, docs) => {
		if (!docs || docs.length === 0) {
			return res.status(404).json({
				err: 'No files exist'
			});
		}
		return res.json(docs);
	});
});
// @route GET /files/:id
// @desc  Display single file object
// router.get('/files/:id', (req, res) => {
// 	const fileId = new mongoose.mongo.ObjectId(req.params.id);
// 	gfs.files.findOne({ _id: fileId }, (err, file) => {
// 		// Check if file
// 		if (!file || file.length === 0) {
// 			return res.status(404).json({
// 				err: 'Did not find the files you were looking for.'
// 			});
// 		}
// 		// File exists
// 		return res.json(file);
// 	});
// });
// @route GET /files/:filename
// @desc  Display single file object
router.get('/files/:filename', (req, res) => {
	gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
		// Check if file
		if (!file || file.length === 0) {
			return res.status(404).json({
				err: 'No file exists'
			});
		}
		// File exists
		return res.json(file);
	});
});
// @route GET /files
// @desc  Display all files in JSON
router.get('/files', (req, res) => {
	gfs.files.find().toArray((err, files) => {
		// Check if files
		if (!files || files.length === 0) {
			return res.status(404).json({
				err: 'No files exist'
			});
		}
		return res.json(files);
	});
});
// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
	gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
		// Check if file
		if (!file || file.length === 0) {
			return res.status(404).json({
				err: 'No file exists'
			});
		}
		// Check if image
		if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
			// Read output to browser
			const readstream = gfs.createReadStream(file.filename);
			readstream.pipe(res);
		}
		else {
			res.status(404).json({
				err: 'Not an image'
			});
		}
	});
});
// @route GET /image/:filename
// @desc Display Image
router.get('/idimage/:id', (req, res) => {
	const fileId = new mongoose.mongo.ObjectId(req.params.id);
	gfs.files.findOne({ _id: fileId}, (err, file) => {
		// Check if file
		if (!file || file.length === 0) {
			return res.status(404).json({
				err: ' file does not exists'
			});
		}
		// Check if image
		if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
			// Read output to browser
			const readstream = gfs.createReadStream(file.filename);
			readstream.pipe(res);
		}
		else {
			res.status(404).json({
				err: 'Not an image'
			});
		}
	});
});
// @route DELETE /products/:id
// @desc  Delete products
router.delete('/products/:id', async(req, res) => {
	const fileId = new mongoose.mongo.ObjectId(req.params.id);
	try {
		await Product.deleteOne({_id: fileId});
	} catch (error) {
		console.log(`There was an issue with the server: ${error}`);
	}
});
// @route DELETE /files/:id
// @desc  Delete file
router.delete('/files/:id', (req, res) => {
	gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
	  if (err) {
		return res.status(404).json({ err: err });
	  }
	  res.redirect('/');
	});
  });

module.exports = router;


