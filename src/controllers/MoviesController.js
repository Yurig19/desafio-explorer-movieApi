class MoviesController {
	async create(req, res) {
		const { name, description, rating } = req.body;
		const { user_id } = req.params;
        
	}
}

module.exports = MoviesController;