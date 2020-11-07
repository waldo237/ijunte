const express = require('express');
const { createUser, getUserById, updateUser, deleteUser, validate, 
	getUserByEmail, getUserByUsername } = require('../models/Users/userdb');
const router = express.Router();

// This server gets a specific user R
router.get('/:id', async (req, res) => {
	try {
		const reqUser = await getUserById(req.params.id);
		if (!reqUser) return res.status(404).send('User not found');
		res.send(reqUser);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});

// edit a specific user U
router.put('/:id', async(req, res) => {
	try {
		const reqUser = await getUserById(req.params.id);
		// validations
		if (!reqUser) return res.status(404).send('User not found');
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.message);
		const editedUser = {
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.psw,
		};
		res.send(updateUser(editedUser));
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});

// post a new user to the data base C
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);
	const user = {
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.psw,
	};
	try {
		const result = await createUser(user);
		res.send(result);
    
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});

// This function deletes a specific user D
router.delete('/:id', async (req, res) => {
	try {
		const reqUser = await getUserById(req.params.id);
		if (!reqUser) return res.status(404).send('User not found');
		res.send(`User: ${ await deleteUser(req.params.id)} was deleted`);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});
// This function gets users by emails R
router.get('/email/:email', async (req, res) => {
	console.log(req.url);
	try {
		const reqUser = await getUserByEmail(req.params.email);
		console.log(reqUser[1]);
		if (reqUser[1]!== undefined) return res.status(200).send(false);
		res.send(true);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
		console.log(error);
	}
});
// This function gets users by username R
router.get('/username/:username', async (req, res) => {
	try {
		const reqUser = await getUserByUsername(req.params.username);
		console.log(reqUser[1]);
		if (reqUser[0]) return res.status(200).send(false);
		res.send(true);
	} catch (error) {
		res.status(500).send(`There was an issue with the server: ${error}`);
	}
});
module.exports = router;
