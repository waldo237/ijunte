const mongoose = require('mongoose');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 60,
	},
	username: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 60,
	},
	email: {
		type: String,
		required: true,
		match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,

	},
	password: {
		type: String,
		required: true,
		match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
	},
});
const User = mongoose.model('User', userSchema);

// this function creates a user in the database C
async function createUser(userObject) {
	const user = new User(userObject);
	try {
		const result = await user.save();
		return result;
	}
	catch (ex) {
		console.log(ex);
	}
}

// this function gets by id R
async function getUserById(id) {
	try {
		const result = await User
			.find({ _id: id })
			.limit(1);
		return result;
	} catch (error) {
		throw error;
	}
}
// this function gets by mail R
async function getUserByEmail(email) {
	try {
		const result = await User
			.find({ email: email })
			.select({email: 1});
		return result;
	} catch (error) {
		throw error;
	}
}
// this function gets user by username R
async function getUserByUsername(username) {
	try {
		const result = await User
			.find({ username: username })
			.select({username: 1});
		return result;
	} catch (error) {
		throw error;
	}
}

// this function updates a user U
async function updateUser(newUser) {
	try {
		const result = await User.updateOne({ _id: newUser._id }, {
			$set: {
				name: newUser.name,
				username: newUser.username,
				email: newUser.email,
				password: newUser.password,
			},
		});
		return result;
	} catch (error) {
		throw error;
	}
}
// this function deletes a user D
async function deleteUser(id) {
	try {
		const deleted = await User.deleteOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
	return deleted;
}


// validator V
const validate = (body) => {
	const schema = {
		id: Joi.string(),
		name: Joi.string().min(3).required().error(new Error('The name must be at least 3 characters.')),
		username: Joi.string()
			.min(4)
			.required()
			.error(new Error('The username must be at least 4 characters')),
		email: Joi.string()
			.email()
			.error(new Error('Invalid email.')),
		psw: Joi.string()
			.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
			.required()
			.error(new Error('The psw must contain: Uppercase, Lowercase, and at least one number.')),
		pswRepeat: Joi.string(),
	};
	return Joi.validate(body, schema);
};


module.exports = {
	createUser, getUserById, updateUser, deleteUser, validate, getUserByEmail, getUserByUsername 
};
