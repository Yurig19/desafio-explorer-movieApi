exports.up = (knex) =>
	knex.schema.alterTable('movie_tags', (table) => {
		table
			.integer('movie_id')
			.references('id')
			.inTable('movies')
			.onDelete('CASCADE')
			.alter();
	});

exports.down = (knex) => knex.schema.dropTable('movie_tags');
