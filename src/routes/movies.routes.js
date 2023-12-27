const { Router } = require('express');
const moviesRoutes = Router();
const MoviesController = require('../controllers/MoviesController');

const moviesController = new MoviesController();

moviesRoutes.post('/:user_id', moviesController.create);
moviesRoutes.get('/:id', moviesController.read);
moviesRoutes.get('/', moviesController.readAll);

module.exports = moviesRoutes;
