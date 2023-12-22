const dbConnection = require('../database');
const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs');

class UsersController {

	async create(req, res) {
		const { name, email, password, avatar } = req.body;

		const database = await dbConnection();

		const validEmailExists = await database.get('SELECT * FROM users WHERE email = (?)', [ email ]);

		if (validEmailExists) {
			throw new AppError('Esse email já está em uso!');
		}

		const hashedPassword = await hash(password, 5);

		await database.run('INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)', [ name, email, hashedPassword, avatar ]);

		return res.status(201).json();
	} 
}


module.exports = UsersController;