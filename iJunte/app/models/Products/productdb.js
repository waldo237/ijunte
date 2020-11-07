const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 4,
		maxlength: 80,
	},
	brand: {
		type: String,
		trim: true,
		minlength: 4,
		maxlength: 80,
	},
	category: {
		type: String,
		required: true,
		trim: true,
		minlength: 4,
		maxlength: 80,
	},
	description: {
		type: String,
		required: true,
		trim: true,
		minlength: 4,
		maxlength: 200,
	},
	price: {
		type: Number,
		required: true,
	},
	cost: {
		type: Number,
	},
	image: String,
});

const Product = mongoose.model('Product', productSchema);

// this function gets by price R
async function getProductByPrice(price) {
	try {
		const result = await Product
			.find({ price: price })
			.select({ price: 1 });
		return result;
	} catch (error) {
		throw error;
	}
}


// this function updates a product U
async function updateProduct(newProduct) {

}
// this function deletes a product D
async function deleteProduct(id) {
	try {
		const deleted = await Product.deleteOne({ _id: id });
		return deleted;
	} catch (error) {
		console.log(error);
	}
}
// validator V
const validate = (body) => {
	const schema = {
		id: Joi.string(),
		name: Joi.string().trim().min(4).max(80).required().error(new Error('The name must be at least 3 characters.')),
		brand: Joi.string().trim().min(4).max(80).error(new Error('The name must be at least 3 characters.')),
		category: Joi.string().trim().min(4).max(80).required().error(new Error('The category must be at least 4 characters')),
		description: Joi.string().trim().min(4).max(200).required().error(new Error('The description must be at least 4 characters')),
		price: Joi.number().required().error(new Error('Invalid price.')),
		cost: Joi.number().error(new Error('Invalid cost.')),
		image: Joi.string(),
	};
	return Joi.validate(body, schema);
};


module.exports = { Product, updateProduct, deleteProduct, validate, getProductByPrice,
};
