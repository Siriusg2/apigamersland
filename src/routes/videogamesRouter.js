/* eslint-disable camelcase */
/* eslint-disable new-cap */
const express = require('express');
const {
  getGames,
  getGamesByName,
  getGamesById,
  createGame,
} = require('../controllers/index.js');

const videogamesRouter = express.Router();

videogamesRouter.get('/', async (req, res) => {
  const {name} = req.query;
  if (!name) {
    try {
      const result = await getGames();

      return result.length ?
        res.status(200).send(result) :
        res.status(404).send('No hay juegos para mostrar');
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      const result = await getGamesByName(name);

      return result.length ?
        res.status(200).send(result) :
        res.status(404).send('No hay juegos para mostrar');
    } catch (error) {
      console.log(error.message);
    }
  }
});
videogamesRouter.get('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const result = await getGamesById(id);
    return Object.keys(result).length ?
      res.status(200).send(result) :
      res.status(404).send('Juego no encontrado');
  } catch (error) {
    return error.message;
  }
});

videogamesRouter.post('/', async (req, res) => {
  const {name, description, rating, platforms, launch_date, genres} =
    req.body;
  try {
    const result = await createGame(
        name,
        description,
        rating,
        platforms,
        launch_date,
        genres,
    );
    return typeof result !== 'string' ?
      res.status(201).send(result) :
      res.status(200).send(result);
  } catch (error) {
    return error.message;
  }
});

module.exports = {
  videogamesRouter,
};
