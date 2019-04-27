const multer = require('multer');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const uri = 'mongodb://localhost:27017/';
const dbName = 'userdb';

// Set The Storage Engine
const storage = multer.diskStorage({
	destination: './files',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

// Init Upload
exports.upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
});

// const storage = new GridFsStorage({
// 	url: uri+dbName,
// 	file: (req, file) => {
// 		return new Promise((resolve, reject) => {
// 			crypto.randomBytes(16, (err, buf) => {
// 				if (err) {
// 					return reject(err);
// 				}
// 				const filename = buf.toString('hex') + path.extname(file.originalname);
// 				const fileInfo = {
// 					filename: filename,
// 					bucketName: 'uploads'
// 				};
// 				resolve(fileInfo);
// 			});
// 		});
// 	}
// });
// exports.upload = multer({ storage });
// @route GET /
// @desc Loads form

// Check File Type
function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}
