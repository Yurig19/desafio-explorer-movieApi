const knex = require('../database');

class MoviesController {
	async create(req, res) {
		const { name, description, rating, tag } = req.body;
		const { user_id } = req.params;

		const [ movie_id ] = await knex('movies').insert({
			name,
			description,
			rating,
			user_id,
		});

		const tagsInsert = tag.map((name) => {
			return {
				movie_id,
				name,
				user_id,
			};
		});

		await knex('movie_tags').insert(tagsInsert);

		res.json();
	}

	async read(req, res) {
		const { id } = req.params;

		const movie = await knex('movies').where({ id }).first();
		const tags = await knex('movie_tags')
			.where({ movie_id: id })
			.orderBy('name');

		return res.json({
			...movie,
			tags,
		});
	}

	async readAll(req, res) {
		const { name, user_id, tags } = req.query;

		let movies;

		if (movies) {
			const filterMovies = tags.split(',').map((tag) => tag.trim());
			movies = await knex('movie_tags')
				.select([
					'movies.id',
					'movies.name',
					'movies.user_id' 
				])
				.where('movies.user_id', user_id)
				.whereLike('movies.name', `%${name}%`)
				.whereIn('name', filterMovies)
				.innerJoin('movies', 'movies.id', 'movie_tags.movie_id')
				.orderBy('movies.name');
		} else {
			movies = await knex('movies')
				.where({ user_id })
				.whereLike('name', `%${name}`)
				.orderBy('name');
		}

		const userTags = await knex('movie_tags').where({ user_id });
		const movieWithTags = userTags.map((movie) => {
			const movieTags = userTags.filter(
				(tag) => tag.movie_id === movie.id);

			return {
				...movie,
				tags: movieTags,
			};
		});

		return res.json(movieWithTags);
	}

	async delete(req, res) {
		const { id } = req.params;

		await knex('movies').where({ id }).delete();

		return res.json();
	}
}

module.exports = MoviesController;
