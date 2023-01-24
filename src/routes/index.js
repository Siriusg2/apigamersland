/* eslint-disable new-cap */
const {Router} = require('express');
const {videogamesRouter} = require('../routes/videogamesRouter');
const {genresRouter} = require('../routes/genresRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);

module.exports = router;
