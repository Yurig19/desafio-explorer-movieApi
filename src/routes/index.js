const { Router } = require('express');
const userRoutes = require('./user.routes');
const moviesRoutes = require('./movies.routes');
const movieTagsRoutes = require('./movieTags.routes');
const routes = Router();

routes.use('/users', userRoutes);
routes.use('/movies', moviesRoutes);
routes.use('/tags', movieTagsRoutes);

module.exports = routes;
