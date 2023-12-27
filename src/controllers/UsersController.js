const dbConnection = require('../database/sqlite');
const AppError = require('../utils/AppError');
const { hash, compare } = require('bcryptjs');

class UsersController {

	async create(req, res) {
		const { name, email, password, avatar } = req.body;

		const database = await dbConnection();

		const validEmailExists = await database.get(
			'SELECT * FROM users WHERE email = (?)', [ email ]);

		if (validEmailExists) {
			throw new AppError('Esse email já está em uso!');
		}

		const hashedPassword = await hash(password, 5);

		await database.run('INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)', [ name, email, hashedPassword, avatar ]);

		return res.status(201).json();
	} 

	async update(req, res) {
		const { name, email, password, oldPassword, avatar } = req.body;
		const { id } = req.params;

		const database = await dbConnection();
		const user = await database.get('SELECT * FROM users WHERE id = (?)', [ id ]);

		if (!user) {
			throw new AppError('Usuário não encontrado!');
		}

		const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [ email ]);

		if (userWithUpdatedEmail && !userWithUpdatedEmail !== user.id) {
			throw new AppError('Este e-mail já está em uso!');
		}

		user.name = name ?? user.name;
		user.email = email ?? user.email;
		user.avatar = avatar ?? user.avatar;

		if (password && !oldPassword) {
			throw new AppError('É necessário informar a senha antiga para definir uma nova!');
		}

		if (password, oldPassword) {
			const validOldPassword = await compare(oldPassword, user.password);

			if (!validOldPassword) {
				throw new AppError('Senha incorreta!');
			}

			user.password = await hash(password, 5);
		}

		await database.run('UPDATE users SET name = ?, email = ?, password = ?, avatar = ?, updated_at = DATETIME(\'now\') WHERE id = (?)', [ user.name, user.email, user.password, user.avatar, id ]);

		res.json();
	}
}


module.exports = UsersController;