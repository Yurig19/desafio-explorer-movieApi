const knex = require('../database');

class MovieTagsController {
	async readAll(req, res) {
		const { user_id } = req.params;
        
		const tags = await knex('movie_tags').where({ user_id });

		return res.json(tags);
	}
}

module.exports = MovieTagsController;