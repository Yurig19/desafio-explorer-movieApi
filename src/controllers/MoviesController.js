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
}

module.exports = MoviesController;