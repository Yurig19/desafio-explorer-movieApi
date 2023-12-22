const { Router } = require('express');
const userRoutes = require('../routes/user.routes');
const routes = Router();

routes.use('/users', userRoutes);

module.exports = routes;