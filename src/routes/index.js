/* eslint-disable new-cap */
const {Router} = require('express');
const {videoGamesGet} = require('./videoGamesGet');
const {videoGamesPost} = require('.//videoGamesPost');
const {videoGamesPut} = require('.//videoGamesPut');
const {videoGamesDelete} = require('.//videoGamesDelete');
const {genresRouter} = require('../routes/genresRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use('/videogames', videoGamesGet);
router.use('/videogames', videoGamesPost);
router.use('/videogames', videoGamesPut);
router.use('/videogames', videoGamesDelete);
router.use('/genres', genresRouter);

module.exports = router;
