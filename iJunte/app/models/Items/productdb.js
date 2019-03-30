const mongoose = require('mongoose');
const Joi = require('joi');


const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true ,
		minlength: 4,
		maxlength: 80,
	},
	type: {
		type: String,
		required: true,
		trim: true ,
		minlength: 4,
		maxlength: 80,
	},
	description: {
		type: String,
		required: true,
		trim: true ,
		minlength: 4,
		maxlength: 200,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
		max:255,
	},
	cost: {
		type: Number,
		required: false,
	},
	picture: {
		type: Buffer,
		required: false,
		min: 0,
		max:255, 
	}
});

const Product = mongoose.model('Product', productSchema);

// this function creates a product in the database C
async function createProduct(productObject) {
	const product = new Product(productObject);
	try {
		const result = await product.save();
		return result;
	}
	catch (ex) {
		console.log(ex);
	}
}

// this function gets by id R
async function getProductById(id) {
	try {
		const result = await Product
			.find({ _id: id })
			.limit(1);
		return result;
	} catch (error) {
		throw error;
	}
}
// this function gets by price R
async function getProductByPrice(price) {
	try {
		const result = await Product
			.find({ price: price })
			.select({price: 1});
		return result;
	} catch (error) {
		throw error;
	}
}
// this function gets product by productName R
async function getProductByProductName(productName) {
	try {
		const result = await Product
			.find({ productName: productName })
			.select({productName: 1});
		return result;
	} catch (error) {
		throw error;
	}
}

// this function updates a product U
async function updateProduct(newProduct) {
	try {
		const result = await Product.updateOne({ _id: newProduct._id }, {
			$set: {
				name: newProduct.name,
				productName: newProduct.productName,
				price: newProduct.price,
				password: newProduct.password,
			},
		});
		return result;
	} catch (error) {
		throw error;
	}
}
// this function deletes a product D
async function deleteProduct(id) {
	try {
		const deleted = await Product.deleteOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
	return deleted;
}


// validator V
const validate = (body) => {
	const schema = {
		id: Joi.string(),
		name: Joi.string().min(4).max(80).required().error(new Error('The name must be at least 3 characters.')),
		productName: Joi.string()
			.min(4)
			.required()
			.error(new Error('The productName must be at least 4 characters')),
		price: Joi.string()
			.price()
			.error(new Error('Invalid price.')),
		psw: Joi.string()
			.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
			.required()
			.error(new Error('The psw must contain: Uppercase, Lowercase, and at least one number.')),
		pswRepeat: Joi.string(),
	};
	return Joi.validate(body, schema);
};


module.exports = {
	createProduct, getProductById, updateProduct, deleteProduct, validate, getProductByPrice, getProductByProductName 
};
