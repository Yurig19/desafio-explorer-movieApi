const knex = require('../database');

class MoviesController {
	async create(req, res) {
		const { name, description, rating, tag } = req.body;
		const { user_id } = req.params;

		const [ movie_id ] = await knex('movies').insert({
			name,
			description,
			rating,
			user_id
		});

		const tagsInsert = tag.map(name => {
			return {
				movie_id,
				name,
				user_id
			};
		});

		await knex('movie_tags').insert(tagsInsert);

		res.json();
	}

	async read(req, res) {
		const { id } = req.params;

		const movie = await knex('movies').where({ id }).first();
		const tags = await knex('movie_tags').where({ movie_id:id }).orderBy('name');

		return res.json({
			...movie,
			tags
		});
	}
}

module.exports = MoviesController;